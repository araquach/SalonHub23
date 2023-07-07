<template>
  <div>
    <br>
    <div>
      <button @click="toggleData" class="button is-small is-warning">Toggle Data</button>
    </div>
    <div v-if="costsStore.costsByYearLoaded" class="container">
      <Bar :options="chartData.chartOptions" :data="chartData" />
    </div>
  </div>
</template>
<script>
import { Bar } from "vue-chartjs";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useMainStore } from "../../../stores/main";
import { useCostsStore } from "../../../stores/costs";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
export default {
  components: { Bar },
  setup() {
    const mainStore = useMainStore();
    const costsStore = useCostsStore();
    return {
      mainStore,
      costsStore
    };
  },

  data() {
    return {
      toggled: false
    }
  },

  methods: {
    toggleData() {
      this.toggled = !this.toggled
    }
  },

  computed: {
    chartData() {
        return this.costsStore.getCostsByYearChart(this.toggled)
    }
  }
}
</script>