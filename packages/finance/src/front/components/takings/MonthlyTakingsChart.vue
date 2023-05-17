<template>
  <div>
    <div class="buttons">
      <button @click="toggleData" class="button is-small is-warning">Toggle Data</button>
      <button @click="toggleLinear" class="button is-small is-warning">Toggle Linear</button>
    </div>
    <div v-if="takingsStore.takingsByMonthLoaded" class="container">
      <Line :options="chartData.chartOptions" :data="chartData" />
    </div>
  </div>
</template>
<script>
import { Line } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js'
import { useMainStore } from "@/stores/main";
import { useTakingsStore } from "@/stores/takings";
ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)

export default {
  setup() {
    const mainStore = useMainStore();
    const takingsStore = useTakingsStore();
    return {
      mainStore,
      takingsStore
    };
  },

  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Line },
  data() {
    return {
      toggled: false,
      showLinear: false
    }
  },

  methods: {
    toggleData() {
      this.toggled = !this.toggled
    },

    toggleLinear() {
      this.showLinear = !this.showLinear
    }
  },

  computed: {
    chartData() {
      return this.takingsStore.getTakingsByMonthChart(this.toggled, this.showLinear)
    }
  }
}
</script>