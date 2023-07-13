<template>
    <div class="columns section">
      <div class="column is-9">
        <div :class="'approved'" class="box has-background-holiday">
          <div class="columns">
            <div class="column">
              <h3 class="title is-3 has-text-white">Holiday Booking</h3>
              <table class="table has-background-holiday has-text-white is-size-5">
                <tr>
                  <td>Request made:</td>
                  <td>{{  holiday.created_at }}</td>
                </tr>
                <tr>
                  <td>Date From:</td>
                  <td>{{ holiday.request_date_from }}</td>
                </tr>
                <tr>
                  <td>Date To:</td>
                  <td>{{ holiday.request_date_to }}</td>
                </tr>
                <tr>
                  <td>Number of days:</td>
                  <td>{{ holiday.hours_requested }}</td>
                </tr>
                <tr>
                  <td>Description:</td>
                  <td>{{ holiday.description }}</td>
                </tr>
                <tr>
                  <td>Number of Saturdays:</td>
                  <td>{{ holiday.saturday }}</td>
                </tr>
                <tr>
                  <td>Approval Status:</td>
                  <td>{{ holiday.approved }}</td>
                </tr>
              </table>
              <router-link :to="{ name: 'holiday-dashboard', params: {filter: 'all'} }" class="button is-small is-white">Back to
                All Holidays
              </router-link>
            </div>
            <div class="column is-3">
              <figure class="image">
                <img :src="'/dist/img/icons/holiday.svg'" alt="Holiday">
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import {useHolidayStore} from "../../../stores/holidayStore";
import {useRoute} from "vue-router";
import {computed} from "vue";

export default {
  async setup() {
    const route = useRoute()
    const holidayStore = useHolidayStore();
    const holiday = computed(() => holidayStore.holiday)
    const id = route.params.id

    await holidayStore.loadHoliday(id);

    return {
      holidayStore,
      holiday
    }
  }
};
</script>