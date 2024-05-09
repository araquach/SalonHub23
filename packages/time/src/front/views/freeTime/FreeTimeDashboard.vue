<template>
  <div id="freetime">
    <div class="hero is-free-time">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-2">
            <img :src="'/dist/img/icons/free-time.svg'" alt="Free Time">
          </div>
          <div v-if="freeTimeStore.freeTimeDashLoading" class="column">
            <p>Loading...</p>
          </div>
          <div v-else class="column">
            <p class="is-size-4">Free Time: {{ timeDetails.entitlement }} hours</p>
            <p class="is-size-4">
              Used Time: {{ timeDetails.used }} hours
              <span v-if="timeDetails.pending" class="is-size-6">({{ timeDetails.total_pending }} pending)</span>
            </p>
            <p class="is-size-3">
              Remaining: {{ timeDetails.remaining }} hours
              <span v-if="timeDetails.remaining_pending" class="is-size-6">
                ({{ timeDetails.remaining_pending }})
              </span>
            </p>
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
<script setup>
import {computed, onMounted, watchEffect} from 'vue';
import FreeTimeInd from "../../../front/components/freeTime/FreeTimeInd.vue";
import { useFreeTimeStore } from "../../../stores/freeTimeStore";

const props = defineProps({
  filter: {
    required: true
  }
})

const freeTimeStore = useFreeTimeStore();
const timeDetails = computed(() => freeTimeStore.freeTimeDash);

const filterMapping = {
  'awaiting': 0,
  'approved': 1,
  'denied': 2,
  'all': 3,
};

onMounted(() => {
  freeTimeStore.loadFreeTimeDash();
  freeTimeStore.loadFreeTimes();
});

watchEffect(() => {
  const newFilter = props.filter;
  if (newFilter in filterMapping) {
    freeTimeStore.setActiveFilter(filterMapping[newFilter]);
  }
});

</script>

<style scoped>
.section {
  padding: 1rem;
}
</style>