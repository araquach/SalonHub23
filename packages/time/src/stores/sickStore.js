import {defineStore} from 'pinia'
import {useAuthStore} from "auth/src/stores/authStore";
import sickService from "../services/sickService";

export const useSickStore = defineStore('sick', {
    state: () => {
        return {
            sickDash: {},
            sickDashLoading: null,
            sickDays: [],
            sickDaysLoading: null,
            sickDay: {},
            sickDayLoading: null,
            submitStatus: null,
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
        async loadSickDash() {
            const authStore = useAuthStore()
            const id = authStore.user.staff_id
            this.sickDashLoading = true
            try {
                const response = await sickService.getSickDash(id)
                this.sickDash = response.data;
            } catch (error) {
                console.log(error)
                throw error
            } finally {
                this.sickDashLoading = false;
            }
            return { sickDash: this.sickDash, sickDashLoading: this.sickDashLoading }
        },

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
            this.sickDayLoading = false
            try {
                const response = await sickService.getSickDay(id)
                this.sickDay = response.data;
            } catch (error) {
                console.log(error)
                throw error
            } finally {
                this.sickDayLoading = false;
            }
            return { sickDay: this.sickDay, sickDayLoading: this.sickDayLoading }
        }
    },
    persist: true
})