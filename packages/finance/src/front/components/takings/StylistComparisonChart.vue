<template>
  <div>
    <br>
    <div class="buttons">
      <button @click="toggleData" class="button is-warning is-small">Toggle Data</button>
    </div>
    <div v-if="takingsStore.takingsByStylistComparisonLoaded" class="container">
      <Bar :options="chartData.chartOptions" :data="chartData" />
    </div>
  </div>
</template>
<script>
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { useMainStore } from "../../../stores/main";
import { useTakingsStore } from "../../../stores/takings";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components: { Bar },

  setup() {
    const mainStore = useMainStore();
    const takingsStore = useTakingsStore();
    takingsStore.loadTakingsByStylistComparison();
    return {
      mainStore,
      takingsStore
    };
  },

  data() {
    return {
      toggled: false,
    }
  },

  methods: {
    toggleData() {
      this.toggled = !this.toggled
    },
  },

  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    chartData() {
      return this.takingsStore.getStylistComparisonChart(this.toggled)
    }
  }
}

</script>