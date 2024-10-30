import { Module } from 'vuex';
import Marker from '@/services/models/marker';

export interface AddressState {
  selectedAddress: Marker | null;
  addresses: Marker[];
}

const addressModule: Module<AddressState, any> = {
  namespaced: true,
  state: {
    selectedAddress: null,
    addresses: []
  },
  mutations: {
    SET_SELECTED_MARKER_ID(state, id: string | null) {
      if (id) {
        state.selectedAddress = state.addresses.find(address => address.id === id) || null;
      } else {
        state.selectedAddress = null;
      }
    },
    ADD_ADDRESS(state, address: Marker) {
      state.addresses.push(address);
    },
    REMOVE_ADDRESS(state, id: string) {
      state.addresses = state.addresses.filter(address => address.id !== id);
      if (state.selectedAddress?.id === id) {
        state.selectedAddress = state.addresses.length > 0 ? state.addresses[0] : null;
      }
    }
  },
  getters: {
    getSelectedMarkerId(state): string | null {
      return state.selectedAddress?.id || null;
    },
    getAllAddresses(state): Marker[] {
      return state.addresses;
    }
  },
  actions: {
    selectAddress({ commit }, id: string) {
      commit('SET_SELECTED_MARKER_ID', id);
    },
    addAddress({ commit }, address: Marker) {
      commit('ADD_ADDRESS', address);
    },
    removeAddress({ commit }, id: string) {
      commit('REMOVE_ADDRESS', id);
    }
  }
};

export default addressModule;
