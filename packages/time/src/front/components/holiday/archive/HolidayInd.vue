<template>
  <router-link :to="{ name: 'holiday-detail', params: { id: holiday.id } }" class="column is-6-mobile is-4-tablet is-3-desktop">
    <div :class="statusColour" class="box has-background-holiday">
      <div class="columns">
        <div class="column">
          <p>Requested:</p>
          <p>From:</p>
          <p>To:</p>
          <p>Description:</p>
        </div>
        <div class="column">
          <p>{{ holiday.hours_requested / 8 }}</p>
          <p>{{ holiday.request_date_from | shortDate }}</p>
          <p>{{ holiday.request_date_to | shortDate }}</p>
          <p>{{holiday.description}}</p>
        </div>
      </div>

      <img v-show="holiday.prebooked" src="main/dist/img/icons/prebooked.svg" width="40">
      <img v-show="holiday.saturday === 0.5" src="main/dist/img/icons/half_sat.svg" width="40">
      <img v-show="holiday.saturday === 1.0 " src="main/dist/img/icons/1_sat.svg" width="40">
      <img v-show="holiday.saturday === 1.5" src="main/dist/img/icons/1_half_sat.svg" width="40">
      <img v-show="holiday.saturday === 2.0" src="main/dist/img/icons/2_sat.svg" width="40">
      <img v-if="!holiday.prebooked" src="main/dist/img/icons/empty.png" width="40">
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['holiday'],

  computed: {
    statusColour() {
      if (this.holiday.approved === 1) {
        return 'approved'
      } else if (this.holiday.approved === 2) {
        return 'denied'
      } else return 'pending'
    }
  }
}
</script>