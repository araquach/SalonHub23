<template>
  <div v-if="costsStore.costsByYearLoaded" class="has-text-black">
    <br>
    <table class="table is-fullwidth">
      <thead>
      <tr>
        <th>Year</th>
        <th>Jakata</th>
        <th>PK</th>
        <th>Base</th>
        <th>Total</th>
      </tr>
      </thead>
      <tr v-for="cost in costsStore.getCostsByYearTable" :key="cost.id">
        <th>{{ cost.year }}</th>
        <td>{{ formatCurrency(cost.jakata, 'GBP') }}</td>
        <td>{{ formatCurrency(cost.pk, 'GBP') }}</td>
        <td>{{ formatCurrency(cost.base, 'GBP') }}</td>
        <td class="red">{{ formatCurrency(cost.all, 'GBP') }}</td>
      </tr>
    </table>
  </div>
</template>
<script setup>
import {useCostsStore} from "../../../stores/costs";

const costsStore = useCostsStore();

const formatCurrency = (number, currency) => {
  return number.toLocaleString('en-GB', {style: 'currency', currency: currency});
}
</script>

<style>
.red {
  color: darkred;
}
</style>