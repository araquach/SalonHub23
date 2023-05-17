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
        <component :is="toggledView ? 'stylist-comparison-chart' : 'stylist-comparison-table'"></component>
      </transition>
    </div>
  </div>
</template>

<script>

import StylistComparisonChart from "../../components/takings/StylistComparisonChart.vue";
import StylistComparisonTable from "../../components/takings/StylistComparisonTable.vue";
import DatePickerComponent from "../../components/DatePickerComponent.vue";
import { useMainStore } from "../../../stores/main";
import { useTakingsStore } from "../../../stores/takings";

export default {
  components: {
    "stylist-comparison-table": StylistComparisonTable,
    "stylist-comparison-chart": StylistComparisonChart,
    DatePickerComponent
  },

  setup() {
    const mainStore = useMainStore();
    const takingsStore = useTakingsStore();
    mainStore.loadStylists();
    takingsStore.loadTakingsByStylistComparison();
    return {
      mainStore,
      takingsStore
    };
  },

  data() {
    return {
      toggledView: true,
      buttonLabels: {
        true: "Hide Old",
        false: "Show Old"
      },
      startDate: this.mainStore.startDate,
      endDate: this.mainStore.endDate
    };
  },

  methods: {
    toggleView() {
      this.toggledView = !this.toggledView;
    },

    toggleFilter() {
      this.takingsStore.stylistFiltered = !this.takingsStore.stylistFiltered;
    },

    selectSalon(salon) {
      this.mainStore.salon = salon;
      this.updateData();
    },

    updateData() {
      this.takingsStore.loadTakingsByStylistComparison();
    },

    handleDateChange() {
      this.takingsStore.loadTakingsByStylistComparison();
    }
  },

  computed: {
    buttonText() {
      return this.takingsStore.stylistFiltered ? this.buttonLabels.true : this.buttonLabels.false;
    }
  }
};
</script>