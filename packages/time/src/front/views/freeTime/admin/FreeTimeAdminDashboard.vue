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
                <div class="dropdown-content has-background-free-time">
                  <router-link
                      v-for="(team_member, index) in teamStore.teamMembers"
                      :key="index"
                      class="dropdown-item"
                      :to="{ name: 'free-time-by-staff', params: { staff_id: team_member.staff_id } }"
                      @click="hideDropdown"
                  >
                    {{ team_member.first_name }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="navbar-item">
            <router-link class="button is-small is-outlined is-white" :to="{ name: 'free-time-admin-dashboard' }">
              Pending
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="section">
    <div v-if="freeTimeAdminStore.freeTimeHoursPendingLoading || freeTimeAdminStore.freeTimeHoursLoading" class="columns section">
      <p class="is-size-4">Loading free time...</p>
    </div>
    <div v-else-if="displayedFreeTimeHours" class="columns is-mobile is-multiline">
      <FreeTimeInd v-for="(freeTime, index) in displayedFreeTimeHours"
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
import {onMounted, computed, ref, watch} from "vue";
import FreeTimeInd from "../../../../front/components/freeTime/FreeTimeInd.vue";
import {useFreeTimeAdminStore} from "../../../../stores/admin/freeTimeAdminStore";
import {useTeamStore} from "team/src/stores/teamStore";
import {useRoute} from "vue-router";
import {useMainStore} from "main/src/stores/mainStore";

const mainStore = useMainStore()
const freeTimeAdminStore = useFreeTimeAdminStore();
const teamStore = useTeamStore();
const timeDetails = computed(() => freeTimeAdminStore.freeTimeAdminDash);
const isActive = ref(false)
const showPending = ref(true)
const route = useRoute()

const toggleActive = () => {
  isActive.value = !isActive.value;
};

const hideDropdown = () => {
  isActive.value = false;
};

const loadTeamMemberFreeTime = async (staff_id) => {
  showPending.value = false;
  await freeTimeAdminStore.loadFreeTimeHours(staff_id);
};

const displayedFreeTimeHours = computed(() => {
  return showPending.value ? freeTimeAdminStore.freeTimeHoursPending : freeTimeAdminStore.freeTimeHours;
});

const loadFreeTimeByRoute = async () => {
  if (route.params.staff_id) {
    await loadTeamMemberFreeTime(route.params.staff_id);
  } else {
    showPending.value = true;
  }
};

watch(route, loadFreeTimeByRoute, {immediate: true});

onMounted(async () => {
  await teamStore.loadTeamMembers(mainStore.salon)
  await freeTimeAdminStore.loadFreeTimeAdminDash();
  await freeTimeAdminStore.loadFreeTimeHoursPending();
  await loadFreeTimeByRoute();
});
</script>

<style scoped>
.section {
  padding: 1rem;
}
</style>