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
            <p class="is-size-4">Holiday Entitlement: {{ timeDetails.holiday_ent }} days</p>
            <p class="is-size-4">
              Total Booked: {{ timeDetails.holidays }} days
              <span v-if="timeDetails.holidays_pending !== 0" class="is-size-6"> ({{ timeDetails.holidays_pending }} pending)</span>
            </p>
            <p class="is-size-3">
              Days remaining: {{ holidaysRemaining }}
              <span v-if="timeDetails.holidays_pending !== 0" class="is-size-6">({{holidaysRemaining - timeDetails.holidays_pending}})</span>
            </p>
            <p class="is-size-3">
              Remaining Saturdays: {{ timeDetails.saturdays }}
              <span v-if="timeDetails.saturdays_pending !== 0" class="is-size-6">({{ timeDetails.saturdays - timeDetails.saturdays_pending }})</span>
            </p>
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
              <router-link :to="{ name: 'holiday-dashboard', params: {filter: 'all', id: null} }"
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
<script setup>
import {computed, onMounted, watchEffect} from 'vue';
import {useHolidayStore} from "../../../stores/holidayStore";
import {useTimeStore} from "../../../stores/timeStore";
import HolidayInd from "../../../front/components/holiday/HolidayInd.vue";

const props = defineProps({
  filter: {
    required: true
  }
})

const holidayStore = useHolidayStore();
const timeStore = useTimeStore();
const timeDetails = computed(() => timeStore.timeDetails);
const holidaysRemaining = computed(() => timeStore.timeDetails.holiday_ent - timeStore.timeDetails.holidays)

const filterMapping = {
  'awaiting': 0,
  'approved': 1,
  'denied': 2,
  'all': 3,
};

onMounted(() => {
  holidayStore.loadHolidays();
})

watchEffect(() => {
  const newFilter = props.filter;
  if (newFilter in filterMapping) {
    holidayStore.setActiveFilter(filterMapping[newFilter]);
  }
});
</script>

<style scoped>
.section {
  padding: 1rem;
}
</style>