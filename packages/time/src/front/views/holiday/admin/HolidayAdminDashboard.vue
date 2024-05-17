<template>
  <div id="holiday">
    <div class="hero is-holiday">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-2">
            <img :src="'/dist/img/icons/holiday.svg'" alt="Holidays">
          </div>
          <div v-if="holidayAdminStore.holidayAdminDashLoading" class="column">
            <p>Loading...</p>
          </div>
          <div v-else class="column">
            <p class="is-size-4"><strong>Holidays: {{ timeDetails.pending }} pending approval</strong></p>
          </div>
        </div>
        <div class="navbar is-transparent">
          <div class="buttons">
            <div class="buttons">
<!--              <router-link :to="{ name: 'holiday-create' }" class="button is-white is-small">-->
<!--                Book a Holiday-->
<!--              </router-link>-->
<!--              <router-link :to="{ name: 'holiday-dashboard', params: { filter: 'approved' } }"-->
<!--                           class="button is-white is-outlined is-small">-->
<!--                Approved Holidays-->
<!--              </router-link>-->
<!--              <router-link :to="{ name: 'holiday-dashboard', params: { filter: 'awaiting' } }"-->
<!--                           class="button is-white is-outlined is-small">-->
<!--                Awaiting Approval-->
<!--              </router-link>-->
<!--              <router-link :to="{ name: 'holiday-dashboard', params: { filter: 'denied' } }"-->
<!--                           class="button is-white is-outlined is-small">-->
<!--                Denied Holidays-->
<!--              </router-link>-->
<!--              <router-link :to="{ name: 'holiday-dashboard', params: {filter: 'all', id: null} }"-->
<!--                           class="button is-white is-outlined is-small">-->
<!--                All Holidays-->
<!--              </router-link>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div v-if="holidayAdminStore.holidaysPendingLoading" class="columns section">
        <p class="is-size-4">Loading holidays...</p>
      </div>
      <div v-else-if="holidayAdminStore.holidaysPending.length" class="columns is-mobile is-multiline">
        <holidayInd v-for="(holiday, index) in holidayAdminStore.holidaysPending"
                    :key="index"
                    :holiday="holiday"
        />
      </div>
      <div v-else>
        <p class="is-size-4 has-text-white">There are no pending holidays</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import {computed, onMounted} from 'vue';
import {useHolidayAdminStore} from "../../../../stores/admin/holidayAdminStore";
import HolidayInd from "../../../../front/components/holiday/HolidayInd.vue";

const holidayAdminStore = useHolidayAdminStore();
const timeDetails = computed(() => holidayAdminStore.holidayAdminDash);

onMounted(() => {
  holidayAdminStore.loadHolidayAdminDash();
  holidayAdminStore.loadHolidaysPending();
})

</script>

<style scoped>
.section {
  padding: 1rem;
}
</style>