import { defineStore } from 'pinia';
import {useFreeTimeStore} from "../freeTimeStore";
import freeTimeAdminService from "../../services/admin/freeTimeAdminService"

export const useFreeTimeAdminStore = defineStore('FreeTimeAdmin', {
    state: () => {
        return {

        }
    },

    getters: {

    },

    actions: {
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