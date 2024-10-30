<template>
  <div class="toggle-add-marker">
    <v-btn
      :color="'blue'"
      @click="toggleMode"
      icon
    >
      <span class="material-icons" v-if="!isAddingMarker">room</span>
      <span class="material-icons" v-else>done</span>
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const isAddingMarker = computed(() => store.getters['address/isAddingMarker'] as boolean);
const buttonColor = computed(() => isAddingMarker.value ? 'red' : 'green');

const toggleMode = () => {
  store.dispatch('address/toggleAddMarkerMode');
};
</script>


<style lang="scss">
@use '../styles/components/toggleAddMarker.scss' as *;
</style>

