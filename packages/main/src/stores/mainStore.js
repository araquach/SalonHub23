import { defineStore } from 'pinia'
import teamService from "../services/teamService";

export const useMainStore = defineStore('main', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            adminView: false,
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
        }),
        adminButtonConfig(state) {
            const isAdmin = state.loggedIn && state.user.admin_level === 3;
            const buttonText = isAdmin && state.adminView ? 'Admin' : 'Standard';

            const getRoute = () => {
                if (state.adminView) {
                    return { name: 'main-admin-dashboard' };
                } else {
                    return { name: 'main-dashboard', params: { filter: 'all' } };
                }
            }

            return { buttonText, getRoute };
        },
    },

    actions: {
        changeView() {
            this.adminView = !this.adminView;
            localStorage.setItem('adminView', JSON.stringify(this.adminView));
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
    }
})