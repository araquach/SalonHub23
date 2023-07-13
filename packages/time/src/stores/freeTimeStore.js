import { defineStore } from 'pinia'
import axios from "axios";

export const useFreeTimeStore = defineStore('freeTime', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            freeTimes: [],
            freeTimesLoaded: false,
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
                this.freeTimesLoaded = true;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },

        // async addHoliday (payload) {
        //     axios.post('/api/holiday', payload).then(_ => {
        //         commit('ADD_HOLIDAY', payload)
        //     })
        // }
    }
})