import { defineStore } from 'pinia'
import {useAuthStore} from "auth/src/stores/authStore";
import {useTimeStore} from "./timeStore";
import freeTimeService from "../services/freeTimeService";
import holidayService from "../services/holidayService";

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
                timeStore.timeDetails.free_time_pending += freeTime.free_time_hours
            } catch (error) {
                console.error(error)
            }
        },

        async updateFreeTime(id, freeTime) {
            try {
                const updatedFreeTime = await freeTimeService.updateFreeTime(id, freeTime);
                this.freeTime = this.freeTimes.map(ft => ft.id === freeTime.id ? updatedFreeTime : ft);

                // Fetch updated time data from the API.
                const authStore = useAuthStore();
                const stylistId = authStore.user.staff_id;
                const timeStore = useTimeStore();
                await timeStore.loadTimeDetails(stylistId);

                return updatedFreeTime;
            } catch (error) {
                console.error(error);
            }
        }
    }
})