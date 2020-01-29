<template>
  <div id="map" style="height:3.24rem"></div>
</template>
<script>
import rem from "~/common/rem.js";

export default {
  name: "mapbox_test",
  middleware: "responsive",
  mounted() {
    rem();
    this.init();
  },
  methods: {
    init() {
      this.mbgl.accessToken =
        "pk.eyJ1IjoibWlsbGlvbWUiLCJhIjoiY2swem8xOWY4MDdrODNucGdoazk0OXB5NSJ9.bkNupD9GOCQ-sHLC26ypOA";
      console.log(this.mbgl.Popup);
      let map = new this.mbgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-77.04, 38.907],
        zoom: 15.99, //是否缩放
        // pitch: 40,//地图倾斜角改变时触发
        bearing: 1
      });
      var that = this;
      map.on("load", function() {
        // Add a layer showing the places.
        map.addLayer({
          id: "places",
          type: "symbol",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {
                    description:
                      ' <img src="http://192.168.3.94:8100/picture/homes/15374140007560.jpg" style="width:1.2rem;height:1rem"/>',
                    icon: "music"
                  },
                  geometry: {
                    type: "Point",
                    coordinates: [-77.031706, 38.914581]
                  }
                },
                {
                  type: "Feature",
                  properties: {
                    description:
                      '<strong>A Little Night Music</strong><p>The Arlington Players\' production of Stephen Sondheim\'s  <a href="http://www.thearlingtonplayers.org/drupal-6.20/node/4661/show" target="_blank" title="Opens in a new window"><em>A Little Night Music</em></a> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>',
                    icon: "music"
                  },
                  geometry: {
                    type: "Point",
                    coordinates: [-77.020945, 38.878241]
                  }
                },
                {
                  type: "Feature",
                  properties: {
                    description:
                      '<strong>Truckeroo</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
                    icon: "music"
                  },
                  geometry: {
                    type: "Point",
                    coordinates: [-77.007481, 38.876516]
                  }
                }
              ]
            }
          },
          layout: {
            "icon-image": "{icon}-15",
            "icon-allow-overlap": true
          }
        });

        // When a click event occurs on a feature in the places layer, open a popup at the
        // location of the feature, with description HTML from its properties.
        map.on("click", "places", function(e) {
          var coordinates = e.features[0].geometry.coordinates.slice();
          var description = e.features[0].properties.description;

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          // console.log(that.mbgl)
          var popup = new that.mbgl.Popup({ className: "pointer" })
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
          // that.mbgl.Popup()
          // .setLngLat(coordinates)
          // .setHTML(description)
          // .addTo(map);
        });

        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on("mouseenter", "places", function() {
          map.getCanvas().style.cursor = "pointer";
        });

        // Change it back to a pointer when it leaves.
        map.on("mouseleave", "places", function() {
          map.getCanvas().style.cursor = "";
        });
      });
    }
  }
};
</script>
<style>
body {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}
.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
}
.pointer {
  background: white;
  padding: 0.1rem;
}
</style>
