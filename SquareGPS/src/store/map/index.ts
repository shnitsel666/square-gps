import { Module } from 'vuex';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { RootState } from '../types';
import AddressState from './types';

const addressModule: Module<AddressState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default addressModule;
