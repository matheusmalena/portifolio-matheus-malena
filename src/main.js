import { createApp } from 'vue'
import './style.css'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import { createI18n } from 'vue-i18n';
import App from './App.vue'

import pt from './locales/pt.json';
import en from './locales/en.json';
import es from './locales/es.json';

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'pt',
    fallbackLocale: 'en',
    messages: {
        pt,
        en,
        es,
    },
});

createApp(App).use(i18n).use(router).mount('#app')
