import { createStore } from 'vuex';
import { RootState } from './types';
import addressModule from './map';

const store = createStore<RootState>({
  modules: {
    address: addressModule,
  },
});

export default store;