import { defineStore } from 'pinia'
import axios from "axios";

export const useFreeTimeStore = defineStore('freeTime', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            freeTimes: [],
            freeTime: {},
            freeTimeEntitlement: 12
        }
    },

    actions: {
        async loadFreeTimes() {
            // const authStore = useAuthStore();
            try {
                const data = await axios.get(`http://localhost:8060/api/time/free-times/1`);
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

        // async addHoliday (payload) {
        //     axios.post('/api/holiday', payload).then(_ => {
        //         commit('ADD_HOLIDAY', payload)
        //     })
        // }
    }
})