import { ActionTree } from 'vuex';
import AddressState from './types';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../types';
import Address from '@/services/models/address';
import SearchResult from '@/services/models/searchResult';
import SearchAddressQuery from '@/services/models/queries/searchAddressQuery';
import { useToast } from 'vue-toastification';
import i18n from '@/i18n';
import APP_CONFIGS from '@/const/urls';

const OPENCAGE_API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;
const toast = useToast();

const actions: ActionTree<AddressState, RootState> = {

  selectAddress({ commit }, address: Address) {
    commit('SET_SELECTED_ADDRESS', address);
  },
  
  async fetchResults({ commit }, searchQuery: SearchAddressQuery) {
    if (!searchQuery) {
      commit('SET_SEARCH_RESULTS', []);
      return;
    }

    try {
      const response = await axios.get<SearchResult[]>(
        `${APP_CONFIGS.mapApi}search?q=${encodeURIComponent(searchQuery.searchQuery)}&api_key=${OPENCAGE_API_KEY}`
      );
      commit('SET_SEARCH_RESULTS', response.data);
    } catch (error) {
      toast.error(i18n.global.t('text26'));
      commit('SET_SEARCH_RESULTS', []);
    }
  },
  
  async selectAddressAction({ commit }, searchQuery: SearchAddressQuery): Promise<SearchResult> {
    let result: SearchResult = {};
    try {
      const response = await fetch(
        `${APP_CONFIGS.mapApi}/reverse?lat=${searchQuery.lat}&lon=${searchQuery.lon}&api_key=${OPENCAGE_API_KEY}`
      );

      if (!response.ok) {
        toast.error(i18n.global.t('text27'));
      }
      const data = await response.json() as SearchResult;
      if (!data || !data.address) {
        toast.error(i18n.global.t('text28'));
        throw new Error(i18n.global.t('text28'));
      }

      data.address.id = uuidv4();
      result = data;
      commit('SET_SELECTED_ADDRESS', result);

      commit('SET_SEARCH_RESULTS', []);
      return result;

    } catch (error) {
      toast.error(i18n.global.t('text29'));
    }
    return result;
  },

  toggleAddMarkerMode({ commit, state }) {
    commit('TOGGLE_ADD_MARKER_MODE');
  },
};

export default actions;
