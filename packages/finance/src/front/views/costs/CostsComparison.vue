<template>
  <div class="section has-background-white">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h1 class="title is-4 has-text-dark">Costs Comparison</h1>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button @click="toggleView" class="button is-small">Change View</button>
        </div>
      </div>
    </div>
    <div>
      <DatePickerComponent @date-change="handleDateChange" />
      <div class="padded-bottom buttons">
        <button @click="updateData(salon)" v-for="(salon, i) in mainStore.salons" :key="i"
                :class="{'is-link': activeItem === salon}" class="button is-small is-primary">
          {{ salon.name }}
        </button>
      </div>
    </div>
    <div class="transition-container">
      <transition name="fade" mode="out-in">
        <component :is="toggledView ? CostsComparisonChart : CostsComparisonTable"></component>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CostsComparisonChart from "../../components/costs/CostsComparisonChart.vue";
import CostsComparisonTable from "../../components/costs/CostsComparisonTable.vue";
import DatePickerComponent from "../../components/DatePickerComponent.vue";
import { useCostsStore } from "../../../stores/costs";
import { useMainStore } from "../../../stores/main";

const mainStore = useMainStore();
const costsStore = useCostsStore();
mainStore.salon = {id: 0, name: "All"}
costsStore.loadCostsByCat();

const toggledView = ref(true);
const activeItem = ref("all");

const toggleView = () => {
  toggledView.value = !toggledView.value;
};

const updateData = (salon) => {
  mainStore.salon = salon;
  activeItem.value = salon;
  costsStore.loadCostsByCat();
};

const handleDateChange = () => {
  costsStore.loadCostsByCat();
};
</script>
