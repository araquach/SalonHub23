<template>
  <div>
    <br>
    <div class="buttons">
      <div class="buttons">
        <button @click="toggleLinear" class="button is-warning is-small">Toggle Linear</button>
      </div>
    </div>
    <div v-if="costsStore.indCostsByMonthLoaded" class="container">
      <Line :options="chartData.chartOptions" :data="chartData" />
    </div>
  </div>
</template>
<script setup>
import { Line } from "vue-chartjs";
import { useCostsStore } from "../../../stores/costs";
import { ref, computed } from "vue";

const costsStore = useCostsStore();

let showLinear = ref(false);

const toggleLinear = () => {
  showLinear.value = !showLinear.value;
}

const chartData = computed(() => costsStore.getIndCostsByMonthChart(showLinear.value));
</script>
