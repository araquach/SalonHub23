<template>
  <router-link :to="detailRoute"
               class="column is-6-mobile is-4-tablet is-3-desktop">
    <div :class="statusColour" class="box has-background-free-time">
      <h2 class="title is-4 mb-2">{{ freeTime.first_name }} {{ freeTime.last_name }}</h2>
      <h2 class="title is-5">{{ freeTime.description }}</h2>
      <div class="columns">
        <div class="column">
          <p>Requested:</p>
          <p>Regarding:</p>
          <p>Hours:</p>
        </div>
        <div class="column">
          <p>{{ formatDate(freeTime.created_at) }}</p>
          <p>{{ formatDate(freeTime.request_date) }}</p>
          <p>{{ freeTime.hours }}</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { format } from 'date-fns';
import { computed } from 'vue';
import {useMainStore} from "main/src/stores/mainStore";

const props = defineProps(['freeTime']);
const mainStore = useMainStore();

const detailRoute = computed(() => ({
  name: mainStore.selectedView === 'admin' ? 'free-time-admin-detail' : 'free-time-detail',
  params: { id: props.freeTime.id },
}));

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy');
}

const statusColour = computed(() => {
  if (props.freeTime.approved === 1) {
    return 'approved'
  } else if (props.freeTime.approved === 2) {
    return 'denied'
  } else return 'pending'
});
</script>

