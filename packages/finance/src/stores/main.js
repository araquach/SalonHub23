import { defineStore } from "pinia";
import { format, startOfYear, subYears, endOfMonth, subMonths } from "date-fns";
import axios from "axios";

export const useMainStore = defineStore("mainStore", {
  state: () => {
    const now = new Date();
    const sd = format(startOfYear(subYears(now, 1)), "yyyy-MM-dd");
    const ed = format(endOfMonth(subMonths(now, 1)), "yyyy-MM-dd");

    return {
      salons: [{id: 0, name: "All"}, {id: 1, name: "Jakata"}, {id: 2, name: "PK"}, {id: 3, name: "Base"}],
      salon: {id: 1, name: "Jakata"},
      teamMembers: [],
      teamMember: { id: 7, first_name: "Natalie", last_name: "Sharpe" },
      chartColours: [
        {col: '#800080'}, {col: '#008000'}, {col: '#8A2BE2'}, {col: '#FF8C00'}, {col: '#1E90FF'}, {col:'#40E0D0'}, {col: '#3CB371'}, {col: '#708090'}, {col: '#00008B'}, {col: '#FF4500'}, {col: '#4B0082'}
      ],
      salonColours: {
        'jakata': '#03038f',
        'pk': '#752714',
        'base': '#535d73',
        'all': '#6f38a8',
      },
      startDate: sd,
      endDate: ed
    };
  },

  getters: {
    getSalonToLower: (state) => state.salon.name.toLowerCase(),
    getStartDateFormatted: (state) => format(new Date(state.startDate), 'dd/MM/yyyy'),
    getEndDateFormatted: (state) => format(new Date(state.endDate), 'dd/MM/yyyy'),
    getJakataStylists: (state) => state.teamMembers.filter(s => s.salon.id === 1),
    getPkStylists: (state) => state.teamMembers.filter(s => s.salon.id === 2),
    getBaseStylists: (state) => state.teamMembers.filter(s => s.salon.id === 3),
    getStylistsBySalon: (state) => state.teamMembers.filter(s => s.salon === state.salon.id)
  },

  actions: {
    async loadStylists() {
      try {
        const data = await axios.get(
          "http://localhost:8060/api/team-members"
        );
        this.teamMembers = data.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  }
});