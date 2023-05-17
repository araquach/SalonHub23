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
        <component :is="toggledView ? 'yearly-costs-chart' : 'yearly-costs-table'"></component>
      </transition>
    </div>
  </div>
</template>

<script>
import YearlyCostsChart from "../../components/costs/YearlyCostsChart.vue";
import YearlyCostsTable from "../../components/costs/YearlyCostsTable.vue";
import { useMainStore } from "../../../stores/main";
import { useCostsStore } from "../../../stores/costs";

export default {
  components: {
    'yearly-costs-chart': YearlyCostsChart,
    'yearly-costs-table': YearlyCostsTable
  },

  setup() {
    const mainStore = useMainStore();
    const costsStore = useCostsStore();
    costsStore.loadCostsYearByYear();
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
    }
  }
};
</script>