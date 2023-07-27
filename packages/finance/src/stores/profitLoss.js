import { defineStore } from "pinia";
import { useMainStore } from "../stores/main";
import profitLossService from "../services/profitLossService";

export const useProfitLossStore = defineStore("profitLossStore", {
  state: () => {
    return {
      costsAndTakings: {},
      costsAndTakingsLoaded: false
    };
  },
  getters: {
    getCostsAndTakingsTable: (state) => {
      const result = [];
      const data = state.costsAndTakings

      for (let i = 0; i < data.costs.length; i++) {
        const cost = data.costs[i];
        const takings = data.takings.find(taking => taking.month === cost.month);

        result.push({
          month: cost.month,
          cost_total: cost.total,
          takings_total: takings.total,
          profit_loss: takings.total - cost.total
        });
      }
      return result;
    },

    getCostsAndTakingsChart: (state) => (showLinear) => {
      let salonDataSets = [];

      let dataSet = [
        {
          label: "Takings",
          data: state.costsAndTakings.takings.map(row => row.total),
          backgroundColor: "#008000FF",
          borderColor: "#008000FF"
        },
        {
          label: "Costs",
          data: state.costsAndTakings.costs.map(row => row.total),
          backgroundColor: "#800000",
          borderColor: "#800000"
        },
        {
          label: "Takings Linear",
          data: state.costsAndTakings.takings.map(row => row.linear_total),
          backgroundColor: "#181212",
          borderColor: "#008000FF",
          borderDash: [5],
          pointRadius: 1,
        },
        {
          label: "Costs Linear",
          data: state.costsAndTakings.costs.map(row => row.linear_total),
          backgroundColor: "#181212",
          borderColor: "#800000",
          borderDash: [5],
          pointRadius: 1,
        }
      ];

      if (showLinear) {
        salonDataSets = dataSet
      } else {
        salonDataSets = dataSet.slice(0, 2)
      }

      return {
        labels: state.costsAndTakings.costs.map(row => row.month),
        datasets: salonDataSets,
        startDate: "",
        endDate: "",
        chartOptions: {
          responsive: true
        }
      }
    }
  },

  actions: {
    async loadCostsAndTakingsByDateRange() {
      const mainStore = useMainStore();
      const sd = mainStore.startDate
      const ed = mainStore.endDate
      try {
        const data = await profitLossService.getCostsAndTakingsByDateRange(sd, ed)
        this.costsAndTakings = data.data;
        this.costsAndTakingsLoaded = true
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  }
});