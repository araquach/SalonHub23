<template>
  <div class="section has-background-white">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h1 class="title is-4 has-text-dark">Profit/Loss</h1>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="buttons">
            <button @click="toggleView" class="button is-small">Change View</button>
          </div>
        </div>
      </div>
    </div>
    <DatePickerComponent @date-change="handleDateChange" />
    <div class="transition-container">
      <transition name="fade" mode="out-in">
        <component :is="toggledView ? 'profit-loss-chart' : 'profit-loss-table'"></component>
      </transition>
    </div>
  </div>
</template>

<script>
import ProfitLossChart from "../../components/profitLoss/ProfitLossChart.vue";
import ProfitLossTable from "../../components/profitLoss/ProfitLossTable.vue";
import DatePickerComponent from "../../components/DatePickerComponent.vue";
import { useMainStore } from "../../../stores/main";
import { useProfitLossStore } from "../../../stores/profitLoss";

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: {
    'profit-loss-chart': ProfitLossChart,
    'profit-loss-table': ProfitLossTable,
    DatePickerComponent
  },

  setup() {
    const mainStore = useMainStore();
    const profitLossStore = useProfitLossStore();
    profitLossStore.loadCostsAndTakingsByDateRange();
    return {
      mainStore: mainStore,
      costsStore: profitLossStore
    };
  },

  data() {
    return {
      toggledView: true,
      startDate: this.mainStore.startDate,
      endDate: this.mainStore.endDate
    };
  },


  methods: {
    toggleView() {
      this.toggledView = !this.toggledView;
    },

    handleDateChange() {
      this.costsStore.loadCostsAndTakingsByDateRange();
    }
  }
};
</script>