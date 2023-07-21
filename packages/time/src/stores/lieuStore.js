import { defineStore } from 'pinia'
import axios from "axios";
import {useAuthStore} from "auth/src/stores/authStore";
import {useTimeStore} from "./timeStore";

export const useLieuStore = defineStore('lieu', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            lieuHours: [],
            lieuHoursLoading: null,
            lieuHour: {},
            submitStatus: null,
            activeFilter: 3
        }
    },

    getters: {
        filteredLieuHours() {
            let filtered

            switch (this.activeFilter) {
                case 0: // Approved
                    filtered = this.lieuHours.filter(lieuHours => lieuHours.approved === 0);
                    break;
                case 1: // Awaiting
                    filtered = this.lieuHours.filter(lieuHours => lieuHours.approved === 1);
                    break;
                case 2: // Denied
                    filtered = this.lieuHours.filter(lieuHours => lieuHours.approved === 2);
                    break;
                case 3: // All
                    filtered = this.lieuHours;
                    break;
                default: // All
                    filtered = [];
                    break;
            }
            return filtered.sort((a, b) => b.id - a.id);
        }
    },

    actions: {
        setActiveFilter(filter) {
            if(filter === 'all') {
                this.activeFilter = 3;
            } else {
                this.activeFilter = parseInt(filter, 10) || 0;
            }
        },

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
            const timeStore = useTimeStore();
            try {
                const response = await axios.post('http://localhost:8060/api/time/lieu-hour-create', lieu)
                this.submitStatus = true
                timeStore.timeDetails.lieu_hours += lieu.lieu_hours
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