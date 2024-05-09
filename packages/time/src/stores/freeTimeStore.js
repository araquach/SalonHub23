import { defineStore } from 'pinia'
import {useAuthStore} from "auth/src/stores/authStore";
import freeTimeService from "../services/freeTimeService";

export const useFreeTimeStore = defineStore('freeTime', {
    state: () => {
        return {
            freeTimeDash: {},
            freeTimeDashLoading: null,
            freeTimes: [],
            freeTimesLoading: null,
            freeTime: {},
            freeTimeLoading: null,
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
        async loadFreeTimeDash() {
            const authStore = useAuthStore()
            const id = authStore.user.staff_id
            this.freeTimeDashLoading === true
            try {
                const response = await freeTimeService.getFreeTimeDash(id)
                this.freeTimeDash = response.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.freeTimeDashLoading = false;
            }
            return { freeTimeDash: this.freeTimeDash, freeTimeDashLoading: this.freeTimeDashLoading }
        },

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
            return { freeTimes: this.freeTimes, freeTimesLoading: this.freeTimesLoading }
        },

        async loadFreeTime(id) {
            this.freeTimeLoading = true
            try {
                const response = await freeTimeService.getFreeTime(id)
                this.freeTime = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            } finally {
                this.freeTimeLoading = false;
            }
            return { freeTime: this.freeTime, freeTimeLoading: this.freeTimeLoading }
        },

        async submitFreeTime(freeTime) {
            try {
                await freeTimeService.postFreeTime(freeTime)
            } catch (error) {
                console.error(error)
            }
        },

        async updateFreeTime(id, freeTime) {
            try {
                const updatedFreeTime = await freeTimeService.updateFreeTime(id, freeTime);
                this.freeTime = this.freeTimes.map(ft => ft.id === freeTime.id ? updatedFreeTime : ft);
                return updatedFreeTime
            } catch (error) {
                console.error(error);
            }
        }
    }
})