<template>
  <client-only>
    <div class="wrapper">
      <div id="maincate" class="maincate">
        <!--<div class="mapNavList changeColor">Bus</div>-->
        <div class="mapNavList changeColor" data-id="1" id="1">Metro</div>
        <div class="mapNavList" data-id="2" id="2">Supermarché</div>
        <div class="mapNavList" data-id="3" id="3">Ecole</div>
        <div class="mapNavList" data-id="4" id="4">Hôpital</div>
        <div class="mapNavList" data-id="5" id="5">Banque</div>
        <div class="mapNavList" data-id="6" id="6">Centre Commercial</div>
        <div class="mapNavList" data-id="7" id="7">La poste</div>
        <div class="mapNavList" data-id="8" id="8">Salle de sport</div>
        <div class="mapNavList" data-id="9" id="9">Jardin</div>
      </div>
      <div class="map" ref="map"></div>
    </div>
  </client-only>
</template>

<script>
export default {
  props: {
    latitude: {
      required: true,
      type: Number
    },
    longitude: {
      required: true,
      type: Number,
    },
    interactive: {
      type: Boolean,
      default: true,
    },
    minZoom: {
      type: Number,
      default: 12
    }
  },
  mounted () {
    const cbkName = this.loadMapCallback();
    loadScript(cbkName);
  },
  methods: {
    loadMapCallback () {
      const getMmapElRef = () => this.$refs.map;
      const name = 'metroMap';
      const lat = this.latitude, lng = this.longitude;
      window.__mapLoaded = false;
      const interactive = this.interactive;
      const minZoom = this.minZoom;
      function metroMap () {
        const GMapLib = window.google.maps;
        if (!GMapLib) return;
        const mapElRef = getMmapElRef();
        if (!mapElRef) return;
        if (window.__mapLoaded) return;
        window.__mapLoaded = true;
        const mapConfig = {
          zoom: 15,
          center: { lat, lng },
          minZoom: minZoom,
        };
        if (interactive === false) {
          mapConfig.gestureHandling = 'none';
          mapConfig.zoomControl = false;
        }
        const map = new GMapLib.Map(mapElRef, mapConfig);
        const transitLayer = new GMapLib.TransitLayer();
        transitLayer.setMap(map);
        //初始中心坐标 该房源为中心
        const pyrmont = { lat, lng };
        new GMapLib.Marker({
          map,
          draggable: false,
          icon: '/home.png',
          position: new GMapLib.LatLng(lat, lng)
        });

        new google.maps.Circle({
          strokeColor: '#4286f4',
          strokeOpacity: 0.1,
          strokeWeight: 2,
          fillColor: '#4286f4',
          fillOpacity: 0.1,
          map: map,
          center: pyrmont,
          radius: 500
        });
      }
      window[name] = metroMap;
      setTimeout(metroMap, 5000);
      return name;
    }
  }
}

function loadScript (cbkName) {
  if (window.google?.maps?.Map) return;
  const el = document.createElement('script');
  // el.defer = true;
  el.async = true;
  el.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAajgcsOMI8iloavKcKSKeoomMB7QVQL4w&callback=${cbkName}`;
  document.body.appendChild(el);
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.map {
  flex: 1;
  width: 100%;
}
.mapNav {
  margin-top:4rem;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 6rem;
  background-color: white;
  overflow:hidden;
  display: -webkit-box;
  -webkit-overflow-scrolling:touch;
}
.maincate {
  flex: unset;
  width: 100%;
  height: 3.2rem;
  line-height: 3.2rem;
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(0,0,0,.1);
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  -webkit-overflow-scrolling: touch;
  text-align: justify;
  background: white;
  padding: 0 5px;
  box-sizing: border-box;
  color: #19121278;
}
.changeColor {
  color: black;
}
.mapNavList {
  display:inline-block;
  font-size:1rem;
  text-decoration: none;
  margin-right: 10px;
  text-align:center;
  line-height:3rem;
}
.maincate::-webkit-scrollbar {
  display: none;
}
</style>

