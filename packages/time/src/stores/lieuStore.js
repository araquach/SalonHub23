import { defineStore } from 'pinia'
import axios from "axios";

export const useLieuStore = defineStore('lieu', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            lieuHours: []
        }
    },

    actions: {
        async loadLieuHours() {
            // const authStore = useAuthStore();
            try {
                const data = await axios.get(`http://localhost:8060/api/time/lieu-hours/1`);
                this.lieuHours = data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },

        // async addLieuHours (payload) {
        //     axios.post('/api/holiday', payload).then(_ => {
        //         commit('ADD_HOLIDAY', payload)
        //     })
        // }
    }
})