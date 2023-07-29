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
<script setup>
import {computed} from 'vue';
import { Pie } from "vue-chartjs";
import CostsComparisonOverview from "./CostsComparisonOverview.vue"
import { useCostsStore } from "../../../stores/costs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const costsStore = useCostsStore();

const chartData = computed(() => costsStore.getCostsByCatChart);

defineExpose({
  chartData
});
</script>
