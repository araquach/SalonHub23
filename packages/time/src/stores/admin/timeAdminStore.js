import { defineStore } from 'pinia'
import timeAdminService from "../../services/admin/timeAdminService";

export const useTimeAdminStore = defineStore('timeAdmin', {
    state: () => {
        return {
            timeAdminDash: {},
            timeAdminDashLoading: null,
            timeDetails: {},
            timeDetailsLoading: null
        }
    },

    getters: {

    },

    actions: {
        async loadTimeAdminDash() {
            const salon_id = 1
            this.timeAdminDashLoading === true
            try {
                const response = await timeAdminService.getTimeAdminDash(salon_id)
                this.timeAdminDash = response.data;
            } catch (error) {
                console.log(error)
                throw error
            } finally {
                this.timeAdminDashLoading === false;
            }
            return { timeAdminDash: this.timeAdminDash, timeAdminDashLoading: this.timeAdminDashLoading }
        },
    }
})