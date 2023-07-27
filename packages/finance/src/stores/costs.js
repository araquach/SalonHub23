import { defineStore } from "pinia";
import { useMainStore } from "../stores/main";
import costsService from "../services/costsService";

export const useCostsStore = defineStore("costsStore", {
  state: () => {
    return {
      categories: ["wages", "stock", "taxes", "drawings", "building", "marketing", "utilities", "loans", "costs", "staff", "equipment", "sundries", "other", "insurance", "accountant"],
      category: "wages",
      costsByCat: [],
      costsByCatLoaded: false,
      indCostsByMonth: [],
      indCostsByMonthLoaded: false,
      costsByMonth: {},
      costsByMonthLoaded: false,
      costsByYear: {},
      costsByYearLoaded: false,
    };
  },
  getters: {
    getCostsByYearTable: (state) => {
      const data = state.costsByYear
      const yearlyData = {};

      for (const location in data) {
        for (const item of data[location]) {
          const year = item.year;
          const total = item.total;
          if (!yearlyData[year]) {
            yearlyData[year] = {};
            yearlyData[year].year = year; // Add the year to the object
          }
          yearlyData[year][location] = total;
        }
      }
      return yearlyData
    },

    getCostsByYearChart: (state) => (toggled) => {
      let salonDataSets = [];

      if (toggled) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        salonDataSets.push(
          {
            label: "Jakata",
            data: state.costsByYear.jakata.map(row => row.total),
            backgroundColor: "#191970"
          },
          {
            label: "PK",
            data: state.costsByYear.pk.map(row => row.total),
            backgroundColor: "#8B4513"
          },
          {
            label: "Base",
            data: state.costsByYear.base.map(row => row.total),
            backgroundColor: "#778899"
          }
        );
      } else {
        salonDataSets.push(
          {
            label: "Total",
            data: state.costsByYear.all.map(row => row.total),
            backgroundColor: "#800000"
          }
        );
      }
      return {
        labels: state.costsByYear.all.map(row => row.year),
        datasets: salonDataSets,
        chartOptions: {
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true
            }
          }
        }
      }
    },

    getCostsByMonthTable: (state) => {
      const inputData = state.costsByMonth
      const outputData = {};

      inputData.all.forEach(entry => {
        const month = entry.month;
        outputData[month] = {
          month: month,
          jakata: inputData.jakata.find(e => e.month === month).total,
          pk: inputData.pk.find(e => e.month === month).total,
          base: inputData.base.find(e => e.month === month).total,
          all: entry.total
        };
      });
      return outputData;
    },

    getCostsByMonthChart: (state) => (toggled, showLinear) => {
      let salonDataSets = [];

      let splitDataSet = [
        {
          label: "Jakata",
          data: state.costsByMonth.jakata.map(row => row.total),
          backgroundColor: "#191970"
        },
        {
          label: "PK",
          data: state.costsByMonth.pk.map(row => row.total),
          backgroundColor: "#8B4513"
        },
        {
          label: "Base",
          data: state.costsByMonth.base.map(row => row.total),
          backgroundColor: "#778899"
        },
        {
          label: "Jakata Linear",
          data: state.costsByMonth.jakata.map(row => row.linear_total),
          backgroundColor: "#181212",
          borderColor: "#999",
          borderDash: [5],
          pointRadius: 0,
        },
        {
          label: "PK Linear",
          data: state.costsByMonth.pk.map(row => row.linear_total),
          backgroundColor: "#181212",
          borderColor: "#999",
          borderDash: [5],
          pointRadius: 0,
        },
        {
          label: "Base Linear",
          data: state.costsByMonth.base.map(row => row.linear_total),
          backgroundColor: "#181212",
          borderColor: "#999",
          borderDash: [5],
          pointRadius: 0,
        },
      ];
      let totalDataSet = [
        {
          label: "Total",
          data: state.costsByMonth.all.map(row => row.total),
          backgroundColor: "#800000",
          borderColor: "#800000",
        },
        {
          label: "Total Linear",
          data: state.costsByMonth.all.map(row => row.linear_total),
          backgroundColor: "#181212",
          borderColor: "#999",
          borderDash: [5],
          pointRadius: 0,
        },
      ];

      if (toggled && showLinear) {
        salonDataSets = splitDataSet
      } else if (toggled && !showLinear){
        salonDataSets = splitDataSet.slice(0, 3)
      } else if (!toggled && showLinear) {
        salonDataSets = totalDataSet
      } else if (!toggled && !showLinear){
        salonDataSets = totalDataSet.slice(0,1)
      }

      return {
        labels: state.costsByMonth.all.map(row => row.month),
        datasets: salonDataSets,
        startDate: "",
        endDate: "",
        chartOptions: {
          responsive: true
        }
      }
    },

    getIndCostsByMonthTable: (state) => {
      return state.indCostsByMonth
    },

    getIndCostsByMonthChart: (state) => (showLinear) => {
      let salonDataSets;

      let splitDataSet = [
        {
          label: "Total",
          data: state.indCostsByMonth.figures.map(row => row.total),
          backgroundColor: "#181212",
          borderColor: "#7a6e6e"
        },
        {
          label: "Linear Total",
          data: state.indCostsByMonth.figures.map(row => row.linear_total),
          backgroundColor: "#181212",
          borderColor: "#999",
          borderDash: [5],
          pointRadius: 0
        }
      ];

      if (showLinear) {
        salonDataSets = splitDataSet
      } else {
        salonDataSets = splitDataSet.slice(0, 1)
      }
      return {
        labels: state.indCostsByMonth.figures.map(row => row.month),
        datasets: salonDataSets,
        chartOptions: {
          responsive: true
        }
      }
    },

    getCostsByCatTable: (state) => {
      return state.costsByCat.figures.sort((a, b) => b.total - a.total);
    },

    getCostsByCatChart: (state) => {
      const mainStore = useMainStore();
      const data = state.costsByCat.figures
      data.sort((a, b) => b.total - a.total);
      let colours = mainStore.chartColours;

      return {
        labels: data.map(row => row.category.charAt(0).toUpperCase() + row.category.slice(1)),
        datasets: [
          {
            data: data.map(row => row.total),
            backgroundColor: colours.map(row => row.col)
          }
        ],
        chartOptions: {
          responsive: true
        }
      };
    },
  },

  actions: {
    async loadCostsYearByYear() {
      try {
        const data = await costsService.getCostsYearByYear()
        this.costsByYear = data.data;
        this.costsByYearLoaded = true
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },

    async loadCostsMonthByMonth() {
      const mainStore = useMainStore();
      const sd = mainStore.startDate
      const ed = mainStore.endDate
      try {
        const data = await costsService.getCostsMonthByMonth(sd, ed)
        this.costsByMonth = data.data;
        this.costsByMonthLoaded = true
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },

    async loadCostsByCat() {
      const mainStore = useMainStore();
      const s = mainStore.salon.name.toLowerCase()
      const sd = mainStore.startDate
      const ed = mainStore.endDate
      try {
        const data = await costsService.getCostsByCat(s, sd, ed)
        this.costsByCat = data.data;
        this.costsByCatLoaded = true
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },

    async loadIndCostsByMonth() {
      const mainStore = useMainStore();
      const c = this.category
      const sd = mainStore.startDate
      const ed = mainStore.endDate
      try {
        const data = await costsService.getIndCostsByMonth(c, sd, ed)
        this.indCostsByMonth = data.data;
        this.indCostsByMonthLoaded = true
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  }
});