import { MutationTree } from 'vuex';
import AddressState from './types';
import SearchResult from '@/services/models/searchResult';

const mutations: MutationTree<AddressState> = {
  
  SET_SELECTED_ADDRESS(state, searchResult: SearchResult) {
    state.selectedAddress = searchResult;
  },
  SET_SELECTED_MARKER_ID(state, selectedMarkerId: string | null) {
    state.selectedMarkerId = selectedMarkerId;
  },
    
  SET_SEARCH_RESULTS(state, results: SearchResult[]) {
    state.searchResults = results;
  },

  TOGGLE_ADD_MARKER_MODE(state) {
    state.isAddingMarker = !state.isAddingMarker;
  },
};

export default mutations;