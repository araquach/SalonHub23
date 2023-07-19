import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {useAuthStore} from "auth/src/stores/authStore";

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

const authStore = useAuthStore()

const userString = localStorage.getItem('user') // grab user data from local storage
if (userString) { // check to see if there is indeed a user
    const userData = JSON.parse(userString) // parse user data into JSON
    authStore.setUserData(userData) // restore user data with Pinia
}
