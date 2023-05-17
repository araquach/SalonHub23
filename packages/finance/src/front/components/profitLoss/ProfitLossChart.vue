<template>
  <div>
    <br>
    <div class="buttons">
      <button @click="toggleLinear" class="button is-small is-warning">Toggle Linear</button>
    </div>
    <div v-if="profitLossStore.costsAndTakingsLoaded" class="container">
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
import { useProfitLossStore } from "../../../stores/profitLoss";

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale);

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Line },

  setup() {
    const mainStore = useMainStore();
    const profitLossStore = useProfitLossStore();
    return {
      mainStore: mainStore,
      profitLossStore: profitLossStore
    };
  },

  data() {
    return {
      toggled: false,
      showLinear: false
    };
  },

  methods: {
    toggleLinear() {
      this.showLinear = !this.showLinear;
    }
  },

  computed: {
    chartData() {
      return this.profitLossStore.getCostsAndTakingsChart(this.showLinear)
    }
  }
};
</script>