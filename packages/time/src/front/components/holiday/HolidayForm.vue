<template>
  <form v-on:submit.prevent="submitForm">
    <div>
      <div class="field">
        <BaseInput
            v-model="holiday.description"
            label="Description"
            type="text"
        />
      </div>
      <p class="label">Date Range</p>
      <div class="field has-addons">
        <p class="control">
          <VueDatePicker v-model="dateRange" range :enable-time-picker="false"></VueDatePicker>
        </p>
      </div>
      <div v-if="holiday.hours_requested">
        <div class="field">
          <p class="is-size-4">Requested: {{ holiday.hours_requested }} days</p>
        </div>

        <div class="field">
          <p class="is-size-4">Saturdays: {{ holiday.saturday }}</p>
        </div>
      </div>
      <br>
      <div class="field">
        <div class="control">
          <button class="button is-outlined is-white" type="submit">
            {{ formType === 'update' ? 'Update Holiday' : 'Book Holiday' }}
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
<script setup>
import {ref, watch} from 'vue';
import VueDatePicker from "@vuepic/vue-datepicker";
import BaseInput from "main/src/front/components/formBase/BaseInput.vue";
import {useHolidayStore} from "../../../stores/holidayStore";
import {useAuthStore} from "auth/src/stores/authStore";
import {useTimeStore} from "../../../stores/timeStore";
import {useRouter} from "vue-router";

const props = defineProps({
  id: String,
  holidayProps: Object,
  formType: String
});

const router = useRouter();
const holidayStore = useHolidayStore();
const authStore = useAuthStore();
const timeStore = useTimeStore();

let holiday = ref(props.holidayProps || {
  id: null,
  staff_id: authStore.user.staff_id,
  hours_requested: 0,
  request_date_from: null,
  request_date_to: null,
  saturday: 0,
  description: '',
});

let dateRange = ref(holiday.value.request_date_from && holiday.value.request_date_to ?
    [new Date(holiday.value.request_date_from), new Date(holiday.value.request_date_to)] : []
);

watch(dateRange, (newVal) => {
  if (newVal && newVal.length === 2) {
    holiday.value.request_date_from = newVal[0];
    holiday.value.request_date_to = newVal[1];

    const startDate = new Date(holiday.value.request_date_from);
    const endDate = new Date(holiday.value.request_date_to);

    holiday.value.hours_requested = workingDays(startDate, endDate, timeStore.timeDetails.schedule);
    holiday.value.saturday = countSaturdays(startDate, endDate);
  } else if (!newVal || newVal.length === 0) {
    holiday.value.request_date_from = null;
    holiday.value.request_date_to = null;
    holiday.value.hours_requested = 0;
    holiday.value.saturday = 0;
  }
});

watch(holiday, (newVal) => {
  if (newVal.request_date_from && newVal.request_date_to) {
    dateRange.value = [
      new Date(newVal.request_date_from),
      new Date(newVal.request_date_to)
    ];
  }
});

const workingDays = (startDate, endDate, schedule) => {
  let workingDaysCount = 0;
  schedule = timeStore.timeDetails.schedule
  let currentDate = new Date(startDate);
  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  while (currentDate <= endDate) {
    let dayOfWeek = daysOfWeek[currentDate.getDay()];

    if (schedule[dayOfWeek]['am']) {
      workingDaysCount += 0.5;
    }

    if (schedule[dayOfWeek]['pm']) {
      workingDaysCount += 0.5;
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return workingDaysCount;
}

const countSaturdays = (startDate, endDate) => {
  let saturdaysCount = 0;
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (currentDate.getDay() === 6) { // Check if it's Saturday
      saturdaysCount += 1;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return saturdaysCount;
}

const submitForm = () => {
  if (props.formType === 'update') {
    holidayStore.updateHoliday(props.id, holiday.value).then(() => {
      router.push({name: 'holiday-detail', params: {id: props.id}});
    }).catch((error) => {
      console.error(error)
    });
  } else {
    holidayStore.submitHoliday(holiday.value).then(() => {
      router.push({name: 'holiday-dashboard', params: {filter: 'all'}});
    }).catch((error) => {
      console.error(error)
    });
  }
}
</script>
