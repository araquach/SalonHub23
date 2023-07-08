<template>
  <h1 class="title is-3">Lieu Dashboard</h1>
  <LieuInd/>
</template>
<script>
import {defineComponent} from "vue";
import LieuInd from "../../../front/components/lieu/LieuInd.vue";

export default defineComponent({
  components: {LieuInd}
})

</script>