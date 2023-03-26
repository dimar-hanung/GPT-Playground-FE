import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import FontAwesomeIcon from '@/modules/fontAwesome'
app.component('font-awesome', FontAwesomeIcon)

import VButton from './components/VButton.vue'
app.component('v-button', VButton)

import VRadio from './components/VRadio.vue'
app.component('v-radio', VRadio)

import VWave from 'v-wave'
app.use(VWave, { duration: 1 })

import VueGtag, { trackRouter } from 'vue-gtag-next'
app.use(VueGtag, {
  property: {
    id: import.meta.env.VITE_GA_ID
  }
})
trackRouter(router, {
  useScreenview: true
})

import { createPinia } from 'pinia'
app.use(createPinia())

import router from './router'
app.use(router)

app.mount('#app')
