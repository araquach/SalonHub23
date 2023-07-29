<template>
  <div class="section has-background-white">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h1 class="title is-4 has-text-dark">Yearly Costs - All Time</h1>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button @click="toggleView" class="button is-small">Change View</button>
        </div>
      </div>
    </div>
    <div class="transition-container">
      <transition name="fade" mode="out-in">
        <component :is="toggledView ? YearlyCostsChart : YearlyCostsTable"></component>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import YearlyCostsChart from "../../components/costs/YearlyCostsChart.vue";
import YearlyCostsTable from "../../components/costs/YearlyCostsTable.vue";
import { useCostsStore } from "../../../stores/costs";

const costsStore = useCostsStore();
costsStore.loadCostsYearByYear();

const toggledView = ref(true);

const toggleView = () => {
  toggledView.value = !toggledView.value;
};
</script>
