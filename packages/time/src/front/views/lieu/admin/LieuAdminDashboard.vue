<template>
  <div id="lieu">
    <div class="hero is-lieu">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-2">
            <img :src="'/dist/img/icons/lieu.svg'" alt="Lieu Hours">
          </div>
          <div v-if="lieuAdminStore.lieuAdminDashLoading" class="column">
            Loading...
          </div>
          <div v-else class="column">
            <p class="is-size-3">
              Pending: {{  timeDetails.used  }} hours
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="section">
    <div v-if="lieuAdminStore.lieuHoursPendingLoading" class="columns section">
      <p class="is-size-4">Loading lieu hours...</p>
    </div>
    <div v-else-if="lieuAdminStore.lieuHoursPending" class="columns is-mobile is-multiline">
      <lieuInd v-for="(lieu, index) in lieuAdminStore.lieuHoursPending"
               :key="index"
               :lieu="lieu"
      />
    </div>
    <div v-else>
      <p class="is-size-4 has-text-white">There are no lieu requests yet</p>
    </div>
  </div>
</template>
<script setup>
import {onMounted, computed} from "vue";
import LieuInd from "../../../../front/components/lieu/LieuInd.vue";
import {useLieuAdminStore} from "../../../../stores/admin/lieuAdminStore";

const lieuAdminStore = useLieuAdminStore();
const timeDetails = computed(() => lieuAdminStore.lieuAdminDash);

onMounted(() => {
  lieuAdminStore.loadLieuAdminDash();
  lieuAdminStore.loadLieuHoursPending();
});
</script>

<style scoped>
.section {
  padding: 1rem;
}
</style>