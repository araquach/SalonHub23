<template>
  <div id="holiday">
    <div class="hero is-small is-holiday">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-3">
            <img :src="'/dist/img/icons/holiday.svg'" width="200">
          </div>
          <div class="column">
            <p class="is-size-4">Holiday Entitlement: 28 days</p>
            <p class="is-size-4">Total Booked: 20 days</p>
            <p class="is-size-4">Days remaining: 10</p>
            <p class="is-size-4">Remaining Saturdays: 3</p>
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
    <HolidayInd/>
  </div>
</template>
<script>
import {defineComponent} from "vue";
import HolidayInd from "../../../front/components/holiday/HolidayInd.vue";

export default defineComponent({
  components: {HolidayInd}
})

</script>