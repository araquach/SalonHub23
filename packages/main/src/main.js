import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from "auth/src/stores/authStore";
import { useTimeStore } from "time/src/stores/timeStore";

const app = createApp(App)

app.use(createPinia())
app.use(router)

const authStore = useAuthStore()
const timeStore = useTimeStore()

try {
    const userString = localStorage.getItem('user') // grab user data from local storage
    if (userString) { // check to see if there is indeed a user
        const userData = JSON.parse(userString) // parse user data into JSON
        authStore.setUserData(userData) // restore user data with Pinia
        if (authStore.user && authStore.user.stylist_id) {
            timeStore.loadTimeDetails(authStore.user.stylist_id)
                .then(() => {
                    console.log(timeStore.timeDetails)
                }).catch((error) => {
                console.error("Error loading time details: ", error);
            });
        }
    }
} catch (error) {
    console.error("Error parsing user data: ", error);
}

app.mount('#app')
