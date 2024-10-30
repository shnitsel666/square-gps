import { createStore } from 'vuex';
import addressModule from './addressModule';

const store = createStore({
  modules: {
    address: addressModule
  }
});

export default store;
