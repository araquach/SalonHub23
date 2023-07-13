import { defineStore } from 'pinia'
import axios from "axios";

export const useSickStore = defineStore('sick', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            sickDays: [],
            sickDay: {}
        }
    },

    actions: {
        async loadSickDays() {
            // const authStore = useAuthStore();
            try {
                const data = await axios.get(`http://localhost:8060/api/time/sick-days/1`);
                this.sickDays = data.data;
                return this.sickDays
            } catch (error) {
                console.log(error);
                throw error
            }
        },

        async loadSickDay(id) {
            // const authStore = useAuthStore();
            try {
                const data = await axios.get(`http://localhost:8060/api/time/sick-day/${id}`);
                this.sickDay = data.data;
                return this.sickDay
            } catch (error) {
                console.log(error);
                throw error
            }
        },

        // async addHoliday (payload) {
        //     axios.post('/api/holiday', payload).then(_ => {
        //         commit('ADD_HOLIDAY', payload)
        //     })
        // }
    }
})