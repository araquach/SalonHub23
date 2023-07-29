<template>
  <div class="section has-background-white">
    <div>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title is-4 has-text-dark">Monthly Takings</h1>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <button @click="toggleView" class="button is-small">Change View</button>
          </div>
        </div>
      </div>
      <DatePickerComponent @date-change="handleDateChange"/>
    </div>
    <br>
    <div class="transition-container">
      <transition name="fade" mode="out-in">
        <component :is="toggledView ? MonthlyTakingsChart : MonthlyTakingsTable"></component>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MonthlyTakingsChart from "../../components/takings/MonthlyTakingsChart.vue";
import MonthlyTakingsTable from "../../components/takings/MonthlyTakingsTable.vue";
import DatePickerComponent from "../../components/DatePickerComponent.vue";
import { useTakingsStore } from "../../../stores/takings";
import { useIncomeStore } from "../../../stores/income";

const takingsStore = useTakingsStore();
const incomeStore = useIncomeStore();
takingsStore.loadTakingsMonthByMonth();
incomeStore.loadIncomeByMonth();

let toggledView = ref(true);

const toggleView = () => {
  toggledView.value = !toggledView.value;
};

const handleDateChange = () => {
  takingsStore.loadTakingsMonthByMonth();
  incomeStore.loadIncomeByMonth();
};
</script>