<template>
  <HeaderTime/>
  <router-view/>
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