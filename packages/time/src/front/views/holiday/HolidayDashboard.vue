<template>
  <div id="holiday">
    <div class="hero is-holiday">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-2">
            <img :src="'/dist/img/icons/holiday.svg'" alt="Holidays">
          </div>
          <div class="column">
            <p class="is-size-4">Holiday Entitlement: 28 days</p>
            <p class="is-size-4">Total Booked: 20 days</p>
            <p class="is-size-3">Days remaining: 10</p>
            <p class="is-size-3">Remaining Saturdays: 3</p>
          </div>
        </div>
        <div class="navbar is-transparent">
          <div class="buttons">
            <div class="buttons">
              <router-link :to="{ name: 'holiday-create' }" class="button is-white is-small">
                Book a Holiday
              </router-link>
              <router-link :to="{ name: 'holiday-dashboard', params: { filter: 'approved' } }"
                           class="button is-white is-outlined is-small">
                Approved Holidays
              </router-link>
              <router-link :to="{ name: 'holiday-dashboard', params: { filter: 'awaiting' } }"
                           class="button is-white is-outlined is-small">
                Awaiting Approval
              </router-link>
              <router-link :to="{ name: 'holiday-dashboard', params: { filter: 'denied' } }"
                           class="button is-white is-outlined is-small">
                Denied Holidays
              </router-link>
              <router-link :to="{ name: 'holiday-dashboard', params: { filter: 'all' } }"
                           class="button is-white is-outlined is-small">
                All Holidays
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div v-if="holidayStore.holidays.length" class="columns is-mobile is-multiline">
        <holidayInd v-for="(holiday, index) in holidayStore.holidays"
                    :key="index"
                    :holiday="holiday"
        />
      </div>
      <div v-else>
        <p class="is-size-4 has-text-white">There are no holiday bookings yet</p>
      </div>
    </div>
  </div>
</template>
<script>

import HolidayInd from "../../../front/components/holiday/HolidayInd.vue";
import {useHolidayStore} from "../../../stores/holidayStore";

export default {
  components: {HolidayInd},

  setup() {
    const holidayStore = useHolidayStore();
    holidayStore.loadHolidays()
    return {
      holidayStore,
      holidays: holidayStore.holidays
    }
  }
}
</script>
<style scoped>
.section {
  padding: 1rem;
}
</style>