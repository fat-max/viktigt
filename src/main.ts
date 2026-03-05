import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()

createApp(App).use(pinia).mount('#app')

// if (import.meta.env.MODE === 'development') {
//   app.config.performance = true // Enable Vue DevTools performance tracking
// }
