<template>
  <h1 class="title is-3">Holiday Dashboard</h1>
  <HolidayInd/>
</template>
<script>
import {defineComponent} from "vue";
import HolidayInd from "../../../front/components/holiday/HolidayInd.vue";

export default defineComponent({
  components: {HolidayInd}
})

</script>