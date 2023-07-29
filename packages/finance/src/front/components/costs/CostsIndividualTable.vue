<template>
  <div>
    <br>
    <div v-if="costsStore.indCostsByMonthLoaded">
      <table class="table is-fullwidth">
        <thead>
        <tr>
          <th>Month</th>
          <th>Total</th>
        </tr>
        </thead>
        <tr v-for="cost in costsStore.getIndCostsByMonthTable.figures" :key="cost.id">
          <th>{{ cost.month }}</th>
          <td class="red">{{ formatCurrency(cost.total, "GBP") }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script setup>
import { useCostsStore } from "../../../stores/costs";

const costsStore = useCostsStore();

const formatCurrency = (number, currency) => {
  return number.toLocaleString('en-GB', { style: 'currency', currency: currency });
};
</script>

<style scoped>
.red .red strong {
    color: darkred;
}
</style>