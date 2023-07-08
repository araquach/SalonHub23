<template>
  <h1 class="title is-3">Sick Dashboard</h1>
  <SickInd/>
</template>
<script>
import {defineComponent} from "vue";
import SickInd from "../../../front/components/sick/SickInd.vue";

export default defineComponent({
  components: {SickInd}
})

</script>