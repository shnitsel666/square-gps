import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import ru from './locales/ru.json';
import store from './store';
import vuetify from './plugins/vuetify';
import 'vuetify/styles';
import Toast from 'vue-toastification';
import i18n from './i18n';



const messages = {
    en,
    ru,
  };
const savedLocale = localStorage.getItem('locale') || 'en';
import 'leaflet/dist/leaflet.css';
import 'vue-toastification/dist/index.css';
import OPTIONS_TOAST from './const/toast';
const app = createApp(App);

app.use(i18n);
app.use(router);
app.use(store);
app.use(vuetify);
app.use(Toast, OPTIONS_TOAST);

app.mount('#app');