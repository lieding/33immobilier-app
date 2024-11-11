<template>
  <client-only>
    <div id="leaflet-map" :class="{ mobile: mobile, pc: !mobile }"></div>
  </client-only>
</template>

<script lang="js">
export default {
  props: {
    initialLng: {
      type: Number,
      default: 48.8588897
    },
    initialLat: {
      type: Number,
      default: 2.320041,
    },
    initialZoom: {
      type: Number,
      default: 6
    },
    minZoom: {
      typz: Number,
      default: 6
    },
    maxZoom: {
      type: Number,
      default: 12
    },
    points: {
      type: Array
    },
    visible: {
      type: Boolean,
      required: true,
    },
    markerGrouped: {
      type: Boolean,
      default: false
    },
    mobile: {
      required: true,
      type: Boolean,
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler (visible) {
        if (!visible) return;
        this.$nextTick(() => {
          this.__mapInst = initMap.call(this, 'leaflet-map');
          drawMarkers.call(this);
        });
      },
    },
  },
}

function drawMarkers () {
  const mapInst = this.__mapInst, points = this.points, markerGrouped = this.markerGrouped;
  if (!mapInst) return;
  if (!Array.isArray(points)) return;
  mapInst.eachLayer?.((layer) => {
    if(layer['_latlng'] != undefined)
      layer.remove();
  });
  const groupMap = {};
  for (const point of points) {
    const { lat, lng, title, groupCondition } = point;
    const marker = L.marker([lat, lng], { title });
    // Open popup on hover
    marker.on('click', () => this.$emit('pointSelect', point));
    if (markerGrouped) {
      if (groupCondition) {
        if (groupCondition in groupMap) {
          groupMap[groupCondition].addLayer(marker);
        } else {
          const group = L.markerClusterGroup();
          group.addLayer(marker);
          groupMap[groupCondition] = group;
        }
      }
    } else {
      marker.addTo(mapInst);
    }
  }
  Object.values(groupMap).forEach(group => mapInst.addLayer(group));
}

function initMap (wrapperId) {
  if (this.__mapInst) return this.__mapInst;
  if (!document.getElementById(wrapperId)) return;
  const { initialLat, initialLng, initialZoom, minZoom, maxZoom } = this;

  // Initialize the map centered on France
  const map = L.map(wrapperId).setView([initialLat, initialLng], initialZoom);

  // Add the OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom,
    minZoom
  }).addTo(map);

  // Add a simple scale control
  L.control.scale().addTo(map);

  // Add bounds to keep focus on France
  const franceBounds = L.latLngBounds(
    L.latLng(41.2632, -5.4534), // Southwest corner
    L.latLng(51.0891, 9.8678)   // Northeast corner
  );

  map.setMaxBounds(franceBounds);
  return map;
}
</script>

<style lang="css" scoped>
.pc {
  width: 100%;
  max-height: 75vh;
  height: 600px;
}
.mobile {
  width: 100%;
  height: 100%;
}
</style>
<style lang="css">
.mobile .leaflet-control-container {
  font-size: 12px;
}
</style>
