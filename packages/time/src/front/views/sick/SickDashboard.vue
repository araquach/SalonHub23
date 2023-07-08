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
                       class="button is-white is-outlined is-small"
                       tag="button">
            Deducted
          </router-link>
          <router-link :to="{ name: 'sick-dashboard', params: { filter: 'awaiting' } }"
                       class="button is-white is-outlined is-small"
                       tag="button">
            Awaiting
          </router-link>
          <router-link :to="{ name: 'sick-dashboard', params: { filter: 'all' } }"
                       class="button is-white is-outlined is-small"
                       tag="button">
            All Sick
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <SickInd/>
</template>
<script>
import {defineComponent} from "vue";
import SickInd from "../../../front/components/sick/SickInd.vue";

export default defineComponent({
  components: {SickInd}
})

</script>