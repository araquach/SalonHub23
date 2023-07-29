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
<script setup>
import {computed, ref} from 'vue';
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
import { useTakingsStore } from "../../../stores/takings";

const takingsStore = useTakingsStore();

let toggled = ref(false);
let showLinear = ref(false);

const toggleData = () => {
  toggled.value = !toggled.value;
};

const toggleLinear = () => {
  showLinear.value = !showLinear.value;
};

const chartData = computed(() => {
  return {
    labels: takingsStore.stylistTakingsByMonth.map(row => row.month),
    datasets: takingsStore.getStylistTakingsByMonthChart(toggled.value, showLinear.value),
    chartOptions: {
      responsive: true
    }
  };
});
</script>