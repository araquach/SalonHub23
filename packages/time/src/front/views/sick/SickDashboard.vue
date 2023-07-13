<template>
  <div id="sick">
    <div class="hero is-sick">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-2">
            <img :src="'/dist/img/icons/sick.svg'" alt="Sick">
          </div>
          <div class="column">
            <p class="is-size-3">Total Sick: 3 days</p>
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
    <div v-if="sickStore.sickDays.length" class="columns is-mobile is-multiline">
      <sickInd v-for="(sick, index) in sickStore.sickDays"
                  :key="index"
                  :sick="sick"
      />
    </div>
    <div v-else>
      <p class="is-size-4 has-text-white">There are no holiday bookings yet</p>
    </div>
  </div>
</template>
<script>
import SickInd from "../../../front/components/sick/SickInd.vue";
import {useSickStore} from "../../../stores/sickStore";

export default {
  components: {SickInd},

  setup() {
    const sickStore = useSickStore();
    sickStore.loadSickDays();
    return {
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