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
            <p class="is-size-4">
              <strong>Lieu: {{ timeDetails.pending }} pending approval</strong>
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
                <div class="dropdown-content has-background-lieu">
                  <router-link
                      v-for="(team_member, index) in teamStore.teamMembers"
                      :key="index"
                      class="dropdown-item"
                      :to="{ name: 'lieu-hours-by-staff', params: { staff_id: team_member.staff_id } }"
                      @click="hideDropdown"
                  >
                    {{ team_member.first_name }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="navbar-item">
            <router-link class="button is-small is-outlined is-white" :to="{ name: 'lieu-admin-dashboard' }">
              Pending
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="section">
    <div v-if="lieuAdminStore.lieuHoursPendingLoading || lieuAdminStore.lieuHoursLoading" class="columns section">
      <p class="is-size-4">Loading lieu hours...</p>
    </div>
    <div v-else-if="displayedLieuHours" class="columns is-mobile is-multiline">
      <lieuInd v-for="(lieu, index) in displayedLieuHours"
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
import {onMounted, computed, ref, watch} from "vue";
import LieuInd from "../../../../front/components/lieu/LieuInd.vue";
import {useLieuAdminStore} from "../../../../stores/admin/lieuAdminStore";
import {useMainStore} from "main/src/stores/mainStore";
import {useTeamStore} from "team/src/stores/teamStore";
import {useRoute} from "vue-router";

const mainStore = useMainStore()
const lieuAdminStore = useLieuAdminStore();
const teamStore = useTeamStore();
const timeDetails = computed(() => lieuAdminStore.lieuAdminDash);
const isActive = ref(false)
const showPending = ref(true)
const route = useRoute()

const toggleActive = () => {
  isActive.value = !isActive.value;
};

const hideDropdown = () => {
  isActive.value = false;
};

const loadTeamMemberLieuHours = async (staff_id) => {
  showPending.value = false;
  await lieuAdminStore.loadLieuHours(staff_id);
};

const displayedLieuHours = computed(() => {
  return showPending.value ? lieuAdminStore.lieuHoursPending : lieuAdminStore.lieuHours;
});

const loadLieuHoursByRoute = async () => {
  if (route.params.staff_id) {
    await loadTeamMemberLieuHours(route.params.staff_id);
  } else {
    showPending.value = true;
  }
};

watch(route, loadLieuHoursByRoute, {immediate: true});

onMounted(async () => {
  await teamStore.loadTeamMembers(mainStore.salon)
  await lieuAdminStore.loadLieuAdminDash();
  await lieuAdminStore.loadLieuHoursPending();
  await loadLieuHoursByRoute()
});
</script>

<style scoped>
.section {
  padding: 1rem;
}
</style>