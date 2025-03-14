import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
// Set up the router for the SPA (Application)
// Look at router/index.js file in this folder
app.use(router)

app.mount('#app')
