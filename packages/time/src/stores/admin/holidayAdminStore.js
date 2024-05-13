import { defineStore } from 'pinia';
import holidayAdminService from "../../services/admin/holidayAdminService";
import {useHolidayStore} from "../holidayStore";

export const useHolidayAdminStore = defineStore('holidayAdmin', {
    state: () => {
        return {

        }
    },

    getters: {

    },

    actions: {
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