import { defineStore } from 'pinia';
import teamService from "main/src/services/teamService";
import {useAuthStore} from "auth/src/stores/authStore";

export const useTeamStore = defineStore('team', {
    state: () => {
        return {
            teamMembers: {},
            teamMembersLoading: null
        }
    },

    getters: {

    },

    actions: {
        async loadTeamMembers() {
            this.teamMembersLoading = true;
            const authStore = useAuthStore();
            const salon = authStore.user.salon;
            try {
                const response = await teamService.getTeamMembers(salon)
                this.teamMembers = response.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.teamMembersLoading = false;
            }
            return { teamMembers: this.teamMembers, teamMembersLoading: this.teamMembersLoading }
        }
    },
    persist: true
})