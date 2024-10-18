import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
const customTheme = {
  dark: false,
  colors: {
    'blue-udec': '#004c7f ',
    white: '#ffffff',
    correct: '#b6e4ce',
    incorrect: '#fbd7d8',
  },
}
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme,
    },
  },
})
const app = createApp(App)
app.use(vuetify)
app.mount('#app')
