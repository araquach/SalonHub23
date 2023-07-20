import { defineStore } from 'pinia'
import axios from "axios";
import {useAuthStore} from "auth/src/stores/authStore";
import {useTimeStore} from "./timeStore";

export const useFreeTimeStore = defineStore('freeTime', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            freeTimes: [],
            freeTimesLoading: null,
            freeTime: {},
            submitStatus: null,
            freeTimeEntitlement: 12
        }
    },

    actions: {
        async loadFreeTimes() {
            const authStore = useAuthStore()
            const id = authStore.user.staff_id
            this.freeTimesLoading = true;
            try {
                const data = await axios.get(`http://localhost:8060/api/time/free-times/${id}`);
                this.freeTimes = data.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.freeTimesLoading = false;
            }
            return { freeTime: this.freeTimes, freeTimesLoading: this.freeTimesLoading }
        },

        async loadFreeTime(id) {
            // const authStore = useAuthStore();
            try {
                const data = await axios.get(`http://localhost:8060/api/time/free-time/${id}`);
                this.freeTime = data.data;
                return this.freeTime;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },

        async submitFreeTime(freeTime) {
            const timeStore = useTimeStore();
            try {
                const response = await axios.post('http://localhost:8060/api/time/free-time-create', freeTime)
                this.submitStatus = true
                timeStore.timeDetails.free_time += freeTime.free_time_hours
                return console.log(response)
            } catch (error) {
                console.error(error)
                this.submitStatus = false
            }
        }

        // async addHoliday (payload) {
        //     axios.post('/api/holiday', payload).then(_ => {
        //         commit('ADD_HOLIDAY', payload)
        //     })
        // }
    }
})