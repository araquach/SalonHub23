import { defineStore } from 'pinia';
import { useAuthStore } from "auth/src/stores/authStore"
import axios from "axios";

const initialValue = 0

export const useHolidayStore = defineStore('holiday', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            holidays: [],
            holidaysLoaded: false,
            entitlement: 28
        }
    },

    getters: {
        holidayTotal: state => state.holidays.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.hours_requested
        }, initialValue),
        remainingHolidays: (state, getters) => state.entitlement - (getters.holidayTotal / 8),
        totalSaturdays: state => state.holidays.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.saturday
        }, initialValue),
        remainingSaturdays: (state, getters) => 5 - getters.totalSaturdays,
        awaitingHolidays: state => state.holidays.filter(f => f.approved === 0),
        approvedHolidays: state => state.holidays.filter(f => f.approved === 1),
        deniedHolidays: state => state.holidays.filter(f => f.approved === 2)
    },

    actions: {
        async loadHolidays() {
            // const authStore = useAuthStore();
            try {
                const data = await axios.get(`http://localhost:8060/api/`);
                this.holidays = data.data;
                this.holidaysLoaded = true;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },

        // async addHoliday (payload) {
        //     axios.post('/api/holiday', payload).then(_ => {
        //         commit('ADD_HOLIDAY', payload)
        //     })
        // }
    }
})