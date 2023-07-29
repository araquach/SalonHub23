<template>
  <div class="has-text-black">
    <br>
    <table class="table is-fullwidth">
      <thead>
      <tr>
        <th>Stylist</th>
        <th>Products</th>
        <th>Services</th>
        <th>Total</th>
      </tr>
      </thead>
      <tr v-for="takings in takingsStore.getStylistComparisonTable" :key="takings.id">
        <td :style="{ color: takings.color }">
          {{ takings.stylist }}
        </td>
        <td :style="{ color: takings.color }">
          {{ formatCurrency(takings.products, "GBP") }}
        </td>
        <td :style="{ color: takings.color }">
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

<style scoped>
.green .green strong {
    color: green;
}
</style>