import { defineStore } from 'pinia'
import {useAuthStore} from "auth/src/stores/authStore";
import {useTimeStore} from "./timeStore";
import freeTimeService from "../services/freeTimeService";

export const useFreeTimeStore = defineStore('freeTime', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            freeTimes: [],
            freeTimesLoading: null,
            freeTime: {},
            submitStatus: null,
            freeTimeEntitlement: 12,
            activeFilter: 3
        }
    },

    getters: {
        filteredFreeTimes() {
            let filtered

            switch (this.activeFilter) {
                case 0: // Approved
                    filtered = this.freeTimes.filter(freeTimes => freeTimes.approved === 0);
                    break;
                case 1: // Awaiting
                    filtered = this.freeTimes.filter(freeTimes => freeTimes.approved === 1);
                    break;
                case 2: // Denied
                    filtered = this.freeTimes.filter(freeTimes => freeTimes.approved === 2);
                    break;
                case 3: // All
                    filtered = this.freeTimes;
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
            if(filter === 'all') {
                this.activeFilter = 3;
            } else {
                this.activeFilter = parseInt(filter, 10) || 0;
            }
        },

        async loadFreeTimes() {
            const authStore = useAuthStore()
            const id = authStore.user.staff_id
            this.freeTimesLoading = true;
            try {
                const response = await freeTimeService.getFreeTimes(id)
                this.freeTimes = response.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.freeTimesLoading = false;
            }
            return { freeTime: this.freeTimes, freeTimesLoading: this.freeTimesLoading }
        },

        async loadFreeTime(id) {
            try {
                const response = await freeTimeService.getFreeTime(id)
                this.freeTime = response.data;
                return this.freeTime;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },

        async submitFreeTime(freeTime) {
            const timeStore = useTimeStore();
            try {
                await freeTimeService.postFreeTime(freeTime)
                this.submitStatus = true
                timeStore.timeDetails.free_time += freeTime.free_time_hours
            } catch (error) {
                console.error(error)
                this.submitStatus = false
            }
        }
    }
})