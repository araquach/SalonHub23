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
    <FreeTimeInd/>
  </div>
</template>
<script>
import {defineComponent} from "vue";
import FreeTimeInd from "../../../front/components/freeTime/FreeTimeInd.vue";

export default defineComponent({
  components: {FreeTimeInd}
})

</script>