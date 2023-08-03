<template>
  <div class="section has-background-white">
    <div>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title is-4 has-text-dark">Stylist Comparison</h1>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="buttons">
              <button @click="toggleFilter" class="button is-small">{{ buttonText }}</button>
              <button @click="toggleView" class="button is-small">Change View</button>
            </div>
          </div>
        </div>
      </div>
      <DatePickerComponent @date-change="handleDateChange" />
      <div class="buttons">
        <button v-for="(salon, i) in mainStore.salons" @click="selectSalon(salon)" :key="i"
                :class="{'is-danger': salon.id === mainStore.salon.id}" class="button is-small is-dark">
          {{ salon.name }}
        </button>
      </div>
    </div>
    <div class="transition-container">
      <transition name="fade" mode="out-in">
        <component :is="toggledView ? StylistComparisonChart : StylistComparisonTable"></component>
      </transition>
    </div>
  </div>
</template>

<script setup>
import StylistComparisonChart from "../../components/takings/StylistComparisonChart.vue";
import StylistComparisonTable from "../../components/takings/StylistComparisonTable.vue";
import DatePickerComponent from "../../components/DatePickerComponent.vue";
import { useMainStore } from "../../../stores/main";
import { useTakingsStore } from "../../../stores/takings";
import {ref, computed} from "vue";

const mainStore = useMainStore();
const takingsStore = useTakingsStore();
mainStore.loadStylists();
takingsStore.loadTakingsByStylistComparison();

let toggledView = ref(true);
let buttonLabels = ref({ true: "Hide Old", false: "Show Old" });

const toggleView = () => {
  toggledView.value = !toggledView.value;
};

const toggleFilter = () => {
  takingsStore.stylistFiltered = !takingsStore.stylistFiltered;
};

const selectSalon = (salon) => {
  mainStore.salon = salon;
  updateData();
};

const updateData = () => {
  takingsStore.loadTakingsByStylistComparison();
};

const handleDateChange = () => {
  takingsStore.loadTakingsByStylistComparison();
};

const buttonText = computed(() => {
  return takingsStore.stylistFiltered ? buttonLabels.value.true : buttonLabels.value.false;
});
</script>