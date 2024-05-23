import { defineStore } from 'pinia';
import teamService from "main/src/services/teamService";

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
        async loadTeamMembers(salon_id) {
            this.teamMembersLoading = true;
            try {
                const response = await teamService.getTeamMembers(salon_id)
                this.teamMembers = response.data;
            } catch (error) {
                console.log(error);
                throw error
            } finally {
                this.teamMembersLoading = false;
            }
            return { teamMembers: this.teamMembers, teamMembersLoading: this.teamMembersLoading }
        }
    }
})