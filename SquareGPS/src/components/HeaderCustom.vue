<template>
    <div class="header-wrapper">
        <div class="header-mask"></div>
        <header class="header">
            <div class="header-title">{{ $t('headerTitle') }}</div>        
            <div class="header-nav">
            <v-btn component="router-link" to="/about">{{ $t('aboutMenuItem') }}</v-btn>
            <v-btn component="router-link" to="/map">{{ $t('mapMenuItem') }}</v-btn>    
            </div>
            <div class="header-lang-nav-wr">
            <languages-menu/>
            </div>      
        </header>  
    </div> 
</template>

<script lang="ts" setup>
import LanguagesMenu from './LanguagesMenu.vue';

</script>

<style lang="scss">
@use '../styles/components/headerCustom' as *;
</style>