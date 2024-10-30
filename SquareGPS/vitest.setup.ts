import { config } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { createI18n } from 'vue-i18n';
import messages from './src/locales';

import 'vuetify/styles';

const vuetify = createVuetify();

const i18n = createI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages,
});

config.global.plugins = [vuetify, i18n];