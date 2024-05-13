import { defineStore } from 'pinia';
import {useLieuStore} from "../LieuStore";
import lieuAdminService from "../../services/admin/lieuAdminService";

export const useLieuAdminStore = defineStore('LieuAdmin', {
    state: () => {
        return {

        }
    },

    getters: {

    },

    actions: {
        async approveLieu(id, lieu) {
            try {
                const approvedLieu = await lieuAdminService.approveLieu(id, lieu);
                const lieuStore = useLieuStore();
                lieuStore.lieu = lieuStore.lieuHours.map(h => h.id === lieu.id ? approvedLieu : h);
                return approvedLieu;
            } catch (error) {
                console.error(error);
            }
        }
    }
})