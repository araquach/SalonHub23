import { defineStore } from 'pinia'
import axios from "axios";

export const useTimeStore = defineStore('time', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            timeDetails: {},
            timeDetailsLoading: null
        }
    },

    getters: {
        // Holiday Getters
        holidayEntitlement() {

        }
    },

    actions: {
        async loadTimeDetails(stylist_id) {
            this.timeDetailsLoading = true;
            try {
                const response = await axios.get(`http://localhost:8060/api/time/time-details/${stylist_id}`);
                this.timeDetails = response.data;
            } catch (error) {
                console.error(error);
                throw error;
            } finally {
                this.timeDetailsLoading = false;
            }
            return { timeDetails: this.timeDetails, timeDetailsLoading: this.timeDetailsLoading };
        }
    }
})