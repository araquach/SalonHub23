<template>
  <div id="lieu">
    <div class="hero is-lieu">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-2">
            <img :src="'/dist/img/icons/lieu.svg'" alt="Lieu Hours">
          </div>
          <div class="column">
            <p class="is-size-3">Total Lieu: 10 hours</p>
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
    <div v-if="loading" class="columns section">
      <p class="is-size-4">Loading lieu hours...</p>
    </div>
    <div v-else-if="lieuStore.lieuHours.length" class="columns is-mobile is-multiline">
      <lieuInd v-for="(lieu, index) in lieuStore.lieuHours"
                  :key="index"
                  :lieu="lieu"
      />
    </div>
    <div v-else>
      <p class="is-size-4 has-text-white">There are no lieu requests yet</p>
    </div>
  </div>
</template>
<script>
import LieuInd from "../../../front/components/lieu/LieuInd.vue";
import {useLieuStore} from "../../../stores/lieuStore";
import {ref} from "vue";

export default {
  components: {LieuInd},

  setup() {
    const lieuStore = useLieuStore();
   const  loading = ref(true)
    lieuStore.loadLieuHours().then(() => {
      loading.value = false;
    }).catch(error => {
      console.error('Failed to load holiday: ', error);
      // Here you can handle the error in some way, like showing a message to the user
    });
    return {
      lieuStore,
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