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
        <component :is="toggledView ? 'yearly-takings-chart' : 'yearly-takings-table'"></component>
      </transition>
    </div>
  </div>
</template>

<script>
import YearlyTakingsChart from "../../components/takings/YearlyTakingsChart.vue";
import YearlyTakingsTable from "../../components/takings/YearlyTakingsTable.vue";
import { useMainStore } from "../../../stores/main";
import { useTakingsStore } from "../../../stores/takings";

export default {
  components: {
    'yearly-takings-chart': YearlyTakingsChart,
    'yearly-takings-table': YearlyTakingsTable
  },

  setup() {
    const mainStore = useMainStore();
    const takingsStore = useTakingsStore();
    takingsStore.loadTakingsYearByYear();
    return {
      mainStore,
      takingsStore
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