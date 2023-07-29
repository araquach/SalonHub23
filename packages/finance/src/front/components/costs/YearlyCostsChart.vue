<template>
  <div>
    <br>
    <div>
      <button @click="toggleData" class="button is-small is-warning">Toggle Data</button>
    </div>
    <div v-if="costsStore.costsByYearLoaded" class="container">
      <Bar :options="chartData.chartOptions" :data="chartData" />
    </div>
  </div>
</template>
<script setup>
import { Bar } from "vue-chartjs";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { ref, computed } from 'vue';
import { useCostsStore } from "../../../stores/costs";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const costsStore = useCostsStore();

const toggled = ref(false);

const toggleData = () => {
  toggled.value = !toggled.value;
};

const chartData = computed(() => costsStore.getCostsByYearChart(toggled.value));
</script>