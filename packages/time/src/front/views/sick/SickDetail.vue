<template>
  <h1 class="title is-3">Sick Detail</h1>
  <p>Sick Id: {{ sickId }}</p>
</template>
<script>
export default {
  data() {
    return {
      sickId: null
    };
  },
  created() {
    this.sickId = this.$route.params.id;
  }
};
</script>