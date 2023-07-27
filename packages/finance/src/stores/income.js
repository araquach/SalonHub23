import { defineStore } from "pinia";
import { useMainStore } from "../stores/main";
import incomeService from "../services/incomeService";

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
      const sd = mainStore.startDate
      const ed = mainStore.endDate
      try {
        const data = await incomeService.getIncomeByMonth(sd, ed)
        this.incomeByMonth = data.data;
        this.incomeByMonthLoaded = true;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  }
});