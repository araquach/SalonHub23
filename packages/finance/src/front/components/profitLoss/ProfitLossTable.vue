<template>
  <div v-if="profitLossStore.costsAndTakingsLoaded">
    <table class="table is-fullwidth">
      <thead>
      <tr>
        <th>Month</th>
        <th>Takings</th>
        <th>Costs</th>
        <th>Profit/Loss</th>
      </tr>
      </thead>
      <tr v-for="figure in profitLossStore.getCostsAndTakingsTable" :key="figure.id">
        <th>{{ figure.month }}</th>
        <td class="green">{{ formatCurrency(figure.takings_total, 'GBP') }}</td>
        <td class="red">{{ formatCurrency(figure.cost_total, 'GBP') }}</td>
        <td :class="addClass(figure.profit_loss)">{{ formatCurrency(figure.profit_loss, 'GBP') }}</td>
      </tr>
      <tr>
        <th>Totals</th>
        <td><strong class="green">{{ formatCurrency(profitLossStore.costsAndTakings.total_takings, "GBP") }}</strong></td>
        <td><strong class="red">{{ formatCurrency(profitLossStore.costsAndTakings.total_costs, "GBP") }}</strong></td>
        <td><strong class="red">{{ formatCurrency(calculatedTotalsDifference, "GBP") }}</strong></td>
      </tr>
      <tr>
        <th>Average</th>
        <td><strong class="green">{{ formatCurrency(profitLossStore.costsAndTakings.average_takings, "GBP") }}</strong></td>
        <td><strong class="red">{{ formatCurrency(profitLossStore.costsAndTakings.average_costs, "GBP") }}</strong></td>
        <td><strong class="red">{{ formatCurrency(calculatedAverageDifference, "GBP") }}</strong></td>
      </tr>
    </table>
  </div>
</template>
<script>
import { useMainStore } from "../../../stores/main";
import { useProfitLossStore } from "../../../stores/profitLoss";

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  setup() {
    const mainStore = useMainStore();
    const profitLossStore = useProfitLossStore();
    return {
      mainStore: mainStore,
      profitLossStore: profitLossStore
    };
  },

  computed: {
    addClass() {
      return (figure) => ({
        green: figure >= 0,
        red: figure < 0,
      });
    },

    calculatedTotalsDifference() {
      return this.profitLossStore.costsAndTakings.total_takings - this.profitLossStore.costsAndTakings.total_costs
    },

    calculatedAverageDifference() {
      return this.profitLossStore.costsAndTakings.average_takings - this.profitLossStore.costsAndTakings.average_costs
    }
  },

  methods: {
    formatCurrency(number, currency) {
      return number.toLocaleString('en-GB', { style: 'currency', currency: currency });
    },
  }
};
</script>
<style scoped>
.green .green strong {
    color: darkgreen;
}

.red .red strong{
    color: darkred;
}
</style>