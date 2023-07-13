<template>
  <div v-if="loading" class="columns section">
    <p class="is-size-4">Loading lieu...</p>
  </div>
  <div v-else-if="lieu" class="columns section">
    <div class="column is-9">
      <div :class="'pending'" class="box has-background-lieu">
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
                <td>{{ lieu.approved }}</td>
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
<script>
import {useLieuStore} from "../../../stores/lieuStore";
import {useRoute} from "vue-router";
import {computed, ref} from "vue";
import { format } from "date-fns"

export default {
  setup() {
    const route = useRoute()
    const lieuStore = useLieuStore();
    const lieu = computed(() => lieuStore.lieuHour)
    const id = route.params.id
    const loading = ref(true)
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return format(date, 'do MMMM yyyy');
    }

    lieuStore.loadLieuHour(id).then(() => {
      loading.value = false;  // Once the data has loaded, we set loading to false
    }).catch(error => {
      console.error('Failed to load holiday: ', error);
      // Here you can handle the error in some way, like showing a message to the user
    });

    return {
      lieuStore,
      lieu,
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