import { defineStore } from 'pinia'
import axios from "axios";
import {useAuthStore} from "auth/src/stores/authStore";

export const useLieuStore = defineStore('lieu', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            lieuHours: [],
            lieuHoursLoading: null,
            lieuHour: {},
            submitStatus: null
        }
    },

    actions: {
        async loadLieuHours() {
            const authStore = useAuthStore()
            const id = authStore.user.staff_id
            this.lieuHoursLoading = true;
            try {
                const data = await axios.get(`http://localhost:8060/api/time/lieu-hours/${id}`);
                this.lieuHours = data.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.lieuHoursLoading = false;
            }
            return { lieuHours: this.lieuHours, lieuHoursLoading: this.lieuHoursLoading }
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

        async submitLieu(lieu) {
            try {
                const response = await axios.post('http://localhost:8060/api/time/lieu-hour-create', lieu)
                this.submitStatus = true
                return console.log(response)
            } catch (error) {
                console.error(error)
                this.submitStatus = false
            }
        }

        // async addLieuHours (payload) {
        //     axios.post('/api/holiday', payload).then(_ => {
        //         commit('ADD_HOLIDAY', payload)
        //     })
        // }
    }
})