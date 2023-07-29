<template>
  <div>
    <div class="buttons">
      <button @click="toggleData" class="button is-small is-warning">Toggle Data</button>
      <button @click="toggleLinear" class="button is-small is-warning">Toggle Linear</button>
    </div>
    <div v-if="takingsStore.takingsByMonthLoaded" class="container">
      <Line :options="chartData.chartOptions" :data="chartData" />
    </div>
  </div>
</template>
<script setup>
import {computed, ref} from 'vue';
import { Line } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js'
import { useTakingsStore } from "../../../stores/takings";

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)

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
  return takingsStore.getTakingsByMonthChart(toggled.value, showLinear.value);
});
</script>