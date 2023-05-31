<template>
  <div class="section">
    <div v-if="holidays.length" class="columns is-mobile is-multiline">
      <holidayInd v-for="(holiday, index) in filteredByStatus"
                  :key="index"
                  :holiday="holiday"
      />
    </div>
    <div v-else>
      <p class="is-size-4 has-text-white">There are no holiday bookings yet</p>
    </div>
  </div>
</template>

<script>
import HolidayInd from './HolidayInd'
import {useHolidayStore} from "../../../stores/holidayStore";

export default {
  components: {HolidayInd},

  setup() {
    const holidayStore = useHolidayStore();
    return {
      holidayStore: holidayStore,
      holidays: holidayStore.holidays,
      approvedHolidays: holidayStore.approvedHolidays,
      awaitingHolidays: holidayStore.awaitingHolidays,
      deniedHolidays: holidayStore.deniedHolidays
    }
  },

  computed: {
    filteredByStatus() {
      switch (this.$route.params.filter) {
        case "approved":
          return this.approvedHolidays
        case "denied":
          return this.deniedHolidays
        case "awaiting":
          return this.awaitingHolidays
        case "all":
          return this.holidays
      }
    }
  }
}
</script>