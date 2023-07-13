import { defineStore } from 'pinia'
import axios from "axios";

export const useSickStore = defineStore('sick', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            sickDays: []
        }
    },

    actions: {
        async loadSickDays() {
            // const authStore = useAuthStore();
            try {
                const data = await axios.get(`http://localhost:8060/api/time/sick-days/1`);
                this.sickDays = data.data;
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