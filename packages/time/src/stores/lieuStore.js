import { defineStore } from 'pinia'
import {useAuthStore} from "auth/src/stores/authStore";
import lieuService from "../services/lieuService";

export const useLieuStore = defineStore('lieu', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            lieuDash: {},
            lieuDashLoading: null,
            lieuHours: [],
            lieuHoursLoading: null,
            lieuHour: {},
            lieuHourLoading: null,
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
        async loadLieuDash() {
            const authStore = useAuthStore()
            const id = authStore.user.staff_id
            this.lieuDashLoading === true
            try {
                const response = await lieuService.getLieuDash(id)
                this.lieuDash = response.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.lieuDashLoading = false;
            }
            return { lieuDash: this.lieuDash, lieuDashLoading: this.lieuDashLoading }
        },

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
                const response = await lieuService.getLieuHours(id)
                this.lieuHours = response.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.lieuHoursLoading = false;
            }
            return { lieuHours: this.lieuHours, lieuHoursLoading: this.lieuHoursLoading }
        },

        async loadLieuHour(id) {
            this.lieuHourLoading = false
            try {
                const response = await lieuService.getLieuHour(id)
                this.lieuHour = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            } finally {
                this.lieuHourLoading = false;
            }
            return { lieuHour: this.lieuHour, lieHourLoading: this.lieuHourLoading }
        },

        async submitLieu(lieuHour) {
            try {
                await lieuService.postLieuHour(lieuHour)
            } catch (error) {
                console.error(error)
            }
        },

        async updateLieu(id, lieuHour) {
            try {
                const updatedLieu = await lieuService.updateLieuHour(id, lieuHour);
                this.lieuHours = this.lieuHours.map(l => l.id === lieuHour.id ? updatedLieu : l)
                return updatedLieu;
            } catch (error) {
                console.error(error);
            }
        }
    }
})