<template>
  <div id="free-time">
    <div class="hero is-free-time">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-2">
            <img :src="'/dist/img/icons/free-time.svg'" alt="Free Time">
          </div>
          <div v-if="freeTimeAdminStore.freeTimeAdminDashLoading" class="column">
            Loading...
          </div>
          <div v-else class="column">
            <p class="is-size-4">
              <strong>Free Time: {{ timeDetails.pending }} pending approval</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="section">
    <div v-if="freeTimeAdminStore.freeTimeHoursPendingLoading" class="columns section">
      <p class="is-size-4">Loading free time requests...</p>
    </div>
    <div v-else-if="freeTimeAdminStore.freeTimeHoursPending" class="columns is-mobile is-multiline">
      <FreeTimeInd v-for="(freeTime, index) in freeTimeAdminStore.freeTimeHoursPending"
               :key="index"
               :freeTime="freeTime"
      />
    </div>
    <div v-else>
      <p class="is-size-4 has-text-white">There are no free time requests yet</p>
    </div>
  </div>
</template>
<script setup>
import {onMounted, computed} from "vue";
import FreeTimeInd from "../../../../front/components/freeTime/FreeTimeInd.vue";
import {useFreeTimeAdminStore} from "../../../../stores/admin/freeTimeAdminStore";

const freeTimeAdminStore = useFreeTimeAdminStore();
const timeDetails = computed(() => freeTimeAdminStore.freeTimeAdminDash);

onMounted(() => {
  freeTimeAdminStore.loadFreeTimeAdminDash();
  freeTimeAdminStore.loadFreeTimeHoursPending();
});
</script>

<style scoped>
.section {
  padding: 1rem;
}
</style>