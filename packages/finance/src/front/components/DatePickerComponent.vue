<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <button @click="toggleDatePicker" class="button is-small is-success">
          {{ !showDatePicker ? 'Date Picker' : 'Date Range' }}
        </button>
      </div>
      <div v-if="!showDatePicker" class="level-item">
        <div class="buttons">
          <button @click="updateDateRange(range)" v-for="range in dateRanges" :key="range.id" class="button is-small">
            {{ range.text }}
          </button>
        </div>
      </div>
      <div v-if="showDatePicker" class="level-item">
        <div class="field has-addons">
          <p class="control">
            <VueDatePicker v-model="startDate" placeholder="Start Date" :enable-time-picker="false"
                           :format="formattedStartDate"></VueDatePicker>
          </p>
        </div>
      </div>
      <div v-if="showDatePicker" class="level-item">
        <div class="field has-addons">
          <p class="control">
            <VueDatePicker v-model="endDate" placeholder="End Date" :enable-time-picker="false"
                           :format="formattedEndDate"></VueDatePicker>
          </p>
        </div>
      </div>
      <div v-if="showDatePicker" class="level-item">
        <button @click="updateData" v-if="startDate && endDate" class="button is-small">Update</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import VueDatePicker from "@vuepic/vue-datepicker";
import { useMainStore } from "../../stores/main";
import {
  format,
  subMonths,
  startOfMonth,
  endOfMonth,
  subYears,
  startOfYear,
  endOfYear
} from "date-fns";

const mainStore = useMainStore();
let showDatePicker = ref(false);
let dateRanges = ref([
  { id: 1, text: 'All Time' },
  { id: 2, text: 'Last Year' },
  { id: 3, text: 'Rolling Year' },
  { id: 4, text: 'Year to date' }
]);
let startDate = ref(mainStore.startDate);
let endDate = ref(mainStore.endDate);

const toggleDatePicker = () => {
  showDatePicker.value = !showDatePicker.value;
}

const formattedStartDate = () => {
  return format(new Date(startDate.value), "dd/MM/yyyy");
}

const formattedEndDate = () => {
  return format(new Date(endDate.value), "dd/MM/yyyy");
}

const updateDateRange = (range) => {
  const now = new Date();

  if (range.id === 1)  {
    mainStore.startDate = "2017-07-01";
    mainStore.endDate = format(endOfMonth(subMonths(now, 1)), "yyyy-MM-dd");
  }
  if (range.id === 2)  {
    mainStore.startDate = format(startOfYear(subYears(now, 1)), "yyyy-MM-dd");
    mainStore.endDate = format(endOfYear(subYears(now, 1)), "yyyy-MM-dd");
  }
  if (range.id === 3)  {
    mainStore.startDate = format(startOfMonth(subMonths(now, 12)), "yyyy-MM-dd");
    mainStore.endDate = format(endOfMonth(subMonths(now, 1)), "yyyy-MM-dd");
  }
  if (range.id === 4)  {
    mainStore.startDate = format(startOfYear(now), "yyyy-MM-dd");
    mainStore.endDate = format(endOfMonth(subMonths(now, 1)), "yyyy-MM-dd");
  }
  emit("date-change");
}

const updateData = () => {
  mainStore.startDate = format(new Date(startDate.value), "yyyy-MM-dd");
  mainStore.endDate = format(new Date(endDate.value), "yyyy-MM-dd");
  emit("date-change");
}

// Define emits function
const emit = defineEmits(['date-change']);
</script>


<style scoped>
.level {
    height: 2rem;
}
</style>
