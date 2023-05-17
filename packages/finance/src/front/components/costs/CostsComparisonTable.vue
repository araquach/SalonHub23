<template>
  <div v-if="costsStore.costsByCatLoaded">
    <table class="table is-fullwidth">
      <thead>
      <tr>
        <th>Month</th>
        <th>Total</th>
        <th>Percent</th>
        <th>Average</th>
      </tr>
      </thead>
      <tr v-for="cost in costsStore.getCostsByCatTable" :key="cost.id">
        <th>{{ capitalise(cost.category) }}</th>
        <td class="red">{{ formatCurrency(cost.total, "GBP") }}</td>
        <td>{{ cost.percent.toFixed(1) }}</td>
        <td>{{ formatCurrency(cost.average, 'GBP') }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { useCostsStore } from "../../../stores/costs";
import { useMainStore } from "../../../stores/main";

export default {
  setup() {
    const mainStore = useMainStore();
    const costsStore = useCostsStore();
    return {
      mainStore,
      costsStore
    };
  },

  methods: {
    formatCurrency(number, currency) {
      return number.toLocaleString('en-GB', { style: 'currency', currency: currency });
    },

    capitalise(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    },
  }
};
</script>

