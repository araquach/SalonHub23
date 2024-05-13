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
                freeTimeStore.freeTime = freeTimeStore.freeTime.map(h => h.id === freeTime.id ? approvedFreeTime : h);
                return approvedFreeTime;
            } catch (error) {
                console.error(error);
            }
        }
    }
})