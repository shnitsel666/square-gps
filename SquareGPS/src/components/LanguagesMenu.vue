<template>
  <v-btn color="white" icon size="small" class="header-language-button">
    <span class="material-icons">language</span>
    <v-menu activator="parent">
      <v-list>
        <v-list-item link @click="changeLanguage('ru')">
          <v-list-item-title>{{ $t('russianLanguage') }}</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="changeLanguage('en')">
          <v-list-item-title>{{ $t('englishLanguage') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-btn>    
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const changeLanguage = (lang: string) => {
  locale.value = lang;
  localStorage.setItem('locale', lang);
};
</script>

<style lang="scss">
@use '../styles/components/languagesMenu.scss' as *;
</style>