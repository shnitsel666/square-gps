<template>
  <div class="map-page">
    <div class="content">
      <div v-if="isMobile" class="burger-menu">
        <v-btn icon @click="toggleMarkerList">
          <span class="material-icons">menu</span>
        </v-btn>
      </div>
      <marker-list
        v-show="!isMobile || isMarkerListVisible"
        :markers="markers"
        @markerDeleted="handleMarkerDeleted"
      />
      <map-component
        :markers="markers"
        @newMarkerAdded="handleNewMarker"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import Backend from '../services/backend';
import MapComponent from '../components/MapRenderer.vue';
import MarkerList from '../components/MarkerList.vue';
import { useRoute, useRouter } from 'vue-router';
import Marker from '../services/models/marker';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from 'vuex';
import SearchResult from '@/services/models/searchResult';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';

const store = useStore();
const toast = useToast();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const markers = ref<Marker[]>([]);
const selectedMarkerId = computed(() => store.getters['address/getSelectedMarkerId'] as string | null);
const selectedAddressFromSearch = computed(() => store.getters['address/getSelectedAddress'] as SearchResult);

const isMarkerListVisible = ref(false); // Изначально скрываем список маркеров на мобильных устройствах
const isMobile = ref(false);

const checkIsMobile = () => {
  isMobile.value = window.innerWidth <= 768;
  if (isMobile.value) isMarkerListVisible.value = false; // Скрываем список, если мобильное устройство
};

onMounted(async () => {
  markers.value = await Backend.getMarkers();
  const markerIdFromRoute = route.query.newId as string | undefined;
  if (markerIdFromRoute) {
    store.commit('address/SET_SELECTED_MARKER_ID', markerIdFromRoute);
  }

  checkIsMobile();
  window.addEventListener('resize', checkIsMobile); // Обновляем состояние при изменении размера
});

const toggleMarkerList = () => {
  isMarkerListVisible.value = !isMarkerListVisible.value;
};

const handleNewMarker = async (marker: Marker) => {
  marker.id = uuidv4();
  await Backend.addMarker(marker);
  markers.value.push(marker);
  store.commit('address/SET_SELECTED_MARKER_ID', marker.id);
  router.replace({ query: { id: marker.id } });
  toast.success(t('text20'));
};

const handleMarkerDeleted = async (id: string) => {  
  await Backend.deleteMarker(id);
  markers.value = markers.value.filter(marker => marker.id !== id);
  if (selectedMarkerId.value === id) {
    if (markers.value.length > 0) {
      const firstMarkerId = markers.value[0].id;
      store.commit('address/SET_SELECTED_MARKER_ID', firstMarkerId);
      router.replace({ query: { markerId: firstMarkerId } });
    } else {
      store.commit('address/SET_SELECTED_MARKER_ID', null);
      router.replace({ query: {} });
    }
  }
};

watch(selectedAddressFromSearch, (newResult) => {
  const marker: Marker = {
    id: uuidv4(),
    lat: newResult.lat,
    lng: newResult.lon,
    address: newResult.address
  };
  handleNewMarker(marker);
});
</script>

<style lang="scss">
@use '../styles/views/map' as *;

.map-page {
  
  // Скрываем marker-list на мобильных устройствах, если он не открыт
  @media (max-width: 768px) {
    .content > .marker-list {
      display: none;
    }
    .content > .marker-list[v-show="true"] {
      display: block;
      position: absolute;
      z-index: 1000;
      background: white;
      width: 80%;
      height: 100%;
      top: 0;
      left: 0;
      overflow-y: auto;
    }
  }
}
</style>
