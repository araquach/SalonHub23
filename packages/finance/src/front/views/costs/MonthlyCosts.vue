<template>
  <div class="section has-background-white">
    <div>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title is-4 has-text-dark">Monthly Costs</h1>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <button @click="toggleView" class="button is-small">Change View</button>
          </div>
        </div>
      </div>
      <DatePickerComponent @date-change="handleDateChange" />
    </div>
    <div class="transition-container">
      <transition name="fade" mode="out-in">
        <component :is="toggledView ? MonthlyCostsChart : MonthlyCostsTable"></component>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MonthlyCostsChart from "../../components/costs/MonthlyCostsChart.vue";
import MonthlyCostsTable from "../../components/costs/MonthlyCostsTable.vue";
import DatePickerComponent from "../../components/DatePickerComponent.vue";
import { useCostsStore } from "../../../stores/costs";

const costsStore = useCostsStore();
costsStore.loadCostsMonthByMonth();

const toggledView = ref(true);

const toggleView = () => {
  toggledView.value = !toggledView.value;
};

const handleDateChange = () => {
  costsStore.loadCostsMonthByMonth();
};
</script>
