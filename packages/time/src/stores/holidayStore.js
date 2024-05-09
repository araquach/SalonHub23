import { defineStore } from 'pinia';
import { useAuthStore } from "auth/src/stores/authStore"
import holidayService from "../services/holidayService";

export const useHolidayStore = defineStore('holiday', {
    state: () => {
        return {
            holidayDash: {},
            holidayDashLoading: null,
            holidays: [],
            holidaysLoading: null,
            holiday: {},
            holidayLoading: null,
            activeFilter: 3
        }
    },

    getters: {
        filteredHolidays() {
            let filtered;

            switch (this.activeFilter) {
                case 0: // Approved
                    filtered = this.holidays.filter(holidays => holidays.approved === 0);
                    break;
                case 1: // Awaiting
                    filtered = this.holidays.filter(holidays => holidays.approved === 1);
                    break;
                case 2: // Denied
                    filtered = this.holidays.filter(holidays => holidays.approved === 2);
                    break;
                case 3: // All
                    filtered = this.holidays;
                    break;
                default: // All
                    filtered = [];
                    break;
            }

            return filtered.sort((a, b) => b.id - a.id); // This line will sort the filtered array by `id` in descending order.
        }
    },


    actions: {
        async loadHolidayDash() {
            const authStore = useAuthStore()
            const id = authStore.user.staff_id
            this.holidayDashLoading === true
            try {
                const response = await holidayService.getHolidayDash(id)
                this.holidayDash = response.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.holidayDashLoading = false;
            }
            return { holidayDash: this.holidayDash, holidaysDashLoading: this.holidayDashLoading }
        },

        setActiveFilter(filter) {
            if(filter === 'all') {
                this.activeFilter = 3;
            } else {
                this.activeFilter = parseInt(filter, 10) || 0;
            }
        },

        async loadHolidays() {
            const authStore = useAuthStore()
            const id = authStore.user.staff_id
            this.holidaysLoading = true;
            try {
                const response = await holidayService.getHolidays(id)
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
                const response = await holidayService.getHoliday(id)
                this.holiday = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            } finally {
                this.holidayLoading = false;
            }
            return { holiday: this.holiday, holidayLoading: this.holidayLoading }
        },

        async submitHoliday(holiday) {
            try {
                await holidayService.postHoliday(holiday)
            } catch (error) {
                console.error(error)
            }
        },

        async updateHoliday(id, holiday) {
            try {
                const updatedHoliday = await holidayService.updateHoliday(id, holiday);
                this.holidays = this.holidays.map(h => h.id === holiday.id ? updatedHoliday : h);
                return updatedHoliday;
            } catch (error) {
                console.error(error);
            }
        }
    }
})