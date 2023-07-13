<template>
  <router-link :to="{ name: 'free-time-detail', params: { id: freeTime.id } }"
               class="column is-6-mobile is-4-tablet is-3-desktop">
    <div :class="statusColour" class="box has-background-free-time">
      <h2 class="title is-5">{{ freeTime.description }}</h2>
      <div class="columns">
        <div class="column">
          <p>Date:</p>
          <p>Hours:</p>
        </div>
        <div class="column">
          <p>{{ formatDate(freeTime.date_regarding) }}</p>
          <p>{{ formatDate(freeTime.free_time_hours) }}</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>

import {format} from "date-fns";

export default {
  setup() {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy');
    }
    return {
      formatDate
    }
  },

  props: ['freeTime'],

  computed: {
    statusColour() {
      if (this.freeTime.approved === 1) {
        return 'approved'
      } else if (this.freeTime.approved === 2) {
        return 'denied'
      } else return 'pending'
    }
  }
}
</script>