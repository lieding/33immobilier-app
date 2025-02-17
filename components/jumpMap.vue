<template>
  <client-only>
    <div class="wrapper">
      <div v-if="showNav" id="maincate" class="maincate">
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
const gmapApiKey = process.env['IMMO_GOOGLE_MAPS_API_KEY'];

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
      default: 10
    },
    initZoom: {
      type: Number,
      default: 15
    },
    points: {
      type: Array,
    },
    activePointId: {
      type: String,
    },
    needCircle: {
      type: Boolean,
      default: false
    },
    needCenterLogo: {
      type: Boolean,
      default: false
    },
    showNav: {
      type: Boolean,
      default: false
    },
    boundaryPlaceid: {
      type: String,
    }
  },
  mounted () {
    if (process.client) this.loadMap();
  },
  watch: {
    points() {
      this.refreshPoints();
    },
    activePointId (id, oldId) {
      const points = this.__points;
      if (!Array.isArray(points)) return;
      const oldMarker = points.find(it => it.__id === oldId);
      if (oldMarker) oldMarker.content.style.color = InitialMarkerSvgColor;
      const marker = points.find(it => it.__id === id);
      if (marker) marker.content.style.color = 'red';
    },
    latitude () {
      clearTimeout(this.__changeCenterTimeout);
      this.__changeCenterTimeout = setTimeout(changeCenter.bind(this), 500);
    },
    longitude () {
      clearTimeout(this.__changeCenterTimeout);
      this.__changeCenterTimeout = setTimeout(changeCenter.bind(this), 500);
    },
    boundaryPlaceid () {
      setTimeout(this.setBoundary, 3000);
    },
  },
  methods: {
    loadMap () {
      const cbkName = this.loadMapCallback();
      if (cbkName) loadScript(cbkName);
    },
    async refreshPoints() {
      const map = this.__mapInst;
      if (!map) return;
      if (this.__points) {
        for (const marker of this.__points)
          marker.map = null;
      }
      if (this.points?.length) {
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
        const parser = new DOMParser();
        const points = this.points.slice();
        const __points = [];
        const addMarkers = () => {
          const slice = points.splice(0, 10);
          const markers = slice.map(({ id, latitude, longitude }) =>
            addMarker.call(this, id, latitude, longitude, map, AdvancedMarkerElement, parser));
          __points.push(...markers);
          if (points.length)
            requestAnimationFrame(addMarkers)
        }
        this.__points = __points;
        requestAnimationFrame(addMarkers);
      } else {
        this.__points = null;
      }
    },
    loadMapCallback () {
      const getMmapElRef = () => this.$refs.map;
      const setMapInst = (inst) => this.__mapInst = inst;
      const refreshPoints = this.refreshPoints;
      const setBoundary = this.setBoundary;
      const name = 'metroMap';
      const lat = this.latitude, lng = this.longitude, points = this.points, needCircle = this.needCircle,
        interactive = this.interactive, minZoom = this.minZoom, initZoom = this.initZoom, needCenterLogo = this.needCenterLogo;
      window.__mapLoaded = false;
      async function metroMap () {
        const GMapLib = window.google.maps;
        if (!GMapLib) return;
        if (!window.google.maps.Map) return;
        const mapElRef = getMmapElRef();
        if (!mapElRef) return;
        if (window.__mapLoaded) return;
        window.__mapLoaded = true;
        const { Map } = await GMapLib.importLibrary("maps");
        const { AdvancedMarkerElement } = await GMapLib.importLibrary("marker");
        const mapConfig = {
          zoom: initZoom,
          center: { lat, lng },
          minZoom,
          mapId: '68ad0f0bf0e03fd3',
        };
        if (interactive === false) {
          mapConfig.gestureHandling = 'none';
          mapConfig.zoomControl = false;
        }
        const map = new Map(mapElRef, mapConfig);
        setMapInst(map);
        const center = { lat, lng };
        if (needCenterLogo) {
          const imageEl = document.createElement('img');
          imageEl.src = '/home.png'
          new AdvancedMarkerElement({
            map,
            draggable: false,
            content: imageEl,
            position: center
          });
        }
        if (needCircle) {
          new GMapLib.Circle({
            strokeColor: '#4286f4',
            strokeOpacity: 0.1,
            strokeWeight: 2,
            fillColor: '#4286f4',
            fillOpacity: 0.1,
            map,
            center,
            radius: 500
          });
        }
        refreshPoints();
        setTimeout(setBoundary, 3000);
      }
      setTimeout(metroMap, 8000);
      if (window.google?.maps?.Map)
        return void setTimeout(metroMap);
      window[name] = metroMap;
      return name;
    },
    setBoundary () {
      const boundaryPlaceid = this.boundaryPlaceid;
      const map = this.__mapInst;
      if (boundaryPlaceid && map) {
        const featureLayer = map.getFeatureLayer("LOCALITY");
        featureLayer.style = (options) => {
          if (options.feature.placeId === boundaryPlaceid)
            return {
              strokeColor: "#810FCB",
              strokeOpacity: 1.0,
              strokeWeight: 3.0,
              fillColor: "#810FCB",
              fillOpacity: 0.5,
            };
        };
      }
    }
  },
}

function addMarker (id, latitude, longitude, map, AdvancedMarkerElement, parser) {
  const pinSvg = parser.parseFromString(svgContent, 'image/svg+xml').documentElement;
  const marker = new AdvancedMarkerElement({
    map,
    position: { lat: latitude, lng: longitude },
    title: '',
    content: pinSvg,
  });
  marker.__id = id;
  marker.addListener("click", () => {
    this.$emit('pointSelect', id);
  });
  return marker;
}

function changeCenter () {
  const mapInst = this.__mapInst;
  if (!mapInst) return;
  const lat = Number(this.latitude), lng = Number(this.longitude);
  if (!lat || !lng) return;
  mapInst.setCenter({ lat, lng });
}

const InitialMarkerSvgColor = '#048881';
const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 256 256" xml:space="preserve" fill="currentColor" style="color:${InitialMarkerSvgColor}">
<defs>
</defs>
<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
	<path d="M 45 90 c -1.415 0 -2.725 -0.748 -3.444 -1.966 l -4.385 -7.417 C 28.167 65.396 19.664 51.02 16.759 45.189 c -2.112 -4.331 -3.175 -8.955 -3.175 -13.773 C 13.584 14.093 27.677 0 45 0 c 17.323 0 31.416 14.093 31.416 31.416 c 0 4.815 -1.063 9.438 -3.157 13.741 c -0.025 0.052 -0.053 0.104 -0.08 0.155 c -2.961 5.909 -11.41 20.193 -20.353 35.309 l -4.382 7.413 C 47.725 89.252 46.415 90 45 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 45 45.678 c -8.474 0 -15.369 -6.894 -15.369 -15.368 S 36.526 14.941 45 14.941 c 8.474 0 15.368 6.895 15.368 15.369 S 53.474 45.678 45 45.678 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
</g>
</svg>
`

function loadScript (cbkName) {
  const el = document.createElement('script');
  el.defer = true;
  el.async = true;
  el.src = `https://maps.googleapis.com/maps/api/js?key=${gmapApiKey}&callback=${cbkName}`;
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

