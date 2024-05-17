import { defineStore } from 'pinia';
import {useLieuStore} from "../LieuStore";
import lieuAdminService from "../../services/admin/lieuAdminService";
import holidayAdminService from "../../services/admin/holidayAdminService";

export const useLieuAdminStore = defineStore('LieuAdmin', {
    state: () => {
        return {
            lieuAdminDash: {},
            lieuAdminDashLoading: {},
            lieuHours: [],
            lieuHoursPending: [],
            lieuHoursPendingLoading: null,
        }
    },

    getters: {

    },

    actions: {
        async loadLieuAdminDash() {
            this.lieuAdminDashLoading === true
            try {
                const response = await lieuAdminService.getLieuAdminDash()
                this.lieuAdminDash = response.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.lieuAdminDashLoading = false;
            }
            return { lieuAdminDash: this.lieuAdminDash, lieuAdminDashLoading: this.lieuAdminDashLoading }
        },

        async loadLieuHoursPending() {
            this.lieuHoursPendingLoading = true;
            try {
                const response = await lieuAdminService.getLieuHoursPending()
                this.lieuHoursPending = response.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.lieuHoursPendingLoading = false;
            }
            return { lieuHoursPending: this.lieuHoursPending, lieuHoursPendingLoading: this.lieuHoursPendingLoading }
        },

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