import { defineStore } from 'pinia'
import axios from "axios";

export const useMainStore = defineStore('main', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            teamMembers: []
        }
    },

    getters: {
        getJakataStylists: (state) => state.teamMembers.filter(s => s.salon.id === 1),
        getPkStylists: (state) => state.teamMembers.filter(s => s.salon.id === 2),
        getBaseStylists: (state) => state.teamMembers.filter(s => s.salon.id === 3),
        getStylistsBySalon: (state) => state.teamMembers.filter(s => s.salon === state.salon.id)
    },

    actions: {
        async loadStylists() {
            try {
                const data = await axios.get(
                    "http://localhost:8060/api/team/team-members"
                );
                this.teamMembers = data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
})