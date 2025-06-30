import { createApp } from 'vue'
import './style.css'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import App from './App.vue'

createApp(App).use(router).mount('#app')
