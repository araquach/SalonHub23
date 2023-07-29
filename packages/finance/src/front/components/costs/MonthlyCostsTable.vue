<template>
  <div v-if="costsStore.costsByMonthLoaded">
    <br>
    <table class="table is-fullwidth">
      <thead>
      <tr>
        <th>Month</th>
        <th>Jakata</th>
        <th>PK</th>
        <th>Base</th>
        <th>Total</th>
      </tr>
      </thead>
      <tr v-for="cost in costsStore.getCostsByMonthTable" :key="cost.id">
        <th>{{ cost.month }}</th>
        <td>{{ formatCurrency(cost.jakata, 'GBP') }}</td>
        <td>{{ formatCurrency(cost.pk, 'GBP') }}</td>
        <td>{{ formatCurrency(cost.base, 'GBP') }}</td>
        <td class="red">{{ formatCurrency(cost.all, 'GBP') }}</td>
      </tr>
    </table>
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
  .red .red strong{
      color: darkred;
  }
</style>