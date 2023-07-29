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
<script setup>
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
import { ref, computed } from 'vue';
import { useCostsStore } from "../../../stores/costs";

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale);

const costsStore = useCostsStore();

const toggled = ref(false);
const showLinear = ref(false);

const toggleData = () => {
  toggled.value = !toggled.value;
};

const toggleLinear = () => {
  showLinear.value = !showLinear.value;
};

const chartData = computed(() => {
  return costsStore.getCostsByMonthChart(toggled.value, showLinear.value);
});
</script>
