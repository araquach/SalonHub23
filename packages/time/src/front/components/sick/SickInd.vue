<template>
  <router-link :to="{ name: 'sick-detail', params: { id: sick.id } } " class="column is-6-mobile is-4-tablet is-3-desktop">
    <div :class="statusColour" class="box has-background-sick">
      <h2 class="title is-5">{{sick.description}}</h2>
      <div class="columns">
        <div class="column">
          <p>From:</p>
          <p>To:</p>
          <p>Days:</p>
        </div>
        <div class="column">
          <p>{{formatDate(sick.sick_from) }}</p>
          <p>{{ formatDate(sick.sick_to) }}</p>
          <p>{{sick.sick_hours / 8}}</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import {computed, defineProps} from 'vue';
import { format } from 'date-fns';

const props = defineProps({
  sick: Object,
  filter: [String, Number]
});

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