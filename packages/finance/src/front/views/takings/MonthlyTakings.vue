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
<!--      <transition name="fade" mode="out-in">-->
<!--        <component :is="toggledView ? 'monthly-takings-chart' : 'monthly-takings-table'"></component>-->
<!--      </transition>-->
    </div>
  </div>
</template>

<script>
import MonthlyTakingsChart from "../../components/takings/MonthlyTakingsChart.vue";
import MonthlyTakingsTable from "../../components/takings/MonthlyTakingsTable.vue";
import DatePickerComponent from "../../components/DatePickerComponent.vue";
import { useMainStore } from "../../../stores/main";
import { useTakingsStore } from "../../../stores/takings";
import { useIncomeStore } from "../../../stores/income";

export default {
  setup() {
    const mainStore = useMainStore();
    const takingsStore = useTakingsStore();
    const incomeStore = useIncomeStore()
    takingsStore.loadTakingsMonthByMonth();
    incomeStore.loadIncomeByMonth()
    return {
      mainStore,
      takingsStore,
      incomeStore
    };
  },

  // eslint-disable-next-line vue/no-reserved-component-names
  components: {
    'monthly-takings-chart': MonthlyTakingsChart,
    'monthly-takings-table': MonthlyTakingsTable,
    DatePickerComponent
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
      this.takingsStore.loadTakingsMonthByMonth();
      this.incomeStore.loadIncomeByMonth()
    }
  }
};
</script>