<template>
  <div v-if="loading" class="columns section">
    <p class="is-size-4">Loading lieu...</p>
  </div>
  <div v-else-if="lieu" class="columns section">
    <div class="column is-9">
      <div :class="statusColour" class="box has-background-lieu">
        <div class="columns">
          <div class="column">
            <h2 class="title is-3 has-text-white">Lieu Request</h2>
            <h3 class="title is-4">{{ lieu.description }}</h3>
            <table class="table has-background-lieu has-text-white is-size-5">
              <tr>
                <td>Request made:</td>
                <td>{{ formatDate(lieu.created_at) }}</td>
              </tr>
              <tr>
                <td>Date Regarding:</td>
                <td>{{ formatDate(lieu.date_regarding) }}</td>
              </tr>
              <tr>
                <td>Number of hours:</td>
                <td>{{ lieu.lieu_hours }}</td>
              </tr>
              <tr>
                <td>Approved:</td>
                <td>{{ approvalStatus }}</td>
              </tr>
            </table>
            <router-link :to="{ name: 'lieu-dashboard', params: {filter: 'all'} }" class="button is-small is-white">Back to All Lieu Requests</router-link>
          </div>
          <div class="column is-3">
            <figure class="image">
              <img alt="LieuHours" :src="'/dist/img/icons/lieu.svg'">
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useLieuStore} from "../../../stores/lieuStore";
import {useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";
import { format } from "date-fns";

const route = useRoute();
const lieuStore = useLieuStore();
const lieu = computed(() => lieuStore.lieuHour);
const id = route.params.id;
const loading = ref(true);
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'do MMMM yyyy');
};

onMounted(async () => {
  await lieuStore.loadLieuHour(id)
  loading.value = false
})

// Computed properties
const approvalStatus = computed(() => {
  if (lieu.value?.approved === 2) {
    return "Denied"
  } else if (lieu.value?.approved === 1) {
    return "Approved"
  } else {
    return "Pending"
  }
});

const statusColour = computed(() => {
  if (lieu.value?.approved === 1) {
    return 'approved'
  } else if (lieu.value?.approved === 2) {
    return 'denied'
  } else return 'pending'
});
</script>
<style scoped>
.table td {
  border-bottom: 1px solid #fff;
}
</style>