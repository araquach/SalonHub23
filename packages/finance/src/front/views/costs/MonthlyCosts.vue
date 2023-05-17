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
        <component :is="toggledView ? 'monthly-costs-chart' : 'monthly-costs-table'"></component>
      </transition>
    </div>
  </div>
</template>

<script>
import MonthlyCostsChart from "../../components/costs/MonthlyCostsChart.vue";
import MonthlyCostsTable from "../../components/costs/MonthlyCostsTable.vue";
import DatePickerComponent from "../../components/DatePickerComponent.vue";
import { useMainStore } from "../../../stores/main";
import { useCostsStore } from "../../../stores/costs";

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: {
    'monthly-costs-chart': MonthlyCostsChart,
    'monthly-costs-table': MonthlyCostsTable,
    DatePickerComponent
  },

  setup() {
    const mainStore = useMainStore();
    const costsStore = useCostsStore();
    costsStore.loadCostsMonthByMonth();
    return {
      mainStore: mainStore,
      costsStore: costsStore
    };
  },

  data() {
    return {
      toggledView: true
    };
  },

  methods: {
    toggleView() {
      this.toggledView = !this.toggledView;
    },

    handleDateChange() {
      this.costsStore.loadCostsMonthByMonth();
    }
  }
};
</script>