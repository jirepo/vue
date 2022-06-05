import { createApp } from 'vue'
import App from './App.vue'
import HttpPlugin from '@/plugins/HttpPlugin.js'
import LoggerPlugin  from '@/plugins/LoggerPlugin.js'
import { router } from './router/router.js' 
import store from './store/store.js'
import PrimeVue from 'primevue/config';
import baseCss from '@/assets/css/main.css'
import dateFormatDirecive from './directive/DateFormatDirective.js'

import themeCss from 'primevue/resources/themes/saga-blue/theme.css'       //theme
import primevueCss from 'primevue/resources/primevue.min.css'             //core css
import primeVueIcon from 'primeicons/primeicons.css'                  //icons


const app = createApp(App)
app.directive('date-format', dateFormatDirecive)
app.use(HttpPlugin) // AJAX Plugin
app.use(LoggerPlugin)  // Logger Plugin 
app.use(router) // Router
app.use(store)  // Store
app.use(PrimeVue) // UI Framework for Vue 3 
app.mount('#app') // Mount
