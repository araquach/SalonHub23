import { defineStore } from "pinia";
import { useMainStore } from "../stores/main";
import axios from "axios";

export const useIncomeStore = defineStore("incomeStore", {
  state: () => {
    return {
      incomeByMonth: [],
      incomeByMonthLoaded: false
    };
  },

  getters: {},

  actions: {
    async loadIncomeByMonth() {
      const mainStore = useMainStore();
      try {
        const data = await axios.get(`http://localhost:8060/api/finance/income-by-month/${mainStore.startDate}/${mainStore.endDate}`);
        this.incomeByMonth = data.data;
        this.incomeByMonthLoaded = true;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  }
});