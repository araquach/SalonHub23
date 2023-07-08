<template>
  <h1 class="title is-3">Holiday Detail</h1>
  <p>Holiday Id: {{ holidayId }}</p>
</template>
<script>
export default {
  data() {
    return {
      holidayId: null
    };
  },
  created() {
    this.holidayId = this.$route.params.id;
  }
};
</script>