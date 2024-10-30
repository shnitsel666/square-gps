import { GetterTree } from 'vuex';
import AddressState from './types';
import { RootState } from '../types';
import SearchResult from '@/services/models/searchResult';

const getters: GetterTree<AddressState, RootState> = {
  getSelectedAddress(state): SearchResult | null {
    return state.selectedAddress;
  },
  
  getSelectedMarkerId(state): string | null {
    return state.selectedMarkerId;
  },
  
  getSearchResults(state): SearchResult[] {
    return state.searchResults;
  },

  isAddingMarker(state): boolean {
    return state.isAddingMarker;
  },
};

export default getters;
