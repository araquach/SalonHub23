<template>
  <div id="freetime">
    <div class="hero is-free-time">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-2">
            <img :src="'/dist/img/icons/free-time.svg'" alt="Free Time">
          </div>
          <div v-if="timeStore.timeDetailsLoading" class="column">
            <p>Loading...</p>
          </div>
          <div v-else class="column">
            <p class="is-size-4">Free Time: {{ timeStore.timeDetails.free_time_ent }} hours</p>
            <p class="is-size-4">Used Time: {{ timeStore.timeDetails.free_time }} hours</p>
            <p class="is-size-3">Remaining: {{ timeStore.timeDetails.free_time_ent - timeStore.timeDetails.free_time }} hours</p>
          </div>
        </div>
        <div>
          <div class="buttons">
            <router-link :to="{ name: 'free-time-create' }" class="button is-small is-white">
              Book Free Time
            </router-link>
            <router-link :to="{ name: 'free-time-dashboard', params: { filter: 'approved' } }"
                         class="button is-white is-outlined is-small">
              Approved Free Time
            </router-link>
            <router-link :to="{ name: 'free-time-dashboard', params: { filter: 'awaiting' } }"
                         class="button is-white is-outlined is-small">
              Awaiting Approval
            </router-link>
            <router-link :to="{ name: 'free-time-dashboard', params: { filter: 'denied' } }"
                         class="button is-white is-outlined is-small">
              Denied Free Time
            </router-link>
            <router-link :to="{ name: 'free-time-dashboard', params: { filter: 'all' } }"
                         class="button is-white is-outlined is-small">
              All Free Time
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div v-if="freeTimeStore.freeTimesLoading" class="columns section">
        <p class="is-size-4">Loading free time...</p>
      </div>
      <div v-else-if="freeTimeStore.freeTimes.length" class="columns is-mobile is-multiline">
        <freeTimeInd v-for="(freeTime, index) in freeTimeStore.filteredFreeTimes"
                    :key="index"
                    :freeTime="freeTime"
        />
      </div>
      <div v-else>
        <p class="is-size-4 has-text-white">You have no free time requests yet</p>
      </div>
    </div>
  </div>
</template>
<script>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import FreeTimeInd from "../../../front/components/freeTime/FreeTimeInd.vue";
import {useTimeStore} from "../../../stores/timeStore";
import {useFreeTimeStore} from "../../../stores/freeTimeStore";

export default {
  components: {FreeTimeInd},

  setup() {
    const route = useRoute();
    const timeStore = useTimeStore()
    const freeTimeStore = useFreeTimeStore();

    const filterMapping = {
      'awaiting': 0,
      'approved': 1,
      'denied': 2,
      'all': 3,
    };

    watch(() => route.params.filter, newFilter => {
      if (newFilter in filterMapping) {
        freeTimeStore.setActiveFilter(filterMapping[newFilter]);
      }
    }, { immediate: true });

    freeTimeStore.loadFreeTimes()

    return {
      timeStore,
      freeTimeStore
    }
  }
}
</script>
<style scoped>
.section {
  padding: 1rem;
}
</style>