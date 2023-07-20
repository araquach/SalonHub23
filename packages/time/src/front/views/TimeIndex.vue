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
  }
}
</script>