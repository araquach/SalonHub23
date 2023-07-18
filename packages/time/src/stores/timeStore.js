import { defineStore } from 'pinia'
import axios from "axios";
import {useAuthStore} from "auth/src/stores/authStore";

export const useTimeStore = defineStore('time', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            timeDetails: {}
        }
    },

    actions: {
        async loadTimeDetails(id) {
            try {
                const data = await axios.get(`http://localhost:8060/api/time/time-details/${id}`);
                this.timeDetails = data.data;
                return this.timeDetails
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
    }
})