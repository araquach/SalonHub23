<template>
  <router-link :to="detailRoute" class="column is-6-mobile is-4-tablet is-3-desktop">
    <div :class="statusColour" class="has-background-lieu approved box">
      <h2 class="title is-4 mb-2">{{ lieu.first_name }} {{ lieu.last_name }}</h2>
      <h2 class="title is-5">{{ lieu.description }}</h2>
      <div class="columns">
        <div class="column">
          <p>Date:</p>
          <p>Hours:</p>
        </div>
        <div class="column">
          <p>{{ formatDate(lieu.request_date) }}</p>
          <p>{{ lieu.hours }}</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import {format} from "date-fns";
import {computed} from 'vue';
import {useMainStore} from "main/src/stores/mainStore"

const props = defineProps(['lieu']);
const mainStore = useMainStore();

const detailRoute = computed(() => ({
  name: mainStore.selectedView === 'admin' ? 'lieu-admin-detail' : 'lieu-detail',
  params: { id: props.lieu.id },
}));

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy');
};

const statusColour = computed(() => {
  if (props.lieu.approved === 1) {
    return 'approved'
  } else if (props.lieu.approved === 2) {
    return 'denied'
  } else return 'pending'
});
</script>