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
  }
}
</script>