<template>
  <div>
    <div class="buttons">
      <button @click="toggleData" class="button is-small is-warning">Toggle Data</button>
    </div>
    <div v-if="takingsStore.takingsYearByYearLoaded" class="container">
      <Bar :options="chartData.chartOptions" :data="chartData" />
    </div>
  </div>
</template>
<script setup>
import {computed, ref} from 'vue';
import { Bar } from "vue-chartjs";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useTakingsStore } from "../../../stores/takings";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const takingsStore = useTakingsStore();

let toggled = ref(false);

const toggleData = () => {
  toggled.value = !toggled.value;
};

const chartData = computed(() => {
  return takingsStore.getTakingsByYearChart(toggled.value);
});
</script>

