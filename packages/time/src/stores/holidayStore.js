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
            submitStatus: null
        }
    },

    getters: {
        // holidayTotal: state => state.holidays.reduce(function (accumulator, currentValue) {
        //     return accumulator + currentValue.hours_requested
        // }, initialValue),
        // remainingHolidays: (state, getters) => state.entitlement - (getters.holidayTotal / 8),
        // totalSaturdays: state => state.holidays.reduce(function (accumulator, currentValue) {
        //     return accumulator + currentValue.saturday
        // }, initialValue),
        // remainingSaturdays: (state, getters) => 5 - getters.totalSaturdays,
        // awaitingHolidays: state => state.holidays.filter(f => f.approved === 0),
        // approvedHolidays: state => state.holidays.filter(f => f.approved === 1),
        // deniedHolidays: state => state.holidays.filter(f => f.approved === 2)
    },

    actions: {
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