<template>
  <div>
    <br>
    <div class="buttons">
      <div class="buttons">
        <button @click="toggleLinear" class="button is-warning is-small">Toggle Linear</button>
      </div>
    </div>
    <div v-if="costsStore.indCostsByMonthLoaded" class="container">
      <Line :options="chartData.chartOptions" :data="chartData" />
    </div>
  </div>
</template>
<script>
import { Line } from "vue-chartjs";
import { useMainStore } from "../../../stores/main";
import { useCostsStore } from "../../../stores/costs";

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Line },

  setup() {
    const mainStore = useMainStore();
    const costsStore = useCostsStore();
    return {
      mainStore: mainStore,
      costsStore: costsStore
    };
  },

  data() {
    return {
      showLinear: false
    };
  },

  methods: {
    toggleLinear() {
      this.showLinear = !this.showLinear;
    }
  },

  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    chartData() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.costsStore.getIndCostsByMonthChart(this.showLinear)
    }
  }
};
</script>