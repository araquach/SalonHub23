<template>
  <div id="holiday">
    <div class="hero is-holiday">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-2">
            <img :src="'/dist/img/icons/holiday.svg'" alt="Holidays">
          </div>
          <div v-if="timeStore.timeDetailsLoading" class="column">
            <p>Loading...</p>
          </div>
          <div v-else class="column">
            <p class="is-size-4">Holiday Entitlement: {{ timeStore.timeDetails.holiday_ent }} days</p>
            <p class="is-size-4">Total Booked: {{ timeStore.timeDetails.holidays }} days</p>
            <p class="is-size-3">Days remaining: {{ timeStore.timeDetails.holiday_ent - timeStore.timeDetails.holidays }}</p>
            <p class="is-size-3">Remaining Saturdays: {{ timeStore.timeDetails.saturdays }}</p>
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
      <div v-if="holidayStore.holidaysLoading" class="columns section">
        <p class="is-size-4">Loading holidays...</p>
      </div>
      <div v-else-if="holidayStore.filteredHolidays.length" class="columns is-mobile is-multiline">
        <holidayInd v-for="(holiday, index) in holidayStore.filteredHolidays"
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
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import {useHolidayStore} from "../../../stores/holidayStore";
import {useTimeStore} from "../../../stores/timeStore";
import HolidayInd from "../../../front/components/holiday/HolidayInd.vue";

export default {
  components: {HolidayInd},

  setup() {
    const route = useRoute();
    const holidayStore = useHolidayStore();
    const timeStore = useTimeStore();

    const filterMapping = {
      'awaiting': 0,
      'approved': 1,
      'denied': 2,
      'all': 3,
    };

    watch(() => route.params.filter, newFilter => {
      if (newFilter in filterMapping) {
        holidayStore.setActiveFilter(filterMapping[newFilter]);
      }
    }, { immediate: true });

    holidayStore.loadHolidays();

    return {
      timeStore,
      holidayStore
    }
  }
}
</script>

<style scoped>
.section {
  padding: 1rem;
}
</style>