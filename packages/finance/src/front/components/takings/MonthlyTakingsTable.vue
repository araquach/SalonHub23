<template>
  <div v-if="takingsStore.takingsByMonthLoaded" class="has-text-black">
    <div class="buttons">
      <button @click="mainStore.salon = salon" v-for="salon in mainStore.salons" :key="salon.id" :class="{'is-danger': salon.id === mainStore.salon.id}" class="button is-small">{{ salon.name }}</button>
    </div>
    <table class="table is-fullwidth">
      <thead>
      <tr>
        <th>Month</th>
        <th>Products</th>
        <th>Services</th>
        <th>Total</th>
      </tr>
      </thead>
      <tr v-for="taking in takingsStore.getTakingsByMonthTable.figures" :key="taking.id">
        <th>{{ taking.month  }}</th>
        <td>{{ formatCurrency(taking.products, 'GBP') }}</td>
        <td>{{ formatCurrency(taking.services, 'GBP') }}</td>
        <td class="green">{{ formatCurrency(taking.total, 'GBP') }}</td>
      </tr>
      <tr>
        <th class="green">Grand Totals</th>
        <td class="green"><strong>{{ formatCurrency(takingsStore.getTakingsByMonthTable.totals.products, 'GBP') }}</strong></td>
        <td class="green"><strong>{{ formatCurrency(takingsStore.getTakingsByMonthTable.totals.services, 'GBP') }}</strong></td>
        <td class="green"><strong>{{ formatCurrency(takingsStore.getTakingsByMonthTable.totals.grand_total, 'GBP') }}</strong></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <th class="green">Monthly Average</th>
        <td class="green"><strong>{{ formatCurrency(takingsStore.getTakingsByMonthTable.totals.monthly, "GBP") }}</strong></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <th class="green">Yearly Average</th>
        <td class="green"><strong>{{ formatCurrency(takingsStore.getTakingsByMonthTable.totals.yearly, "GBP") }}</strong></td>
      </tr>
    </table>
  </div>
</template>
<script>
  import { useMainStore } from "../../../stores/main";
  import { useTakingsStore } from "../../../stores/takings";

  export default {
    setup() {
      const mainStore = useMainStore();
      const takingsStore = useTakingsStore();
      return {
        mainStore,
        takingsStore
      };
    },

    methods: {
      formatCurrency(number, currency) {
        return number.toLocaleString('en-GB', { style: 'currency', currency: currency });
      },
    }
  }
</script>
<style scoped>
.green, .green strong {
    color: green;
}
</style>