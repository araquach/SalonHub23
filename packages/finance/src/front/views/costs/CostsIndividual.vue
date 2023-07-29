<template>
  <div class="section has-background-white">
    <div>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h2 class="title is-4 has-text-dark">{{ capitalise(costsStore.category) }}</h2>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <button @click="toggleView" class="button is-small">Change View</button>
          </div>
        </div>
      </div>
      <DatePickerComponent @date-change="handleDateChange"/>
      <div class="buttons">
        <button v-for="(category, i) in costsStore.categories"  @click="selectCategory(category)" :key="i" :class="{'is-link': category === costsStore.category}" class="button is-small is-primary">
          {{ capitalise(category) }}
        </button>
      </div>
    </div>
    <div class="transition-container">
      <transition name="fade" mode="out-in">
        <component :is="toggledView ? CostsIndividualChart : CostsIndividualTable"></component>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CostsIndividualChart from "../../components/costs/CostsIndividualChart.vue";
import CostsIndividualTable from "../../components/costs/CostsIndividualTable.vue";
import DatePickerComponent from "../../components/DatePickerComponent.vue";
import { useCostsStore } from "../../../stores/costs";

const costsStore = useCostsStore();
costsStore.loadIndCostsByMonth();

const toggledView = ref(true);

const toggleView = () => {
  toggledView.value = !toggledView.value;
};

const handleDateChange = () => {
  costsStore.loadIndCostsByMonth();
};

const capitalise = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const selectCategory = async (cat) => {
  costsStore.category = cat;
  try {
    await costsStore.loadIndCostsByMonth();
  } catch (error) {
    alert(error);
    console.log(error);
  }
};
</script>