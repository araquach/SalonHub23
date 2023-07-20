<template>
  <HeaderTime/>
  <router-view/>
</template>

<script>
import HeaderTime from "../../front/components/HeaderTime.vue";
import {useAuthStore} from "auth/src/stores/authStore";
import {useTimeStore} from "../../stores/timeStore";

export default {
  components: {HeaderTime},
  setup() {
    const authStore = useAuthStore();
    const timeStore = useTimeStore();
    timeStore.loadTimeDetails(authStore.user.staff_id)
    return {
      timeStore
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