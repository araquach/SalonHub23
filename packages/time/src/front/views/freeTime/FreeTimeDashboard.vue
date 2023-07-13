<template>
  <div id="freetime">
    <div class="hero is-free-time">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-2">
            <img :src="'/dist/img/icons/free-time.svg'" alt="Free Time">
          </div>
          <div class="column">
            <p class="is-size-4">Free Time: 30 hours</p>
            <p class="is-size-4">Used Time: 20 hours</p>
            <p class="is-size-3">Remaining: 10 hours</p>
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
      <div v-if="loading" class="columns section">
        <p class="is-size-4">Loading free time...</p>
      </div>
      <div v-else-if="freeTimeStore.freeTimes.length" class="columns is-mobile is-multiline">
        <freeTimeInd v-for="(freeTime, index) in freeTimeStore.freeTimes"
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
import FreeTimeInd from "../../../front/components/freeTime/FreeTimeInd.vue";
import {useFreeTimeStore} from "../../../stores/freeTimeStore";
import {ref} from "vue";

export default {
  components: {FreeTimeInd},

  setup() {
    const freeTimeStore = useFreeTimeStore();
    const loading = ref(true)
    freeTimeStore.loadFreeTimes().then(() => {
      loading.value = false;
    }).catch(error => {
      console.error('Failed to load holiday: ', error);
      // Here you can handle the error in some way, like showing a message to the user
    });
    return {
      freeTimeStore,
      loading
    }
  }
}
</script>
<style scoped>
.section {
  padding: 1rem;
}
</style>