import { defineStore } from 'pinia'
import axios from "axios";
import {useAuthStore} from "auth/src/stores/authStore";

export const useFreeTimeStore = defineStore('freeTime', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            freeTimes: [],
            freeTime: {},
            submitStatus: null,
            freeTimeEntitlement: 12
        }
    },

    actions: {
        async loadFreeTimes() {
            const authStore = useAuthStore()
            const id = authStore.user.staff_id
            try {
                const data = await axios.get(`http://localhost:8060/api/time/free-times/${id}`);
                this.freeTimes = data.data;
                return this.freeTimes
            } catch (error) {
                console.log(error);
                throw error
            }
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
            try {
                const response = await axios.post('http://localhost:8060/api/time/free-time-create', freeTime)
                this.submitStatus = true
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