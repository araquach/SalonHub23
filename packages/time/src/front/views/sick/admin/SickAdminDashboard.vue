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
        <div class="navbar is-transparent">
          <div class="navbar-item">
            <router-link :to="{ name: 'sick-create' }" class="button is-small is-white">
              Log Sick
            </router-link>
          </div>
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
                <div class="dropdown-content has-background-sick">
                  <router-link
                      v-for="(team_member, index) in teamStore.teamMembers"
                      :key="index"
                      class="dropdown-item"
                      :to="{ name: 'sick-days-by-staff', params: { staff_id: team_member.staff_id } }"
                      @click="hideDropdown"
                  >
                    {{ team_member.first_name }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="navbar-item">
            <router-link class="button is-small is-outlined is-white" :to="{ name: 'sick-admin-dashboard' }">
              Pending
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="section">
    <div v-if="sickAdminStore.sickDaysPendingLoading" class="columns section">
      <p class="is-size-4">Loading Sick Days...</p>
    </div>
    <div v-else-if="displayedSickDays" class="columns is-mobile is-multiline">
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
import {onMounted, computed, ref} from "vue";
import SickInd from "../../../../front/components/sick/SickInd.vue";
import {useSickAdminStore} from "../../../../stores/admin/sickAdminStore";
import {useTeamStore} from "team/src/stores/teamStore";
import {useRoute} from "vue-router";

const sickAdminStore = useSickAdminStore();
const teamStore = useTeamStore();
const timeDetails = computed(() => sickAdminStore.sickAdminDash);
const isActive = ref(false)
const showPending = ref(true)
const route = useRoute()

const toggleActive = () => {
  isActive.value = !isActive.value;
};

const hideDropdown = () => {
  isActive.value = false;
};

const loadTeamMemberSickDays = async (staff_id) => {
  showPending.value = false;
  await sickAdminStore.loadSickDays(staff_id);
};

const displayedSickDays = computed(() => {
  return showPending.value ? sickAdminStore.sickDaysPending : sickAdminStore.sickDays;
});

const loadSickDaysByRoute = async () => {
  if (route.params.staff_id) {
    await loadTeamMemberSickDays(route.params.staff_id);
  } else {
    showPending.value = true;
  }
};

onMounted(async() => {
  await sickAdminStore.loadSickAdminDash();
  await sickAdminStore.loadSickDaysPending();
  await loadSickDaysByRoute()
});
</script>

<style scoped>
.section {
  padding: 1rem;
}
</style>