<template>
  <div id="lieu">
    <div class="hero is-lieu">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-2">
            <img :src="'/dist/img/icons/lieu.svg'" alt="Lieu Hours">
          </div>
          <div v-if="lieuStore.lieuDashLoading" class="column">
            Loading...
          </div>
          <div v-else class="column">
            <p class="is-size-3">
              Total Lieu: {{  timeDetails.used  }} hours
              <span v-if="timeDetails.pending" class="is-size-6">({{ timeDetails.pending }} pending)</span>
            </p>
          </div>
        </div>
        <div class="buttons">
          <router-link :to="{ name: 'lieu-create' }" class="button is-small is-white">
            Book Lieu Hours
          </router-link>
          <router-link :to="{ name: 'lieu-dashboard', params: { filter: 'approved' } }"
                       class="button is-white is-outlined is-small">
            Approved Lieu
          </router-link>
          <router-link :to="{ name: 'lieu-dashboard', params: { filter: 'awaiting' } }"
                       class="button is-white is-outlined is-small">
            Awaiting Approval
          </router-link>
          <router-link :to="{ name: 'lieu-dashboard', params: { filter: 'denied' } }"
                       class="button is-white is-outlined is-small">
            Denied Lieu
          </router-link>
          <router-link :to="{ name: 'lieu-dashboard', params: { filter: 'all' } }"
                       class="button is-white is-outlined is-small">
            All Lieu Hours
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="section">
    <div v-if="lieuStore.lieuHoursLoading" class="columns section">
      <p class="is-size-4">Loading lieu hours...</p>
    </div>
    <div v-else-if="lieuStore.lieuHours.length" class="columns is-mobile is-multiline">
      <lieuInd v-for="(lieu, index) in lieuStore.filteredLieuHours"
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
import {watchEffect, onMounted, computed} from "vue";
import {useLieuStore} from "../../../stores/lieuStore";
import LieuInd from "../../../front/components/lieu/LieuInd.vue";

const props = defineProps({
  filter: {
    required: true
  }
})

const lieuStore = useLieuStore();
const timeDetails = computed(() => lieuStore.lieuDash);

const filterMapping = {
  'awaiting': 0,
  'approved': 1,
  'denied': 2,
  'all': 3,
  // add any additional filters you need here
};

watchEffect(() => {
  const newFilter = props.filter;
  if (newFilter in filterMapping) {
    lieuStore.setActiveFilter(filterMapping[newFilter]);
  }
});

onMounted(() => {
  lieuStore.loadLieuDash();
  lieuStore.loadLieuHours();
});
</script>

<style scoped>
.section {
  padding: 1rem;
}
</style>