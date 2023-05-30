import { defineStore } from 'pinia';
import axios from "axios";

export const useAuthStore = defineStore('auth', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            user: null
        }
    },

    getters: {
        loggedIn (state) {
            return !!state.user
        },

        isAdmin (state) {
            if (state.user.admin_level === 2) {
                return true
            }
        }
    },

    actions: {
        async register() {
            try {
                const data = await axios.post(
                    "http://localhost:8060/api/auth/register"
                );
                this.state.user = data.data
                localStorage.setItem('user', JSON.stringify(data.data))
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },

        async login() {
            try {
                const data = await axios.post(
                    "http://localhost:8060/api/auth/login"
                );
                this.state.user = data.data
                localStorage.setItem('user', JSON.stringify(data.data))
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },

        logout () {
            localStorage.removeItem('user')
            location.reload()
        }
    }
})