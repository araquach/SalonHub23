<template>
  <div id="lieu">
    <div class="hero is-lieu">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-3">
            <img :src="'/dist/img/icons/lieu.svg'" alt="Lieu Hours" width="200">
          </div>
          <div class="column">
            <p class="is-size-3">Total Lieu: 10 hours</p>
          </div>
        </div>
        <div class="buttons">
          <router-link :to="{ name: 'lieu-create' }" class="button is-small">
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
  <LieuInd/>
</template>
<script>
import {defineComponent} from "vue";
import LieuInd from "../../../front/components/lieu/LieuInd.vue";

export default defineComponent({
  components: {LieuInd}
})

</script>