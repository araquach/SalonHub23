<template>
  <div class="columns section">
    <div class="column is-9">
      <div :class="'denied'" class="box has-background-free-time">
        <div class="columns">
          <div class="column">
            <h3 class="title is-3 has-text-white">Free Time Booking</h3>
            <table class="table has-background-free-time has-text-white is-size-5">
              <tr>
                <td>Date Booked:</td>
                <td>21/11/23</td>
              </tr>
              <tr>
                <td>Date Requested:</td>
                <td>13th Jan 2022</td>
              </tr>
              <tr>
                <td>Number of hours:</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>Early Dart</td>
              </tr>
              <tr>
                <td>Approval Status:</td>
                <td>Denied</td>
              </tr>
            </table>
            <router-link :to="{ name: 'free-time-dashboard', params: {filter: 'all'} }" class="button is-small is-white">Back to All Free Time</router-link>
          </div>
          <div class="column is-3">
            <figure class="image">
              <img alt="Free Time" :src="'/dist/img/icons/free-time.svg'">
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
      freeTimeId: null
    };
  },
  created() {
    this.freeTimeId = this.$route.params.id;
  }
};
</script>