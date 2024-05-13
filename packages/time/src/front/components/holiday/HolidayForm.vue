<template>
  <form v-if="!holidayStore.holidayLoading" @submit="onSubmit">
    <div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <input class="input" :class="{'is-danger': errors.description }" v-model="description"
                 v-bind="descriptionAttrs" type="text">
        </div>
        <span class="help is-danger">{{ errors.description }}</span>
      </div>
      <div class="field">
        <div class="label">Date Range</div>
        <div class="control">
          <VueDatePicker
              v-model="dateRange"
              v-bind="dateRangeAttrs"
              :enable-time-picker="false"
              :class="{'is-danger': errors.dateRange}"
              range
          ></VueDatePicker>
        </div>
        <span class="help is-danger">{{ errors.dateRange }}</span>
      </div>
      <div v-if="requested">
        <div class="field">
          <p class="is-size-4">Requested: {{ requested }} days</p>
          <span class="help is-danger">{{ errors.requested }}</span>
        </div>

        <div class="field">
          <p class="is-size-4">Saturday: {{ saturday }}</p>
          <span class="help is-danger">{{ errors.saturday }}</span>
        </div>
      </div>
      <br>
      <div class="field">
        <div class="control">
          <button class="button is-outlined is-white">Submit</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import {useForm} from 'vee-validate';
import VueDatePicker from "@vuepic/vue-datepicker";
import {object, string, array, number, date, addMethod} from "yup";
import {toTypedSchema} from '@vee-validate/yup';
import {onMounted, watch, watchEffect} from "vue";
import {useHolidayStore} from "../../../stores/holidayStore";
import {useAuthStore} from "auth/src/stores/authStore";
import {useTimeStore} from "../../../stores/timeStore";
import {useRouter} from "vue-router";

const props = defineProps({
  id: {
    type: String
  },
  initialValues: {
    type: Object,
    default: null,
  },
  formType: {
    type: String,
    required: true
  }
});

const router = useRouter();
const holidayStore = useHolidayStore();
const timeStore = useTimeStore();
const authStore = useAuthStore();

function countWorkingDays(dates) {
  let schedule = timeStore.timeDetails.schedule
  if (!schedule || !dates || dates.length < 2) return 0;

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

addMethod(array, 'maxWorkingDays', function (max, message) {
  return this.test('max-working-days', message, function (dates) {
    const {path, createError} = this;
    const count = countWorkingDays(dates);
    if (count > max) {
      return createError({path, message});
    }
    return true;
  });
});

const {handleSubmit, defineField, errors, setValues, resetForm} = useForm({
  validationSchema: toTypedSchema(
      object({
        description: string().required().default(''),
        dateRange: array().of(date().required()).min(2).max(2).required().default([]).test('is-valid-daterange', 'Start date must be before end date', (dates) => dates && dates[0] <= dates[1])
            .test('is-within-current-year', 'The date range must be within the current year', (dates) => {
              const currentYear = (new Date()).getFullYear();
              return (
                  dates &&
                  dates[0] instanceof Date && !isNaN(dates[0]) && dates[0].getFullYear() === currentYear
                  && dates[1] instanceof Date && !isNaN(dates[1]) && dates[1].getFullYear() === currentYear
              );
            })
            .test('max-saturdays', 'The range cannot contain more than 3 Saturdays', (dates) => countSaturdays(dates) <= 3)
            .test('is-future-date', 'The date range should not be in the past', (dates) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return dates && dates[0] >= today;
            }),
        requested: number().default(0)
            .max(14, 'The range cannot have more than 14 working days')
            .max(holidayStore.holidayDash.remaining_pending,'You don\'t have enough holidays'),
        saturday: number().default(0)
            .max(holidayStore.holidayDash.sat_pending, 'You don\'t have enough Saturdays')
      }),
  ),
  initialValues: props.initialValues ?? {
    description: '',
    dateRange: [],
    requested: 0,
    saturday: 0
  },
});

watchEffect(() => {
  if (props.initialValues) {
    resetForm({values: props.initialValues});
  }
});

function getDayKey(date) {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  return days[date.getDay()];
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

const [description, descriptionAttrs] = defineField('description')
const [dateRange, dateRangeAttrs] = defineField('dateRange')
const [requested] = defineField('requested')
const [saturday] = defineField('saturday')

watch(dateRange, (newDateRange) => {
  // Compute the new day count
  const newDayCount = countWorkingDays(newDateRange);
  const saturdayCount = countSaturdays(newDateRange)
  // Set the new day count which will update the form state
  setValues({requested: newDayCount});
  setValues({saturday: saturdayCount})
});

const onSubmit = handleSubmit(values => {
  const [date_from, date_to] = values.dateRange || [];
  const formattedValues = {
    ...values,
    date_from,
    date_to,
    staff_id: authStore.user.staff_id,
  }
  delete formattedValues.dateRange;
  if (props.formType === 'create') {
    holidayStore.submitHoliday(formattedValues).then(() => {
      router.push({name: 'holiday-dashboard', params: {filter: 'all'}});
    }).catch((error) => {
      console.error(error);
    });
  } else {
    holidayStore.updateHoliday(props.id, formattedValues).then(() => {
      router.push({name: 'holiday-detail', params: {id: props.id}});
    }).catch((error) => {
      console.error(error);
    });
  }
});

onMounted(async () => {
  await holidayStore.loadHolidayDash();
  await holidayStore.loadHolidays();
  if (props.formType === 'update') {
    const initialValues = {
      description: holidayStore.holiday.description,
      dateRange: [
        new Date(holidayStore.holiday.date_from),
        new Date(holidayStore.holiday.date_to)
      ]
    };
    resetForm({values: initialValues});
  }
});

</script>