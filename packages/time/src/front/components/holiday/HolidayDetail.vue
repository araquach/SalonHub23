<template>
  <div class="columns is-centered">
    <div class="column is-9">
      <div :class="statusColour" class="box has-background-holiday">
        <div class="columns">
          <div class="column">
            <h3 class="title is-3 has-text-white">Holiday Booking</h3>
            <table class="table has-background-holiday has-text-white is-size-5">
              <tr>
                <td>Request made:</td>
                <td>{{ holiday.created_at | longDate }}</td>
              </tr>
              <tr>
                <td>Date From:</td>
                <td>{{ holiday.request_date_from | longDate }}</td>
              </tr>
              <tr>
                <td>Date To:</td>
                <td>{{ holiday.request_date_to | longDate }}</td>
              </tr>
              <tr>
                <td>Number of days:</td>
                <td>{{ holiday.hours_requested / 8 }}</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>{{ holiday.description }}</td>
              </tr>
              <tr>
                <td>Pe-booked:</td>
                <td>{{ isPrebooked }}</td>
              </tr>
              <tr>
                <td>Number of Saturdays:</td>
                <td>{{ holiday.saturday }}</td>
              </tr>
              <tr>
                <td>Approval Status:</td>
                <td>{{ approvalStatus }}</td>
              </tr>
            </table>
            <router-link :to="{ name: 'holiday-index', params: {filter: 'all'} }" class="button is-small">Back to All Holidays</router-link>
          </div>
          <div class="column is-3">
            <figure class="image">
              <img alt="Holiday" src="/dist/img/icons/holiday.svg">
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
  data() {
    return {
      holiday: {}
    }
  },

  computed: {
    ...mapState({
      user: state => state.auth.user
    }),

    isPrebooked() {
      if (this.holiday.prebooked) {
        return "Yes"
      } else {
        return "No"
      }
    },

    approvalStatus() {
      if (this.holiday.approved === 2) {
        return "Denied"
      } else if (this.holiday.approved === 1) {
        return "Approved"
      } else {
        return "Pending"
      }
    },

    statusColour() {
      if (this.holiday.approved === 1) {
        return 'approved'
      } else if (this.holiday.approved === 2) {
        return 'denied'
      } else return 'pending'
    },
  },

  mounted() {
    axios.get(`/api/holiday/${this.$route.params.id}`)
        .then(response => this.holiday = response.data)
        .catch(error => {
          console.log(error)
        })
  }

}

</script>

