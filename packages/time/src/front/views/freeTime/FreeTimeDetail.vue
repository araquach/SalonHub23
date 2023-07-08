<template>
  <h1 class="title is-3">Free Time Detail</h1>
  <p>Free Time Id: {{ freeTimeId }}</p>
</template>
<script>
export default {
  data() {
    return {
      freeTimeId: null
    };
  },
  created() {
    this.freeTimeId = this.$route.params.id;
  }
};
</script>