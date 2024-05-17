import { defineStore } from 'pinia';
import holidayAdminService from "../../services/admin/holidayAdminService";
import {useHolidayStore} from "../holidayStore";
import {useAuthStore} from "auth/src/stores/authStore";
import holidayService from "../../services/holidayService";

export const useHolidayAdminStore = defineStore('holidayAdmin', {
    state: () => {
        return {
            holidayAdminDash: {},
            holidayAdminDashLoading: null,
            holidays: [],
            holidaysPending: [],
            holidaysPendingLoading: null,
            holidaysLoading: null,
            holiday: {},
            holidayLoading: null
        }
    },

    getters: {

    },

    actions: {
        async loadHolidayAdminDash() {
            this.holidayAdminDashLoading === true
            try {
                const response = await holidayAdminService.getHolidayAdminDash()
                this.holidayAdminDash = response.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.holidayAdminDashLoading = false;
            }
            return { holidayAdminDash: this.holidayAdminDash, holidayAdminDashLoading: this.holidayAdminDashLoading }
        },

        setActiveFilter(filter) {
            if(filter === 'all') {
                this.activeFilter = 3;
            } else {
                this.activeFilter = parseInt(filter, 10) || 0;
            }
        },

        async loadHolidaysPending() {
            this.holidaysPendingLoading = true;
            try {
                const response = await holidayAdminService.getHolidaysPending()
                this.holidaysPending = response.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.holidaysPendingLoading = false;
            }
            return { holidaysPending: this.holidaysPending, holidaysPendingLoading: this.holidaysPendingLoading }
        },

        async loadHolidays() {
            this.holidaysLoading = true;
            try {
                const response = await holidayAdminService.getHolidays()
                this.holidays = response.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.holidaysLoading = false;
            }
            return { holidays: this.holidays, holidaysLoading: this.holidaysLoading }
        },

        async loadHoliday(id) {
            this.holidayLoading = true
            try {
                const response = await holidayAdminService.getHoliday(id)
                this.holiday = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            } finally {
                this.holidayLoading = false;
            }
            return { holiday: this.holiday, holidayLoading: this.holidayLoading }
        },

        async updateHoliday(id, holiday) {
            try {
                const updatedHoliday = await holidayService.updateHoliday(id, holiday);
                this.holidays = this.holidays.map(h => h.id === holiday.id ? updatedHoliday : h);
                return updatedHoliday;
            } catch (error) {
                console.error(error);
            }
        },

        async approveHoliday(id, holiday) {
            try {
                const approvedHoliday = await holidayAdminService.approveHoliday(id, holiday);
                const holidayStore = useHolidayStore();
                holidayStore.holidays = holidayStore.holidays.map(h => h.id === holiday.id ? approvedHoliday : h);
                return approvedHoliday;
            } catch (error) {
                console.error(error);
            }
        }
    }
})