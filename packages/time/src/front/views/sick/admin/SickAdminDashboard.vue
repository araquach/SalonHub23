<template>
  <div id="sick">
    <div class="hero is-sick">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-2">
            <img :src="'/dist/img/icons/sick.svg'" alt="Sick Days">
          </div>
          <div v-if="sickAdminStore.sickAdminDashLoading" class="column">
            Loading...
          </div>
          <div v-else class="column">
            <p class="is-size-4">
              <strong>Sick Days: {{ timeDetails.pending }} pending deduction</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="section">
    <div v-if="sickAdminStore.sickDaysPendingLoading" class="columns section">
      <p class="is-size-4">Loading Sick Days...</p>
    </div>
    <div v-else-if="sickAdminStore.sickDaysPending" class="columns is-mobile is-multiline">
      <SickInd v-for="(sick, index) in sickAdminStore.sickDaysPending"
               :key="index"
               :sick="sick"
      />
    </div>
    <div v-else>
      <p class="is-size-4 has-text-white">There are no Sick Days pending</p>
    </div>
  </div>
</template>
<script setup>
import {onMounted, computed} from "vue";
import SickInd from "../../../../front/components/sick/SickInd.vue";
import {useSickAdminStore} from "../../../../stores/admin/sickAdminStore";

const sickAdminStore = useSickAdminStore();
const timeDetails = computed(() => sickAdminStore.sickAdminDash);

onMounted(() => {
  sickAdminStore.loadSickAdminDash();
  sickAdminStore.loadSickDaysPending();
});
</script>

<style scoped>
.section {
  padding: 1rem;
}
</style>