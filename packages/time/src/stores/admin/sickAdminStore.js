import { defineStore } from 'pinia';
import sickAdminService from "../../services/admin/sickAdminService";
import {useSickStore} from "../sickStore";

export const useSickAdminStore = defineStore('sickAdmin', {
    state: () => {
        return {
            sickAdminDash: {},
            sickAdminDashLoading: null,
            sickDays: [],
            sickDaysLoading: null,
            sickDaysPending: [],
            sickDaysPendingLoading: null
        }
    },

    getters: {

    },

    actions: {
        async loadSickAdminDash() {
            this.sickAdminDashLoading = true
            try {
                const response = await sickAdminService.getSickAdminDash()
                this.sickAdminDash = response.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.sickAdminDashLoading = false;
            }
            return { sickAdminDash: this.sickAdminDash, sickAdminDashLoading: this.sickAdminDashLoading }
        },

        async loadSickDaysPending() {
            this.sickDaysPendingLoading = true;
            try {
                const response = await sickAdminService.getSickDaysPending()
                this.sickDaysPending = response.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.sickDaysPendingLoading = false;
            }
            return { sickDaysPending: this.sickDaysPending, sickDaysPendingLoading: this.sickDaysPendingLoading }
        },

        async loadSickDays() {
            this.sickDaysLoading = true;
            try {
                const response = await sickAdminService.getSickDays()
                this.sickDays = response.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.sickDaysLoading = false;
            }
            return { sickDays: this.sickDays, sickDaysLoading: this.sickDaysLoading }
        },

        async deductSickDay(id, sick) {
            try {
                const deductedSickDay = await sickAdminService.deductSickDay(id, sick);
                const sickStore = useSickStore();
                sickStore.sickDays = sickStore.sickDays.map(s => s.id === sick.id ? deductedSickDay : s);
                return deductedSickDay;
            } catch (error) {
                console.error(error);
            }
        }
    }
})