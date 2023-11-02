import './assets/main.css'

import './bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VCardVue from './components/VCard.vue'
import DefaultLayoutVue from './layouts/DefaultLayout.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)


app.component('VCard', VCardVue)
app.component('DefaultLayout', DefaultLayoutVue)

app.mount('#app')
