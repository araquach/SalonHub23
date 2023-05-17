<template>
  <div v-if="takingsStore.takingsYearByYearLoaded" class="has-text-black">
    <div class="buttons">
      <button @click="mainStore.salon = salon" v-for="salon in mainStore.salons" :key="salon.id" :class="{'is-danger': salon.id === mainStore.salon.id}" class="button is-small">{{ salon.name }}</button>
    </div>
    <table class="table is-fullwidth">
      <thead>
      <tr>
        <th>Year</th>
        <th>Products</th>
        <th>Services</th>
        <th>Total</th>
      </tr>
      </thead>
      <tr v-for="taking in takingsStore.getTakingsByYearTable" :key="taking.id">
        <th>{{ taking.year  }}</th>
        <td>{{ formatCurrency(taking.products, 'GBP') }}</td>
        <td>{{ formatCurrency(taking.services, 'GBP') }}</td>
        <td class="green">{{ formatCurrency(taking.total, 'GBP') }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { useMainStore } from "@/stores/main";
import { useTakingsStore } from "@/stores/takings";

export default {
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
      selectedSalon: "All"
    }
  },

  methods: {
    formatCurrency(number, currency) {
      return number.toLocaleString('en-GB', { style: 'currency', currency: currency });
    },
  }
}
</script>
<style>
.green {
    color: green;
}
</style>