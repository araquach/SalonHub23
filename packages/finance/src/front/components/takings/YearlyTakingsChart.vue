<template>
  <div>
    <div class="buttons">
      <button @click="toggleData" class="button is-small is-warning">Toggle Data</button>
    </div>
    <div v-if="takingsStore.takingsYearByYearLoaded" class="container">
      <Bar :options="chartData.chartOptions" :data="chartData" />
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { Bar } from "vue-chartjs";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useMainStore } from "@/stores/main";
import { useTakingsStore } from "@/stores/takings";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  components: { Bar },

  setup() {
    const mainStore = useMainStore();
    const takingsStore = useTakingsStore();
    return {
      mainStore,
      takingsStore
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
      return this.takingsStore.getTakingsByYearChart(this.toggled)
    }
  }
});
</script>
