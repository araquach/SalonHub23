<template>
  <div>
    <br>
    <div class="buttons">
      <button @click="toggleData" class="button is-small is-warning">Toggle Data</button>
      <button @click="toggleLinear" class="button is-small is-warning">Toggle Linear</button>
    </div>
    <div v-if="takingsStore.stylistTakingsByMonthLoaded" class="container">
      <Line :options="chartData.chartOptions" :data="chartData" />
    </div>
  </div>
</template>
<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale);
import { useMainStore } from "@/stores/main";
import { useTakingsStore } from "@/stores/takings";

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Line },

  setup() {
    const mainStore = useMainStore();
    const takingsStore = useTakingsStore();
    return {
      mainStore,
      takingsStore
    };
  },

  data() {
    return {
      toggled: false,
      showLinear: false,
      startDate: this.mainStore.startDate,
      endDate: this.mainStore.endDate
    };
  },

  methods: {
    toggleData() {
      this.toggled = !this.toggled;
    },

    toggleLinear() {
      this.showLinear = !this.showLinear;
    }
  },

  computed: {
    chartData() {
      return {
        labels: this.takingsStore.stylistTakingsByMonth.map(row => row.month),
        datasets: this.takingsStore.getStylistTakingsByMonthChart(this.toggled, this.showLinear),
        chartOptions: {
          responsive: true
        }
      };
    }
  }
};
</script>