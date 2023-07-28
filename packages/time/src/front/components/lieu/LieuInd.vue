<template>
  <router-link :to="{ name: 'lieu-detail', params: { id: lieu.id } }" class="column is-6-mobile is-4-tablet is-3-desktop">
    <div :class="statusColour" class="has-background-lieu approved box">
      <h2 class="title is-5">{{ lieu.description }}</h2>
      <div class="columns">
        <div class="column">
          <p>Date:</p>
          <p>Hours:</p>
        </div>
        <div class="column">
          <p>{{ formatDate(lieu.date_regarding) }}</p>
          <p>{{ lieu.lieu_hours }}</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import {format} from "date-fns";
import {computed, defineProps} from 'vue';

// Use 'defineProps' to define props
const props = defineProps(['lieu']);

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