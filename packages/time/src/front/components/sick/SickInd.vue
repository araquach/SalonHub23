<template>
  <router-link :to="detailRoute" class="column is-6-mobile is-4-tablet is-3-desktop">
    <div :class="statusColour" class="box has-background-sick">
      <h2 class="title is-4 mb-2">{{ sick.first_name }} {{ sick.last_name }}</h2>
      <h2 class="title is-5">{{sick.description}}</h2>
      <div class="columns">
        <div class="column">
          <p>From:</p>
          <p>To:</p>
          <p>Days:</p>
        </div>
        <div class="column">
          <p>{{formatDate(sick.date_from) }}</p>
          <p>{{ formatDate(sick.date_to) }}</p>
          <p>{{sick.hours}}</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import {computed } from 'vue';
import { format } from 'date-fns';
import {useMainStore} from "main/src/stores/mainStore";

const props = defineProps(['sick']);
const mainStore = useMainStore();

const detailRoute = computed(() => ({
  name: mainStore.selectedView === 'admin' ? 'sick-admin-detail' : 'sick-detail',
  params: { id: props.sick.id },
}));

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy');
};

const statusColour = computed(() => {
  if (props.sick.deducted) {
    return 'approved';
  } else {
    return 'pending';
  }
});
</script>