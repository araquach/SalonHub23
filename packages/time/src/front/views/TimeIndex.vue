<template>
  <HeaderTime/>
  <div class="dashboard section">
    <div class="columns is-mobile is-multiline">
      <div v-for="cat in categories" :key="cat.id"  class="column is-6-mobile is-3-tablet is-3-desktop is-2-widescreen">
        <router-link :to="{ name: cat.tag + '-index', params: {filter: cat.filter} }">
          <div class="box" :class="'has-background-' + cat.tag">
            <h3 class="title is-5 has-text-white">{{ cat.cat_name }}</h3>
            <figure class="image is-square">
              <img :alt="cat.name" :src="'/dist/img/icons/' + cat.tag + '.svg'">
            </figure>
            <p>{{ cat.info }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderTime from "../../front/components/HeaderTime.vue";
import {useHolidayStore} from "../../stores/holidayStore";
import {useAuthStore} from "auth/src/stores/authStore";
import {useDashboardStore} from "main/src/stores/dashboardStore";

export default {
  components: {HeaderTime},
  setup() {
    const dashboardStore = useDashboardStore()
    const holidayStore = useHolidayStore();
    const authStore = useAuthStore();
    return {
      authStore: authStore,
      holidayStore: holidayStore,
      user: authStore.user,
      isAdmin: authStore.isAdmin,
      categories: dashboardStore.categories
    };
  },

  // computed: {
  //   ...mapGetters([
  //     'isAdmin',
  //     'sickTotal',
  //     'entitlement',
  //     'holidayTotal',
  //     'lieuTotal',
  //     'freeTimeEntitlement',
  //     'usedFreeTime',
  //     'sickTotal',
  //   ]),
  //
  //   catStyle(key) {
  //     const cat = this.categories.filter(c => c.id === key)
  //     console.log(cat)
  //   }
  // },

  // created() {
  //   this.$store.dispatch('loadCategories')
  //   this.$store.dispatch('loadHolidays')
  //   this.$store.dispatch('loadLieuHours')
  //   this.$store.dispatch('loadSickDays')
  //   this.$store.dispatch('loadFreeTimes')
  // },
}
</script>