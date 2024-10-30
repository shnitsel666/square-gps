<template>
  <div class="marker-list-wrapper">
    <h2 class="h2">{{ $t('markerList') }}</h2>
      <div class="marker-list">
      <ul v-if="markers.length > 0">
        <li
          v-for="marker in markers"
          :key="marker.id"
          :class="{ selected: marker.id === selectedMarkerId }"
        >
          <div class="marker-content" @click="selectMarker(marker.id)">
            <div class="address-street">{{ marker?.address?.road }} {{ marker?.address?.house_number }}</div>
            <div class="address-coords">{{ marker?.lng }}, {{ marker?.lat }}</div>
          </div>
          <button class="delete-button" @click.stop="deleteMarker(marker?.id)">✕</button>
        </li>
      </ul>
      <div data-testid="fallback-text" v-else>{{ $t('emptyList') }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Marker from '../services/models/marker';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps<{
  markers: Marker[];
}>();

const emit = defineEmits(['markerSelected', 'markerDeleted']);
const selectedMarkerId = computed(() => store.getters['address/getSelectedMarkerId'] as string | null);

const selectMarker = (id: string) => {
  store.commit('address/SET_SELECTED_MARKER_ID', id);
};

const deleteMarker = (id: string) => {
  emit('markerDeleted', id);
};
</script>


<style lang="scss">
@use '../styles/components/markerList.scss' as *;
</style>