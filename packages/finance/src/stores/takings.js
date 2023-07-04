import { defineStore } from "pinia";
import { useMainStore } from "../stores/main";
import { useIncomeStore } from "../stores/income";
import axios from "axios";

export const useTakingsStore = defineStore("takingsStore", {
  state: () => {
    return {
      stylistFiltered: false,
      takingsYearByYear: { jakata: [], pk: [], base: [], total: [] },
      takingsYearByYearLoaded: false,
      takingsByMonth: {},
      takingsByMonthLoaded: false,
      stylistTakingsByMonth: [],
      stylistTakingsByMonthLoaded: false,
      takingsByStylistComparison: [],
      takingsByStylistComparisonLoaded: false,
      incomeByMonth: [],
      incomeByMonthLoaded: false
    };
  },

  getters: {
    getTakingsByYearTable: (state) => {
      const mainStore = useMainStore();
      switch (mainStore.salon.id) {
        case 0:
          return state.takingsYearByYear.total;
          // eslint-disable-next-line no-unreachable
          break;
        case 1:
          return state.takingsYearByYear.jakata;
          // eslint-disable-next-line no-unreachable
          break;
        case 2:
          return state.takingsYearByYear.pk;
          // eslint-disable-next-line no-unreachable
          break;
        case 3:
          return state.takingsYearByYear.base;
          // eslint-disable-next-line no-unreachable
          break;
      }
    },

    getTakingsByYearChart: (state) => (toggled) => {
      let salonDataSets = [];

      if (toggled) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        salonDataSets.push({
          label: "Jakata", data: state.takingsYearByYear.jakata.map(row => row.total), backgroundColor: "#191970"
        }, {
          label: "PK", data: state.takingsYearByYear.pk.map(row => row.total), backgroundColor: "#8B4513"
        }, {
          label: "Base", data: state.takingsYearByYear.base.map(row => row.total), backgroundColor: "#778899"
        });
      } else {
        salonDataSets.push({
          label: "Total", data: state.takingsYearByYear.total.map(row => row.total), backgroundColor: "#008000FF"
        });
      }
      return {
        labels: state.takingsYearByYear.total.map(row => row.year), datasets: salonDataSets, chartOptions: {
          responsive: true, scales: {
            x: {
              stacked: true
            }, y: {
              stacked: true
            }
          }
        }
      };
    },

    getTakingsByMonthTable: (state) => {
      const mainStore = useMainStore();
      switch (mainStore.salon.id) {
        case 0:
          return state.takingsByMonth.total;
          // eslint-disable-next-line no-unreachable
          break;
        case 1:
          return state.takingsByMonth.jakata;
          // eslint-disable-next-line no-unreachable
          break;
        case 2:
          return state.takingsByMonth.pk;
          // eslint-disable-next-line no-unreachable
          break;
        case 3:
          return state.takingsByMonth.base;
          // eslint-disable-next-line no-unreachable
          break;
      }
    },

    getTakingsByMonthChart: (state) => (toggled, showLinear, showBank) => {
      const incomeStore = useIncomeStore()
      let salonDataSets = [];

      let indDataSets = [{
        label: "Jakata",
        data: state.takingsByMonth.jakata.figures.map(row => row.total),
        borderColor: "#191970",
        backgroundColor: "#191970"
      }, {
        label: "PK",
        data: state.takingsByMonth.pk.figures.map(row => row.total),
        borderColor: "#8B4513",
        backgroundColor: "#8B4513"
      }, {
        label: "Base",
        data: state.takingsByMonth.base.figures.map(row => row.total),
        borderColor: "#778899",
        backgroundColor: "#778899"
      }, {
        label: "Jakata Linear",
        data: state.takingsByMonth.jakata.figures.map(row => row.linear_total),
        backgroundColor: "#181212",
        borderColor: "#999",
        borderDash: [5],
        pointRadius: 0
      }, {
        label: "PK Linear",
        data: state.takingsByMonth.pk.figures.map(row => row.linear_total),
        backgroundColor: "#181212",
        borderColor: "#999",
        borderDash: [5],
        pointRadius: 0
      }, {
        label: "Base Linear",
        data: state.takingsByMonth.base.figures.map(row => row.linear_total),
        backgroundColor: "#181212",
        borderColor: "#999",
        borderDash: [5],
        pointRadius: 0
      }];
      let totalDataSets = [{
        label: "Total",
        data: state.takingsByMonth.total.figures.map(row => row.total),
        borderColor: "#24262d",
        backgroundColor: "#181212"
      },
        {
          label: "Total Linear",
          data: state.takingsByMonth.total.figures.map(row => row.linear_total),
          backgroundColor: "#181212",
          borderColor: "#999",
          borderDash: [5],
          pointRadius: 0
        },
        {
          label: "Bank Data",
          data: incomeStore.incomeByMonth.figures.map(row => row.total),
          backgroundColor: "#181212",
          borderColor: "#8d5151",
          pointRadius: 0
        }
      ];

      if (toggled && showLinear) {
        salonDataSets = indDataSets;
      } else if (toggled && !showLinear) {
        salonDataSets = indDataSets.slice(0, 3);
      } else if (!toggled && showLinear) {
        salonDataSets = totalDataSets;
      } else if (!toggled && !showLinear) {
        salonDataSets = totalDataSets.slice(0, 1);
      }

      return {
        labels: state.takingsByMonth.total.figures.map(row => row.month), // eslint-disable-next-line no-undef
        datasets: salonDataSets, chartOptions: {
          responsive: true
        }
      };
    },

    getStylistTakingsByMonthTable: (state) => {
      return state.stylistTakingsByMonth;
    },

    getStylistTakingsByMonthChart: (state) => (toggled, showLinear) => {
      let salonDataSets = [];
      let splitDataSet = [{
        label: "Services",
        data: state.stylistTakingsByMonth.map(row => row.services),
        backgroundColor: "#001580",
        borderColor: "#001580"
      }, {
        label: "Products",
        data: state.stylistTakingsByMonth.map(row => row.products),
        backgroundColor: "#800049",
        borderColor: "#800049"
      }, {
        label: "Products Linear",
        data: state.stylistTakingsByMonth.map(row => row.linear_products),
        backgroundColor: "#181212",
        borderColor: "#999",
        borderDash: [5],
        pointRadius: 0
      }, {
        label: "Services Linear",
        data: state.stylistTakingsByMonth.map(row => row.linear_services),
        backgroundColor: "#181212",
        borderColor: "#999",
        borderDash: [5],
        pointRadius: 0
      }];
      let totalDataSet = [{
        label: "Total",
        data: state.stylistTakingsByMonth.map(row => row.total),
        backgroundColor: "#181212",
        borderColor: "#181212"
      }, {
        label: "Total Linear",
        data: state.stylistTakingsByMonth.map(row => row.linear_total),
        backgroundColor: "#181212",
        borderColor: "#999",
        borderDash: [5],
        pointRadius: 0
      }];
      if (toggled && showLinear) {
        salonDataSets = splitDataSet;
      } else if (toggled && !showLinear) {
        salonDataSets = splitDataSet.slice(0, 2);
      } else if (!toggled && showLinear) {
        salonDataSets = totalDataSet;
      } else if (!toggled && !showLinear) {
        salonDataSets = totalDataSet.slice(0, 1);
      }

      return salonDataSets;
    },

    getStylistComparisonTable: (state) => {
      const mainStore = useMainStore();
      const salonIndexToColour = {
        1: mainStore.salonColours.jakata,
        2: mainStore.salonColours.pk,
        0: mainStore.salonColours.base,
        3: mainStore.salonColours.all
      };

      const teamMemberNames = mainStore.teamMembers.map(member => (member.first_name + " " + member.last_name).toLowerCase());
      let data = state.takingsByStylistComparison.filter(item => item.stylist !== "");

      const teamMemberDetails = mainStore.teamMembers.reduce((acc, member) => {
        acc[(member.first_name + " " + member.last_name).toLowerCase()] = {
          salon: member.salon
        };
        return acc;
      }, {});

      const filteredArrayWithColour = data.map(item => {
        const stylistName = item.stylist.toLowerCase();
        const salon = teamMemberDetails[stylistName]?.salon;
        const salonColour = salon !== undefined ? salonIndexToColour[salon] : undefined;
        return {
          ...item, color: salonColour
        };
      });

      if (!state.stylistFiltered) {
        let filtered = filteredArrayWithColour.filter(item => teamMemberNames.includes(item.stylist.toLowerCase()));
        return filtered.sort((a, b) => b.total - a.total);
      } else {
        return filteredArrayWithColour.sort((a, b) => b.total - a.total);
      }
    },

    getStylistComparisonChart: (state) => (toggled) => {
      //const mainStore = useMainStore();
      let salonDataSets = [];
      let data = state.takingsByStylistComparison;

      let totalDataSet = [{
        label: "Total", data: data.map(row => row.total), backgroundColor: "#008000FF"
      }];
      let splitDataSet = [{
        label: "Services", data: data.map(row => row.services), backgroundColor: "#800000"
      }, {
        label: "Products", data: data.map(row => row.products), backgroundColor: "#191970"
      }];

      if (toggled) {
        salonDataSets = splitDataSet;
      } else {
        salonDataSets = totalDataSet;
      }

      return {
        labels: data.map(row => row.stylist), datasets: salonDataSets, chartOptions: {
          responsive: true, scales: {
            x: {
              stacked: true
            }, y: {
              stacked: true
            }
          }
        }
      };
    }
  },

  actions: {
    async loadTakingsYearByYear() {
      try {
        const data = await axios.get("http://localhost:8060/api/finance/takings-by-year");
        this.takingsYearByYearLoaded = true;
        this.takingsYearByYear.jakata = data.data.jakata;
        this.takingsYearByYear.pk = data.data.pk;
        this.takingsYearByYear.base = data.data.base;
        this.takingsYearByYear.total = data.data.all;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },

    async loadTakingsMonthByMonth() {
      const mainStore = useMainStore();
      try {
        const data = await axios.get(`http://localhost:8060/api/finance/monthly-takings-by-date-range/${mainStore.startDate}/${mainStore.endDate}`);
        this.takingsByMonth = data.data;
        this.takingsByMonthLoaded = true;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },

    async loadStylistTakingsMonthByMonth() {
      const mainStore = useMainStore();
      try {
        const data = await axios.get(`http://localhost:8060/api/finance/stylist-takings-month-by-month/${mainStore.teamMember.first_name}/${mainStore.teamMember.last_name}/${mainStore.startDate}/${mainStore.endDate}`);
        this.stylistTakingsByMonth = data.data;
        this.stylistTakingsByMonthLoaded = true;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },

    async loadTakingsByStylistComparison() {
      const mainStore = useMainStore();
      try {
        const data = await axios.get(`http://localhost:8060/api/finance/takings-by-stylist-comparison/${mainStore.getSalonToLower}/${mainStore.startDate}/${mainStore.endDate}`);
        this.takingsByStylistComparison = data.data;
        this.takingsByStylistComparisonLoaded = true;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  }
});