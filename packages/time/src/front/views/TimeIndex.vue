<template>
  <HeaderTime/>
  <router-view/>
</template>

<script setup>
import HeaderTime from "../../front/components/HeaderTime.vue";
import {useAuthStore} from "auth/src/stores/authStore";
import {useTimeStore} from "../../stores/timeStore";
import {onMounted} from "vue";

const authStore = useAuthStore();
const timeStore = useTimeStore();
onMounted(() => {
  timeStore.loadTimeDetails(authStore.user.staff_id)
})

defineExpose({
  timeStore
});
</script>
