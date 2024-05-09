<template>
  <div v-if="loading" class="columns section">
    <p class="is-size-4">Loading sick log...</p>
  </div>
  <div v-else-if="sick" class="columns section">
    <div class="column is-9">
      <div :class="statusColour" class="box has-background-sick">
        <div class="columns">
          <div class="column">
            <h2 class="title is-3 has-text-white">Sick Log</h2>
            <h3 class="title is-4">{{ sick.description }}</h3>
            <table class="table has-background-sick has-text-white is-size-5">
              <tr>
                <td>Log was made:</td>
                <td>{{ formatDate(sick.created_at) }}</td>
              </tr>
              <tr>
                <td>Sick From:</td>
                <td>{{ formatDate(sick.date_from) }}</td>
              </tr>
              <tr>
                <td>Sick To:</td>
                <td>{{ formatDate(sick.date_to) }}</td>
              </tr>
              <tr>
                <td>Sick Days:</td>
                <td>{{ sick.hours }}</td>
              </tr>
              <tr>
                <td>Deducted:</td>
                <td>{{ deductionStatus }}</td>
              </tr>
            </table>
            <router-link :to="{ name: 'sick-dashboard', params: {filter: 'all'} }" class="button is-small is-white">Back to All Sick Days</router-link>
          </div>
          <div class="column is-3">
            <figure class="image">
              <img alt="Sick Days" :src="'/dist/img/icons/sick.svg'">
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref, computed, onMounted} from 'vue';
import { useSickStore } from '../../../stores/sickStore';
import { format } from 'date-fns';

const props = defineProps({
  id: {
    required: true
  }
})

const sickStore = useSickStore();
const sick = computed(() => sickStore.sickDay);
const loading = ref(true);
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'do MMMM yyyy');
}

onMounted(async () => {
  await sickStore.loadSickDay(props.id)
  loading.value = false
})

const deductionStatus = computed(() => sick.value?.deducted ? 'Yes' : 'No');
const statusColour = computed(() => sick.value?.deducted ? 'approved' : 'pending');

</script>
<style scoped>
.table td {
  border-bottom: 1px solid #fff;
}
</style>