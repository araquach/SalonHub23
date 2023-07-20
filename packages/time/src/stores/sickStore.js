import { defineStore } from 'pinia'
import axios from "axios";
import {useAuthStore} from "auth/src/stores/authStore";

export const useSickStore = defineStore('sick', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            sickDays: [],
            sickDaysLoading: null,
            sickDay: {}
        }
    },

    actions: {
        async loadSickDays() {
            const authStore = useAuthStore()
            const id = authStore.user.staff_id
            this.sickDaysLoading = true;
            try {
                const data = await axios.get(`http://localhost:8060/api/time/sick-days/${id}`);
                this.sickDays = data.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.sickDaysLoading = false
            }
            return { sickDays: this.sickDays, sickDaysLoading: this.sickDaysLoading }
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