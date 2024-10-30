<template>
  <div class="map-wrapper">
    <div class="map-search-input">
      <address-search @addressSelected="addMarkerToMap" />
    </div>
    <div class="toggle-add-marker">
      <toggle-add-marker />
    </div>    
    <div class="map-container" ref="mapContainer"></div>   
  </div>  
</template>

<script lang="ts" setup>
import AddressSearch from '@/components/AddressSearch.vue';
import ToggleAddMarker from '@/components/ToggleAddMarker.vue';
import { ref, onMounted, watch, defineProps, defineEmits, computed } from 'vue';
import L, { Marker as LeafletMarker, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Backend from '../services/backend';
import Marker from '../services/models/marker';
import GeoResponse from '../services/models/geoResponse';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import Address from '@/services/models/address';
import { useRoute, useRouter } from 'vue-router';
import SearchAddressQuery from '@/services/models/queries/searchAddressQuery';
import SearchResult from '@/services/models/searchResult';
import { useI18n } from 'vue-i18n';
import 'leaflet/dist/leaflet.css';
const emit = defineEmits(['markerSelected', 'newMarkerAdded']);

const props = defineProps<{
  markers: Marker[];
}>();
Icon.Default.mergeOptions({
    iconRetinaUrl: 'marker-icon-2x.png',
    iconUrl: 'marker-icon.png',
    shadowUrl: 'marker-shadow.png',
});
const mapContainer = ref<HTMLElement | null>(null);
const map = ref<L.Map | null>(null);
const leafletMarkers = ref<Record<string, LeafletMarker>>({});
const toast = useToast();
const store = useStore();
const router = useRouter();
const { t } = useI18n();

const OPENCAGE_API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;
const isAddingMarker = computed(() => store.getters['address/isAddingMarker'] as boolean)
const selectedMarkerId = computed(() => store.getters['address/getSelectedMarkerId'] as string | null)

if (!OPENCAGE_API_KEY) {
  toast.error(t('text24'));
}

const initMap = () => {
  if (mapContainer.value) {
    map.value = L.map(mapContainer.value).setView([55.751244, 37.618423], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
    }).addTo(map.value as L.Map);

    map.value.on('click', async (e: L.LeafletMouseEvent) => {
      if (!isAddingMarker.value)
      {
        return;
      }
      const { lat, lng } = e.latlng;

      if (!OPENCAGE_API_KEY) {
        toast.error(t('text23'));
        return;
      }

      try {
        const query: SearchAddressQuery = {
          lon: lng,
          lat: lat,
          searchQuery: ''
        }
        await store.dispatch('address/selectAddressAction', query);
      } catch (error: any) {
        toast.error(t('text22'));
      }
    });
  }
};

const addMarkerToMap = (marker: Marker) => {
  if (map.value) {
    const leafletMarker = L.marker([marker.lat as number, marker.lng as number]).addTo(map.value as L.Map);
    const popupContent = `
      <b>ID:</b> ${marker.id}<br>
      <b>Lat:</b> ${marker.lat}<br>
      <b>Lng:</b> ${marker.lng}<br>
    `;
    leafletMarker.bindPopup(popupContent);
    
    leafletMarker.on('click', () => {
      store.commit('address/SET_SELECTED_MARKER_ID', marker.id);
    });
    leafletMarkers.value[marker.id] = leafletMarker;
  } else {
    toast.error(t('text21'));
  }
};

onMounted(async () => {
  initMap();
  props.markers.forEach((marker) => {
    addMarkerToMap(marker);
  });
});

watch(
  () => props.markers,
  (newMarkers) => {
    newMarkers.forEach((marker) => {
      if (!leafletMarkers.value[marker.id]) {
        addMarkerToMap(marker);
      }
    });
    for (const id in leafletMarkers.value) {
      if (!newMarkers.find((m) => m.id === id)) {
        map.value?.removeLayer(leafletMarkers.value[id]);
        delete leafletMarkers.value[id];
      }
    }
  },
  { deep: true, immediate: false }
);

watch(
  () => selectedMarkerId.value,
  (newId) => {
    if (newId && leafletMarkers.value[newId]) {
      const leafletMarker = leafletMarkers.value[newId];
      leafletMarker.openPopup();
      map.value?.setView(leafletMarker.getLatLng(), 13);
      router.replace({ query: { newId } });
    }
  }
);
</script>

<style lang="scss">
@use '../styles/components/mapRenderer.scss' as *;
</style>
