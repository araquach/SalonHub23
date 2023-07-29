<template>
  <div>
    <br>
    <div class="buttons">
      <button @click="toggleData" class="button is-warning is-small">Toggle Data</button>
    </div>
    <div v-if="takingsStore.takingsByStylistComparisonLoaded" class="container">
      <Bar :options="chartData.chartOptions" :data="chartData" />
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { useTakingsStore } from "../../../stores/takings";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


const takingsStore = useTakingsStore();

takingsStore.loadTakingsByStylistComparison();

let toggled = ref(false);

const toggleData = () => {
  toggled.value = !toggled.value;
};

const chartData = computed(() => takingsStore.getStylistComparisonChart(toggled.value));
</script>