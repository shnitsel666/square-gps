<template>
  <v-app class="app-main">
    <v-app-bar color="primary" class="app-bar-main" dark>
      <header-custom/>            
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import HeaderCustom from './components/HeaderCustom.vue';

</script>

<style lang="scss">
@use './styles/views/app' as *;
</style>