import {defineStore} from 'pinia'
import axios from "axios";
import {useAuthStore} from "auth/src/stores/authStore";
import sickService from "../services/sickService";

export const useSickStore = defineStore('sick', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            sickDays: [],
            sickDaysLoading: null,
            sickDay: {},
            activeFilter: 2
        }
    },

    getters: {
        filteredSickDays() {
            let filtered;

            switch (this.activeFilter) {
                case 0: // Awaiting
                    filtered = this.sickDays.filter(sickDays => sickDays.deducted === 0);
                    break;
                case 1: // Deducted
                    filtered = this.sickDays.filter(sickDays => sickDays.deducted === 1);
                    break;
                case 2: // All
                    filtered = this.sickDays;
                    break;
                default: // All
                    filtered = [];
                    break;
            }
            return filtered.sort((a, b) => b.id - a.id);
        },
    },

    actions: {
        setActiveFilter(filter) {
            if (filter === 'all') {
                this.activeFilter = 2;
            } else {
                this.activeFilter = parseInt(filter, 10) || 0;
            }
        },

        async loadSickDays() {
            const authStore = useAuthStore()
            const id = authStore.user.staff_id
            this.sickDaysLoading = true;
            try {
                const response = await sickService.getSickDays(id)
                this.sickDays = response.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.sickDaysLoading = false
            }
            return {sickDays: this.sickDays, sickDaysLoading: this.sickDaysLoading}
        },

        async loadSickDay(id) {
            // const authStore = useAuthStore();
            try {
                const response = await sickService.getSickDay(id)
                this.sickDay = response.data;
                return this.sickDay
            } catch (error) {
                console.log(error);
                throw error
            }
        }
    }
})