import { defineStore } from 'pinia';
import { useAuthStore } from "auth/src/stores/authStore"
import axios from "axios";
import {useTimeStore} from "./timeStore";

//const initialValue = 0

export const useHolidayStore = defineStore('holiday', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            holidays: [],
            holidaysLoading: null,
            holiday: {},
            entitlement: 28,
            submitStatus: null,
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
                const data = await axios.get(`http://localhost:8060/api/time/holidays/${id}`);
                this.holidays = data.data;
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
                const data = await axios.get(`http://localhost:8060/api/time/holiday/${id}`);
                this.holiday = data.data;
                return this.holiday;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },

        async submitHoliday(holiday) {
            const timeStore = useTimeStore();
            try {
                const response = await axios.post('http://localhost:8060/api/time/holiday-create', holiday)
                this.submitStatus = true
                timeStore.timeDetails.saturdays -= holiday.saturday;
                timeStore.timeDetails.holidays += holiday.hours_requested
                return console.log(response)
            } catch (error) {
                console.error(error)
                this.submitStatus = false
            }
        }
    }
})