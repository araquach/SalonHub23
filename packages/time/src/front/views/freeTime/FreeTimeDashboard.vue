<template>
  <h1 class="title is-3">Free Time Dashboard</h1>
  <FreeTimeInd/>
</template>
<script>
import {defineComponent} from "vue";
import FreeTimeInd from "../../../front/components/freeTime/FreeTimeInd.vue";

export default defineComponent({
  components: {FreeTimeInd}
})

</script>