<template>
  <div class="section has-background-white">
    <div>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title is-4 has-text-dark">Yearly Takings - All time</h1>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <button @click="toggleView" class="button is-small">Change View</button>
          </div>
        </div>
      </div>
    </div>
    <br>
    <div class="transition-container">
      <transition name="fade" mode="out-in">
        <component :is="toggledView ? YearlyTakingsChart : YearlyTakingsTable"></component>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import YearlyTakingsChart from "../../components/takings/YearlyTakingsChart.vue";
import YearlyTakingsTable from "../../components/takings/YearlyTakingsTable.vue";
import { useTakingsStore } from "../../../stores/takings";

const takingsStore = useTakingsStore();
takingsStore.loadTakingsYearByYear();

let toggledView = ref(true);

const toggleView = () => {
  toggledView.value = !toggledView.value;
};
</script>
