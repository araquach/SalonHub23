<template>
  <div v-if="loading" class="columns section">
    <p class="is-size-4">Loading free time...</p>
  </div>
  <div v-else-if="freeTime" class="columns section">
    <div class="column is-9">
      <div :class="statusColour" class="box has-background-free-time">
        <div class="columns">
          <div class="column">
            <h2 class="title is-3 has-text-white">Free Time Booking</h2>
            <h3 class="title is-4">{{ freeTime.description }}</h3>
            <table class="table has-background-free-time has-text-white is-size-5">
              <tr>
                <td>Date Booked:</td>
                <td>{{ formatDate(freeTime.created_at) }}</td>
              </tr>
              <tr>
                <td>Date Requested:</td>
                <td>{{ formatDate(freeTime.date_regarding) }}</td>
              </tr>
              <tr>
                <td>Number of hours:</td>
                <td>{{ freeTime.free_time_hours }}</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>{{ freeTime.description }}</td>
              </tr>
              <tr>
                <td>Approval Status:</td>
                <td>{{ approvalStatus }}</td>
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
<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useFreeTimeStore } from '../../../stores/freeTimeStore';
import { format } from 'date-fns';

const route = useRoute();
const freeTimeStore = useFreeTimeStore();
const freeTime = computed(() => freeTimeStore.freeTime);
const id = route.params.id;
const loading = ref(true);
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'do MMMM yyyy');
};

freeTimeStore.loadFreeTime(id).then(() => {
  loading.value = false; // Once the data has loaded, we set loading to false
}).catch((error) => {
  console.error('Failed to load free time: ', error);
  // Here you can handle the error in some way, like showing a message to the user
});

const approvalStatus = computed(() => {
  if (freeTime.value.approved === 2) {
    return "Denied"
  } else if (freeTime.value.approved === 1) {
    return "Approved"
  } else {
    return "Pending"
  }
});

const statusColour = computed(() => {
  if (freeTime.value.approved === 1) {
    return 'approved'
  } else if (freeTime.value.approved === 2) {
    return 'denied'
  } else return 'pending'
});
</script>

<style scoped>
.table td {
  border-bottom: 1px solid #fff;
}
</style>