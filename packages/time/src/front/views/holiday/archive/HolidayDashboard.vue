<template>
  <div id="holiday" class="section">
    <div class="hero is-holiday">
      <transition name="fade" mode="out-in">
        <div v-if="showHero" class="hero-body">
          <div class="columns">
            <div class="column is-3">
              <img :src="holidayIcon">
            </div>
            <div class="column">
              <p class="is-size-4">Holiday Entitlement: {{ entitlement }} days</p>
              <p class="is-size-4">Total Booked: {{ holidayTotal / 8 }} days</p>
              <p class="is-size-3">Days remaining: {{ remainingHolidays }}</p>
              <p class="is-size-3">Remaining Saturdays: {{ remainingSaturdays }}</p>
            </div>
          </div>
          <div class="navbar is-transparent">
            <div class="buttons">
              <div class="buttons">
                <router-link :to="{ name: 'holiday-create' }" class="button is-white is-small">
                  Book a Holiday
                </router-link>
                <router-link :to="{ name: 'holiday-index', params: { filter: 'approved' } }"
                             class="button is-white is-outlined is-small">
                  Approved Holidays
                </router-link>
                <router-link :to="{ name: 'holiday-index', params: { filter: 'awaiting' } }"
                             class="button is-white is-outlined is-small">
                  Awaiting Approval
                </router-link>
                <router-link :to="{ name: 'holiday-index', params: { filter: 'denied' } }"
                             class="button is-white is-outlined is-small">
                  Denied Holidays
                </router-link>
                <router-link :to="{ name: 'holiday-index', params: { filter: 'all' } }"
                             class="button is-white is-outlined is-small">
                  All Holidays
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <transition mode="out-in" name="fade">
      <router-view/>
    </transition>
  </div>
</template>
<script>
import {useHolidayStore} from "../../../stores/holidayStore";
import holidayIcon from "main/dist/img/icons/holiday.svg";

export default {
  setup() {
    const holidayStore = useHolidayStore();
    return {
      holidayStore: holidayStore,
      holidayTotal: holidayStore.holidayTotal,
      remainingHolidays: holidayStore.remainingHolidays,
      entitlement: holidayStore.entitlement,
      remainingSaturdays : holidayStore.remainingSaturdays,
      holidayIcon
    };
  },

  methods: {
    showHero() {
      if (this.$route.name === 'holiday' || this.$route.name === 'holiday-index') {
        return true
      }
    }
  },

  // mounted() {
  //   this.$store.dispatch('loadHolidays')
  // },
}
</script>