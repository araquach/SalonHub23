<template>
  <div v-if="takingsStore.stylistTakingsByMonthLoaded" class="has-text-black">
    <br>
    <table class="table is-fullwidth">
      <thead>
      <tr>
        <th>Month</th>
        <th>Products</th>
        <th>Services</th>
        <th>Total</th>
      </tr>
      </thead>
      <tr v-for="takings in takingsStore.getStylistTakingsByMonthTable" :key="takings.id">
        <td>
          {{ takings.month }}
        </td>
        <td>
          {{ formatCurrency(takings.products, "GBP") }}
        </td>
        <td>
          {{ formatCurrency(takings.services, "GBP") }}
        </td>
        <td class="green">
          {{ formatCurrency(takings.total, "GBP") }}
        </td>
      </tr>
    </table>
  </div>
</template>
<script setup>
import { useTakingsStore } from "../../../stores/takings";

const takingsStore = useTakingsStore();

const formatCurrency = (number, currency) => {
  return number.toLocaleString('en-GB', { style: 'currency', currency: currency });
};
</script>

<style>
.green .green strong{
    color: green;
}
</style>