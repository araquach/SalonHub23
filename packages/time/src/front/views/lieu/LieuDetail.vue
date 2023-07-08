<template>
  <h1 class="title is-3">Lieu Detail</h1>
  <p>Lieu Id: {{ lieuId }}</p>
</template>
<script>
export default {
  data() {
    return {
      lieuId: null
    };
  },
  created() {
    this.lieuId = this.$route.params.id;
  }
};
</script>