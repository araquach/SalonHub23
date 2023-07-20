<template>
  <div id="sick">
    <div class="hero is-sick">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-2">
            <img :src="'/dist/img/icons/sick.svg'" alt="Sick">
          </div>
          <div v-if="timeStore.timeDetailsLoading" class="column">
            <p>Loading...</p>
          </div>
          <div v-else class="column">
            <p class="is-size-3">Total Sick: {{ timeStore.timeDetails.sick_days }} days</p>
          </div>
        </div>
        <div class="buttons">
          <router-link :to="{ name: 'sick-dashboard', params: { filter: 'deducted' } }"
                       class="button is-white is-outlined is-small">
            Deducted
          </router-link>
          <router-link :to="{ name: 'sick-dashboard', params: { filter: 'awaiting' } }"
                       class="button is-white is-outlined is-small">
            Awaiting
          </router-link>
          <router-link :to="{ name: 'sick-dashboard', params: { filter: 'all' } }"
                       class="button is-white is-outlined is-small">
            All Sick
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="section">
    <div v-if="sickStore.sickDaysLoading" class="columns section">
      <p class="is-size-4">Loading sick days...</p>
    </div>
    <div v-else-if="sickStore.sickDays.length" class="columns is-mobile is-multiline">
      <sickInd v-for="(sick, index) in sickStore.sickDays"
                  :key="index"
                  :sick="sick"
      />
    </div>
    <div v-else>
      <p class="is-size-4 has-text-white">There are no sick logs yet</p>
    </div>
  </div>
</template>
<script>
import SickInd from "../../../front/components/sick/SickInd.vue";
import {useTimeStore} from "../../../stores/timeStore";
import {useSickStore} from "../../../stores/sickStore";

export default {
  components: {SickInd},

  setup() {
    const timeStore = useTimeStore()
    const sickStore = useSickStore();
    sickStore.loadSickDays();
    return {
      timeStore,
      sickStore
    }
  }
}
</script>

<style scoped>
.section {
  padding: 1rem;
}
</style>