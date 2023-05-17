<template>
  <div v-if="costsStore.costsByCatLoaded">
    <div class="columns">
      <div class="column is-7">
        <Pie :options="chartData.chartOptions" :data="chartData" />
      </div>
      <div class="column">
        <CostsComparisonOverview/>
      </div>
    </div>
  </div>
</template>
<script>
import { Pie } from "vue-chartjs";
import CostsComparisonOverview from "./CostsComparisonOverview.vue"
import { useCostsStore } from "../../../stores/costs";
import { useMainStore } from "../../../stores/main";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  components: { Pie, CostsComparisonOverview },

  setup() {
    const mainStore = useMainStore();
    const costsStore = useCostsStore();
    return {
      mainStore,
      costsStore
    };
  },

  data() {
    return {};
  },

  computed: {
    chartData() {
      return this.costsStore.getCostsByCatChart
    }
  }
};
</script>