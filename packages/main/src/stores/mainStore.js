import { defineStore } from 'pinia'
import teamService from "../services/teamService";

export const useMainStore = defineStore('main', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            salon: 1,
            selectedView: 'personal',
            teamMembers: []
        }
    },

    getters: {
        getJakataStylists: (state) => state.teamMembers.filter(s => s.salon.id === 1),
        getPkStylists: (state) => state.teamMembers.filter(s => s.salon.id === 2),
        getBaseStylists: (state) => state.teamMembers.filter(s => s.salon.id === 3),
        getStylistsBySalon: (state) => state.teamMembers.filter(s => s.salon === state.salon.id),
        getFullNamesAndId: (state) => state.teamMembers.map(member => {
            return {
                value: member.staff_id,
                key: `${member.first_name} ${member.last_name}`
            }
        })
    },

    actions: {
        changeView(view) {
            this.selectedView = view;
            localStorage.setItem('selectedView', JSON.stringify(this.selectedView));
        },

        async loadTeamMembers() {
            try {
                const data = await teamService.getTeamMembers()
                this.teamMembers = data.data;
                return this.teamMembers
            } catch (error) {
                console.log(error);
                throw error
            }
        }
    },
    persist: true
})