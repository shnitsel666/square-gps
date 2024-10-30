<template>
  <div class="address-search">
    <v-text-field
      v-model="query"
      :label="$t('searchAddress')"
      @input="onInput"
      :loading="isLoading"
      clearable
      outlined
      hide-details
    ></v-text-field>
    <v-list v-if="searchResults.length">
      <v-list-item
        v-for="result in searchResults"
        :key="result.place_id"
        @click="handleSelectAddress(result)"
        class="pointer"
      >
        <div>{{ result.display_name }}</div>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { debounce } from 'lodash';
import { useToast } from 'vue-toastification';
import SearchResult from '@/services/models/searchResult';
import SearchAddressQuery from '@/services/models/queries/searchAddressQuery';

const store = useStore();
const toast = useToast();

const query = ref('');
const isLoading = ref(false);

const searchResults = computed(() => store.getters['address/getSearchResults'] as SearchResult[]);

const debouncedFetch = debounce(async (searchQuery: string) => {
  if (!searchQuery) {
    isLoading.value = false;
    return;
  }
  isLoading.value = true;
    const query: SearchAddressQuery = {
      searchQuery: searchQuery,
    }
  await store.dispatch('address/fetchResults', query);
  isLoading.value = false;
}, 500);

const onInput = () => {
  debouncedFetch(query.value);
};

const handleSelectAddress = async (searchResult: SearchResult) => {
  isLoading.value = true;
  try {
    const query: SearchAddressQuery = {
      lon: searchResult.lon,
      lat: searchResult.lat,
      searchQuery: ''
    }
    await store.dispatch('address/selectAddressAction', query);
  } catch (error: any) {
    console.error(error);
  } finally {
    isLoading.value = false;
    query.value = '';
  }
};
</script>

<style lang="scss">
@use '../styles/components/addressSearch' as *;
</style>
