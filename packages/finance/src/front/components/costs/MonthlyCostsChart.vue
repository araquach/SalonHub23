<template>
  <div>
    <br>
    <div class="buttons">
      <button @click="toggleData" class="button is-small is-warning">Toggle Data</button>
      <button @click="toggleLinear" class="button is-small is-warning">Toggle Linear</button>
    </div>
    <div v-if="costsStore.costsByMonthLoaded" class="container">
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
import { useMainStore } from "../../../stores/main";
import { useCostsStore } from "../../../stores/costs";

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale);

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Line },

  setup() {
    const mainStore = useMainStore();
    const costsStore = useCostsStore();
    return {
      mainStore: mainStore,
      costsStore: costsStore
    };
  },

  data() {
    return {
      toggled: false,
      showLinear: false
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
      return this.costsStore.getCostsByMonthChart(this.toggled, this.showLinear)
    }
  }
};
</script>