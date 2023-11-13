import './manifest.json'
import './assets/main.css'

import './bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { Icon } from '@iconify/vue/dist/iconify.js'
import VCard from './components/VCard.vue'
import DefaultLayoutVue from './layouts/DefaultLayout.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('VCard', VCard)
app.component('VIcon', Icon)
app.component('DefaultLayout', DefaultLayoutVue)

app.mount('#app')
