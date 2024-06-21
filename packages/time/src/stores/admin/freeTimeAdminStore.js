import { defineStore } from 'pinia';
import {useFreeTimeStore} from "../freeTimeStore";
import freeTimeAdminService from "../../services/admin/freeTimeAdminService"
import holidayAdminService from "../../services/admin/holidayAdminService";

export const useFreeTimeAdminStore = defineStore('FreeTimeAdmin', {
    state: () => {
        return {
            freeTimeAdminDash: {},
            freeTimeAdminDashLoading: null,
            freeTimeHours: [],
            freeTimeHoursLoading: null,
            freeTimeHoursPending: [],
            freeTimeHoursPendingLoading: null
        }
    },

    getters: {

    },

    actions: {
        async loadFreeTimeAdminDash() {
            this.freeTimeAdminDashLoading = true
            try {
                const response = await freeTimeAdminService.getFreeTimeAdminDash()
                this.freeTimeAdminDash = response.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.freeTimeAdminDashLoading = false;
            }
            return { freeTimeAdminDash: this.freeTimeAdminDash, freeTimeAdminDashLoading: this.freeTimeAdminDashLoading }
        },

        async loadFreeTimeHoursPending() {
            this.freeTimeHoursPendingLoading = true;
            try {
                const response = await freeTimeAdminService.getFreeTimeHoursPending()
                this.freeTimeHoursPending = response.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.freeTimeHoursPendingLoading = false;
            }
            return { freeTimeHoursPending: this.freeTimeHoursPending, freeTimeHoursPendingLoading: this.freeTimeHoursPendingLoading }
        },

        async loadFreeTimeHours(staff_id) {
            this.freeTimeHoursLoading = true;
            try {
                const response = await freeTimeAdminService.getFreeTimeHours(staff_id)
                this.freeTimeHours = response.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.freeTimeHoursLoading = false;
            }
            return { freeTimeHours: this.freeTimeHours, freeTimeHoursLoading: this.freeTimeHoursLoading }
        },

        async approveFreeTime(id, freeTime) {
            try {
                const approvedFreeTime = await freeTimeAdminService.approveFreeTime(id, freeTime);
                const freeTimeStore = useFreeTimeStore();
                freeTimeStore.freeTimes = freeTimeStore.freeTimes.map(ft => ft.id === freeTime.ft ? approvedFreeTime : ft);
                return approvedFreeTime;
            } catch (error) {
                console.error(error);
            }
        }
    }
})