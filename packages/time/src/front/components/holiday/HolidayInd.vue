<template>
  <router-link :to="{ name: 'holiday-detail', params: { id: holiday.id } }" class="column is-6-mobile is-4-tablet is-3-desktop">
    <div :class="statusColour" class="box has-background-holiday">
      <h2 class="title is-5">{{holiday.description}}</h2>
      <div class="columns">
        <div class="column">
          <p>Requested:</p>
          <p>From:</p>
          <p>To:</p>
        </div>
        <div class="column">
          <p>{{ holiday.requested }}</p>
          <p>{{ formatDate(holiday.date_from) }}</p>
          <p>{{ formatDate(holiday.date_to) }}</p>
        </div>
      </div>

      <img v-show="holiday.saturday === 0.5" :src="'/dist/img/icons/half_sat.svg'" width="40">
      <img v-show="holiday.saturday === 1.0 " :src="'/dist/img/icons/1_sat.svg'" width="40">
      <img v-show="holiday.saturday === 1.5" :src="'/dist/img/icons/1_half_sat.svg'" width="40">
      <img v-show="holiday.saturday === 2.0" :src="'/dist/img/icons/2_sat.svg'" width="40">
      <img v-if="!holiday.prebooked" :src="'/dist/img/icons/empty.png'" width="40">
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';
import { format } from "date-fns";

const props = defineProps(['holiday']);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy');
}

const statusColour = computed(() => {
  if (props.holiday.approved === 1) {
    return 'approved'
  } else if (props.holiday.approved === 2) {
    return 'denied'
  } else return 'pending'
});
</script>