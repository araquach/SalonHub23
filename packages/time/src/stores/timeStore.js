import { defineStore } from 'pinia'
import axios from "axios";
import {useAuthStore} from "auth/src/stores/authStore";
import timeService from "../services/timeService";

export const useTimeStore = defineStore('time', {
    state: () => {
        return {
            timeDash: {},
            timeDashLoading: null,
            timeDetails: {},
            timeDetailsLoading: null
        }
    },

    getters: {

    },

    actions: {
        async loadTimeDash() {
            const authStore = useAuthStore()
            const id = authStore.user.staff_id
            this.timeDashLoading = true
            try {
                const response = await timeService.getTimeDash(id)
                this.timeDash = response.data;
            } catch (error) {
                console.log(error)
                throw error
            } finally {
                this.timeDashLoading = false;
            }
            return { timeDash: this.timeDash, timeDashLoading: this.timeDashLoading }
        },

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