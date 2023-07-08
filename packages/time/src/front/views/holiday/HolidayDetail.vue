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
                <td>12/5/24</td>
              </tr>
              <tr>
                <td>Date From:</td>
                <td>5th Jan 2022</td>
              </tr>
              <tr>
                <td>Date To:</td>
                <td>8th Jan 2022</td>
              </tr>
              <tr>
                <td>Number of days:</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>Going out</td>
              </tr>
              <tr>
                <td>Pe-booked:</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Number of Saturdays:</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Approval Status:</td>
                <td>Approved</td>
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
export default {
  data() {
    return {
      holidayId: null
    };
  },
  created() {
    this.holidayId = this.$route.params.id;
  }
};
</script>