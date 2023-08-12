<template>
  <div class="columns section">
    <div class="column is-7">
      <div class="box has-background-holiday">
        <div class="columns">
          <div class="column">
            <h3 class="title is-4 has-text-white">Book a Holiday</h3>
          </div>
          <div class="column is-3">
            <figure class="image">
              <img alt="Holidays" :src="'/dist/img/icons/holiday.svg'">
            </figure>
          </div>
        </div>
        <HolidayForm v-if="!loading" :holidayProps="holiday" :formType="'update'" :id="id"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import HolidayForm from "../../components/holiday/HolidayForm.vue";
import {useHolidayStore} from "../../../stores/holidayStore";
import {computed, ref, onMounted} from "vue";

const props = defineProps({
  id: {
    required: true
  }
})

const holidayStore = useHolidayStore();
const holiday = computed(() => holidayStore.holiday);
const loading = ref(true)

onMounted(async () => {
  try {
    await holidayStore.loadHoliday(props.id);
    loading.value = false;
  } catch (error) {
    console.error('Failed to load holiday: ', error);
  }
})
</script>