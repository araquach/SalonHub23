import { defineStore } from 'pinia';
import { useAuthStore } from "auth/src/stores/authStore"
import {useTimeStore} from "./timeStore";
import holidayService from "../services/holidayService";

//const initialValue = 0

export const useHolidayStore = defineStore('holiday', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            holidays: [],
            holidaysLoading: null,
            holiday: {},
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
            // const authStore = useAuthStore();
            try {
                const response = await holidayService.getHoliday(id)
                this.holiday = response.data;
                return this.holiday;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },

        async submitHoliday(holiday) {
            const timeStore = useTimeStore();
            try {
                await holidayService.postHoliday(holiday)
                timeStore.timeDetails.holidays_pending += holiday.hours_requested
                timeStore.timeDetails.saturdays_pending += holiday.saturday
            } catch (error) {
                console.error(error)
            }
        },

        async updateHoliday(id, holiday) {
            try {
                const updatedHoliday = await holidayService.updateHoliday(id, holiday);
                this.holidays = this.holidays.map(h => h.id === holiday.id ? updatedHoliday : h);

                // Fetch updated time data from the API.
                const authStore = useAuthStore();
                const stylistId = authStore.user.staff_id;
                const timeStore = useTimeStore();
                await timeStore.loadTimeDetails(stylistId);

                return updatedHoliday;
            } catch (error) {
                console.error(error);
            }
        }
    }
})