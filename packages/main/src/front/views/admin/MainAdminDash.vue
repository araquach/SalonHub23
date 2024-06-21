<template>
  <div class="dashboard section">
    <div class="columns is-mobile is-multiline section">
      <div
          v-for="cat in store.categories"
          :key="cat.id"
          class="column is-6-mobile is-3-tablet is-3-desktop is-2-widescreen"
      >
        <router-link :to="{ name: `${cat.tag}-admin-dashboard` }">
          <div class="box" :class="'has-background-' + cat.tag">
            <h3 class="title is-5 has-text-white">{{ cat.name }}</h3>
            <figure class="image is-square">
              <img :alt="cat.name" :src="'./dist/img/icons/' + cat.tag + '.svg'" />
            </figure>
            <p>{{ cat.name }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMainDashboardAdminStore } from '../../../stores/admin/mainDashboardAdminStore'
import { useMainStore } from "../../../stores/mainStore";
import {onMounted} from "vue";
import {useTeamStore} from "team/src/stores/teamStore";

const store = useMainDashboardAdminStore()
const mainStore = useMainStore()
const teamStore = useTeamStore()

onMounted(async() => {
  mainStore.changeView('admin');
  await teamStore.loadTeamMembers()
});
</script>