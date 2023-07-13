<template>
  <div v-if="loading" class="columns section">
    <p class="is-size-4">Loading sick log...</p>
  </div>
  <div v-else-if="sick" class="columns section">
    <div class="column is-9">
      <div :class="'approved'" class="box has-background-sick">
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
                <td>{{ formatDate(sick.sick_from) }}</td>
              </tr>
              <tr>
                <td>Sick To:</td>
                <td>{{ formatDate(sick.sick_to) }}</td>
              </tr>
              <tr>
                <td>Sick Days:</td>
                <td>{{ sick.sick_hours }}</td>
              </tr>
              <tr>
                <td>Deducted:</td>
                <td>{{ sick.deducted }}</td>
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
<script>
import {useSickStore} from "../../../stores/sickStore";
import {useRoute} from "vue-router";
import {computed, ref} from "vue";
import { format } from "date-fns"

export default {
  setup() {
    const route = useRoute()
    const sickStore = useSickStore();
    const sick = computed(() => sickStore.sickDay)
    const id = route.params.id
    const loading = ref(true)
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return format(date, 'do MMMM yyyy');
    }

    sickStore.loadSickDay(id).then(() => {
      loading.value = false;  // Once the data has loaded, we set loading to false
    }).catch(error => {
      console.error('Failed to load holiday: ', error);
      // Here you can handle the error in some way, like showing a message to the user
    });

    return {
      sickStore,
      sick,
      formatDate,
      loading
    }
  }
};
</script>
<style scoped>
.table td {
  border-bottom: 1px solid #fff;
}
</style>