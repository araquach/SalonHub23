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
        loggedIn(state) {
            return !!state.user;
        },
        isAdmin(state) {
            return state.user.admin_level === 2;
        }
    },

    actions: {
        async register(userCredentials) {
            try {
                const data = await axios.post(
                    "http://localhost:8060/api/auth/register",
                    userCredentials
                );
                this.user = data.data;
                localStorage.setItem('user', JSON.stringify(data.data));
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },

        async login(user) {
            try {
                const data = await axios.post(
                    "http://localhost:8060/api/auth/login", user
                );
                this.user = data.data;
                localStorage.setItem('user', JSON.stringify(data.data));
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;
                console.log(data.data);
            } catch (error) {
                console.log(error);
                throw error;
            }
        },

        logout() {
            localStorage.removeItem('user');
            location.reload();
        },

        setUserData(userData) {
            this.user = userData
        }
    }
});
