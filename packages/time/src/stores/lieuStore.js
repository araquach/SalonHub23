import { defineStore } from 'pinia'
import {useAuthStore} from "auth/src/stores/authStore";
import {useTimeStore} from "./timeStore";
import lieuService from "../services/lieuService";
import holidayService from "../services/holidayService";

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
            try {
                const response = await lieuService.getLieuHour(id)
                this.lieuHour = response.data;
                return this.lieuHour
            } catch (error) {
                console.log(error);
                throw error;
            }
        },

        async submitLieu(lieu) {
            const timeStore = useTimeStore();
            try {
                await lieuService.postLieuHour(lieu)
                this.submitStatus = true
                timeStore.timeDetails.lieu_pending += lieu.lieu_hours
            } catch (error) {
                console.error(error)
                this.submitStatus = false
            }
        },

        async updateLieu(id, lieu) {
            try {
                const updatedLieu = await lieuService.updateLieuHour(id, lieu);
                this.lieuHours = this.lieuHours.map(l => l.id === lieu.id ? updatedLieu : l);

                // Fetch updated time data from the API.
                const authStore = useAuthStore();
                const stylistId = authStore.user.staff_id;
                const timeStore = useTimeStore();
                await timeStore.loadTimeDetails(stylistId);

                return updatedLieu;
            } catch (error) {
                console.error(error);
            }
        }
    }
})