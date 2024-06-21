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
          <div class="navbar-item">
            <div class="dropdown" :class="{ 'is-active': isActive }">
              <div class="dropdown-trigger">
                <button @click="toggleActive" class="button is-small is-white is-outlined" aria-haspopup="true"
                        aria-controls="dropdown-menu">
                  Team Member
                  <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content has-background-holiday">
                  <router-link
                      v-for="(team_member, index) in teamStore.teamMembers"
                      :key="index"
                      class="dropdown-item"
                      :to="{ name: 'holidays-by-staff', params: { staff_id: team_member.staff_id } }"
                      @click="hideDropdown"
                  >
                    {{ team_member.first_name }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="navbar-item">
            <router-link class="button is-small is-outlined is-white" :to="{ name: 'holiday-admin-dashboard' }">
              Pending
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div v-if="holidayAdminStore.holidaysPendingLoading || holidayAdminStore.holidaysLoading" class="columns section">
        <p class="is-size-4">Loading holidays...</p>
      </div>
      <div v-else-if="displayedHolidays" class="columns is-mobile is-multiline">
        <holidayInd v-for="(holiday, index) in displayedHolidays"
                    :key="index"
                    :holiday="holiday"
        />
      </div>
      <div v-else>
        <p class="is-size-4 has-text-white">There are no holidays to display</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import {useHolidayAdminStore} from "../../../../stores/admin/holidayAdminStore";
import HolidayInd from "../../../../front/components/holiday/HolidayInd.vue";
import {useTeamStore} from "team/src/stores/teamStore";
import {useMainStore} from "main/src/stores/mainStore";
import {useRoute} from 'vue-router';

const mainStore = useMainStore();
const holidayAdminStore = useHolidayAdminStore();
const teamStore = useTeamStore();
const timeDetails = computed(() => holidayAdminStore.holidayAdminDash);
const isActive = ref(false);
const showPending = ref(true);
const route = useRoute();

const toggleActive = () => {
  isActive.value = !isActive.value;
};

const hideDropdown = () => {
  isActive.value = false;
};

const loadTeamMemberHolidays = async (staff_id) => {
  showPending.value = false;
  await holidayAdminStore.loadHolidays(staff_id);
};

const displayedHolidays = computed(() => {
  return showPending.value ? holidayAdminStore.holidaysPending : holidayAdminStore.holidays;
});

const loadHolidaysByRoute = async () => {
  if (route.params.staff_id) {
    await loadTeamMemberHolidays(route.params.staff_id);
  } else {
    showPending.value = true;
  }
};

watch(route, loadHolidaysByRoute, {immediate: true});

onMounted(async () => {
  await teamStore.loadTeamMembers(mainStore.salon);
  await holidayAdminStore.loadHolidayAdminDash();
  await holidayAdminStore.loadHolidaysPending();
  await loadHolidaysByRoute();
});

</script>

<style scoped>
.section {
  padding: 1rem;
}
</style>
