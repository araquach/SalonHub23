import { defineStore } from 'pinia';
import axios from "axios";
import authService from "../services/authService";

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
            return state.user.admin_level === 3;
        }
    },

    actions: {
        async register(userCredentials) {
            try {
                const data = await authService.postRegister(userCredentials);
                this.user = data;
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },

        async login(user) {
            try {
                const data = await authService.postLogin(user);
                this.user = data;
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },

        logout() {
            this.$reset();
            location.reload();
        },
    },
    persist: true
});
