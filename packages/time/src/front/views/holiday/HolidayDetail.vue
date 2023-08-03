<template>
  <div v-if="loading" class="columns section">
    <p class="is-size-4">Loading holidays...</p>
  </div>
  <div v-else-if="holiday" class="columns section">
    <div class="column is-9">
      <div :class="statusColour" class="box has-background-holiday">
        <div class="columns">
          <div class="column">
            <h2 class="title is-3 has-text-white">Holiday Booking</h2>
            <h3 class="title is-4">{{ holiday.description }}</h3>
            <table class="table has-background-holiday has-text-white is-size-5">
              <tr>
                <td>Request made:</td>
                <td>{{ formatDate(holiday.created_at) }}</td>
              </tr>
              <tr>
                <td>Date From:</td>
                <td>{{ formatDate(holiday.request_date_from) }}</td>
              </tr>
              <tr>
                <td>Date To:</td>
                <td>{{ formatDate(holiday.request_date_to) }}</td>
              </tr>
              <tr>
                <td>Number of days:</td>
                <td>{{ holiday.hours_requested }}</td>
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
            <div class="buttons">
              <router-link v-if="holiday.approved === 0" :to="{name: 'holiday-update', params: {id: holiday.id}}" class="button is-white is-small">
                Edit Holiday
              </router-link>
              <router-link :to="{ name: 'holiday-dashboard', params: {filter: 'all'} }" class="button is-small is-white">
                Back to
                All Holidays
              </router-link>
            </div>
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
<script setup>
import {useHolidayStore} from "../../../stores/holidayStore";
import {computed, ref, onMounted} from "vue";
import {format} from "date-fns"

const props = defineProps({
  id: {
    required: true
  }
})

const holidayStore = useHolidayStore();
const holiday = computed(() => holidayStore.holiday)
const loading = ref(true)
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'do MMMM yyyy');
}

onMounted(async () => {
  await holidayStore.loadHoliday(props.id)
  loading.value = false
})

const approvalStatus = computed(() => {
  if (holiday.value?.approved === 2) {
    return "Denied"
  } else if (holiday.value?.approved === 1) {
    return "Approved"
  } else {
    return "Pending"
  }
})

const statusColour = computed(() => {
  if (holiday.value?.approved === 1) {
    return 'approved'
  } else if (holiday.value?.approved === 2) {
    return 'denied'
  } else return 'pending'
})
</script>

<style scoped>
.table td {
  border-bottom: 1px solid #fff;
}
</style>