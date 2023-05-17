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
        <component :is="toggledView ? 'costs-individual-chart' : 'costs-individual-table'"></component>
      </transition>
    </div>
  </div>
</template>

<script>
import CostsIndividualChart from "../../components/costs/CostsIndividualChart.vue";
import CostsIndividualTable from "../../components/costs/CostsIndividualTable.vue";
import DatePickerComponent from "../../components/DatePickerComponent.vue";
import { useMainStore } from "../../../stores/main";
import { useCostsStore } from "../../../stores/costs";

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: {
    'costs-individual-chart': CostsIndividualChart,
    'costs-individual-table': CostsIndividualTable,
    DatePickerComponent
  },

  setup() {
    const mainStore = useMainStore();
    const costsStore = useCostsStore();
    costsStore.loadIndCostsByMonth();
    return {
      mainStore: mainStore,
      costsStore: costsStore
    };
  },

  data() {
    return {
      toggledView: true,
      startDate: this.mainStore.startDate,
      endDate: this.mainStore.endDate,
    };
  },

  methods: {
    toggleView() {
      this.toggledView = !this.toggledView
    },

    handleDateChange() {
        this.costsStore.loadIndCostsByMonth();
    },

    capitalise(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    },

    async selectCategory(cat) {
      this.costsStore.category = cat
      try {
        await this.costsStore.loadIndCostsByMonth();
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  }
};
</script>