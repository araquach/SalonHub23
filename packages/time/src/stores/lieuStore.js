import { defineStore } from 'pinia'
import axios from "axios";

export const useLieuStore = defineStore('lieu', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            lieuHours: [],
            lieuHour: {}
        }
    },

    actions: {
        async loadLieuHours() {
            // const authStore = useAuthStore();
            try {
                const data = await axios.get(`http://localhost:8060/api/time/lieu-hours/1`);
                this.lieuHours = data.data;
                return this.lieuHours
            } catch (error) {
                console.log(error);
                throw error
            }
        },

        async loadLieuHour(id) {
            // const authStore = useAuthStore();
            try {
                const data = await axios.get(`http://localhost:8060/api/time/lieu-hour/${id}`);
                this.lieuHour = data.data;
                return this.lieuHour
            } catch (error) {
                console.log(error);
                throw error;
            }
        },

        // async addLieuHours (payload) {
        //     axios.post('/api/holiday', payload).then(_ => {
        //         commit('ADD_HOLIDAY', payload)
        //     })
        // }
    }
})