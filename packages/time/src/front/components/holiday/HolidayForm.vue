<template>
  <form @submit="onSubmit">
    <div>
      <div class="field">
        <BaseInputValidate
            v-model="description"
            name="description"
            label="Description"
            type="text"
        />
      </div>
      <div class="field">
        <BaseDatePickerValidate
            v-model="dateRange"
            name="dateRange"
            label="Date Range"
            :range="true"
            :enable-time-picker="false"
        />
      </div>
      <div v-if="hours_requested">
        <div class="field">
          <p class="is-size-4">Requested: {{ hours_requested }} days</p>
        </div>

        <div class="field">
          <p class="is-size-4">Saturdays: {{ saturday }}</p>
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
import {ref, computed} from 'vue';
import * as yup from 'yup';
import {useForm} from "vee-validate";
import BaseInputValidate from "main/src/front/components/baseFormValidate/BaseInputValidate.vue";
import BaseDatePickerValidate from "main/src/front/components/baseFormValidate/BaseDatePickerValidate.vue"
import {useHolidayStore} from "../../../stores/holidayStore";
import {useAuthStore} from "auth/src/stores/authStore";
import {useRouter} from "vue-router";
import {useTimeStore} from "../../../stores/timeStore";

const props = defineProps({
  id: String,
  holidayProps: Object,
  formType: String
});

const router = useRouter();
const holidayStore = useHolidayStore();
const timeStore = useTimeStore();
const authStore = useAuthStore();

const description = ref(props.holidayProps ? props.holidayProps.description : '');
const dateRange = ref(props.holidayProps && props.holidayProps.request_date_from && props.holidayProps.request_date_to ?
    [new Date(props.holidayProps.request_date_from), new Date(props.holidayProps.request_date_to)] : []
);

const hours_requested = computed(() => countWorkingDays(dateRange.value));
const saturday = computed(() => countSaturdays(dateRange.value));

function getDayKey(date) {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  return days[date.getDay()];
}

function countWorkingDays(dates) {
  let schedule = timeStore.timeDetails.schedule
  if (!dates || dates.length < 2) return 0;

  let count = 0;
  let currentDate = new Date(dates[0]);

  while (currentDate <= dates[1]) {
    const dayKey = getDayKey(currentDate);
    if (schedule[dayKey].am || schedule[dayKey].pm) {
      count++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
}

function countSaturdays(dates) {
  if (!dates || dates.length !== 2) return 0;

  let count = 0;
  let currentDate = new Date(dates[0]);
  const endDate = new Date(dates[1]);

  while (currentDate <= endDate) {
    if (currentDate.getDay() === 6) {
      count++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
}

yup.addMethod(yup.array, 'maxWorkingDays', function (max, message) {
  return this.test('max-working-days', message, function (dates) {
    const { path, createError } = this;
    const count = countWorkingDays(dates);
    if (count > max) {
      return createError({ path, message });
    }
    return true;
  });
});

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    description: yup.string().required().label('Description'),
    dateRange: yup.array().of(yup.date())
        .min(2)
        .test('is-valid-daterange', 'Start date must be before end date', (dates) => dates && dates[0] < dates[1])
        .test('max-saturdays', 'The range cannot contain more than 3 Saturdays', (dates) => countSaturdays(dates) <= 3)
        .test('is-future-date', 'The date range should not be in the past', (dates) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return dates && dates[0] >= today;
        })
        .maxWorkingDays(14, 'The range cannot have more than 14 working days')
        .required().label('Date Range')
  })
});

const onSubmit = handleSubmit((originalValues) => {
  const [request_date_from, request_date_to] = originalValues.dateRange || [];
  const mergedValues = {
    ...originalValues,
    request_date_from,
    request_date_to,
    staff_id: authStore.user.staff_id,
    hours_requested: hours_requested.value,
    saturday: saturday.value
  };

  delete mergedValues.dateRange;

  if (props.formType === 'update') {
    holidayStore.updateHoliday(props.id, mergedValues).then(() => {
      router.push({ name: 'holiday-detail', params: { id: props.id } });
    }).catch((error) => {
      console.error(error);
    });
  } else {
    holidayStore.submitHoliday(mergedValues).then(() => {
      console.log(mergedValues)
      router.push({ name: 'holiday-dashboard', params: { filter: 'all' } });
    }).catch((error) => {
      console.error(error);
    });
  }
});
</script>
