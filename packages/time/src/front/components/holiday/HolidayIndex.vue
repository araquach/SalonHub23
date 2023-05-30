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
import {mapGetters, mapState} from "vuex"
import HolidayInd from './HolidayInd'

export default {
  components: {HolidayInd},

  computed: {
    ...mapState({
      holidays: state => state.holiday.holidays
    }),

    ...mapGetters([
      'approvedHolidays',
      'awaitingHolidays',
      'deniedHolidays'
    ]),

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