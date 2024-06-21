<template>
  <form v-if="!freeTimeStore.freeTimeLoading" @submit="onSubmit">
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
        <div class="label">Request Date</div>
        <div class="control">
          <VueDatePicker
              v-model="request_date"
              v-bind="request_dateAttrs"
              :enable-time-picker="false"
              :class="{'is-danger': errors.request_date}"
          ></VueDatePicker>
        </div>
        <span class="help is-danger">{{ errors.request_date }}</span>
      </div>
      <div class="field">
        <label class="label">Time Requested</label>
        <div class="control">
          <input class="input" :class="{'is-danger': errors.hours }" v-model="hours"
                 v-bind="hoursAttrs" type="number">
        </div>
        <span class="help is-danger">{{ errors.hours }}</span>
      </div>
      <br>
      <div class="field">
        <div class="control buttons">
          <button class="button is-outlined is-white" type="submit">
            {{ formType === 'update' ? 'Update' : 'Submit' }}
          </button>
          <router-link :to="backLinkRoute" class="button is-white is-outlined">
            Back
          </router-link>
        </div>
      </div>
    </div>
  </form>
</template>
<script setup>
import {useForm} from 'vee-validate';
import VueDatePicker from '@vuepic/vue-datepicker';
import {object, string, number, date} from "yup";
import {toTypedSchema} from '@vee-validate/yup';
import {computed, onMounted} from "vue";
import { useFreeTimeStore } from '../../../stores/freeTimeStore';
import { useAuthStore } from 'auth/src/stores/authStore';
import {useRouter} from "vue-router";
import {useMainStore} from "main/src/stores/mainStore";

const props = defineProps({
  id: {
    type: String
  },
  formType: {
    type: String,
    required: true
  }
})

const router = useRouter();
const freeTimeStore = useFreeTimeStore();
const authStore = useAuthStore();
const mainStore = useMainStore();

const {handleSubmit, defineField, errors, resetForm} = useForm({
  validationSchema: toTypedSchema(
      object({
        description: string().required().default(''),
        request_date: date().required().default({}),
        hours: number().required().default(0)
      })
  ),
  initialValues: {
    description: '',
    request_date: {},
    hours: 0
  }
})

const [description, descriptionAttrs] = defineField('description')
const [request_date, request_dateAttrs] = defineField('request_date')
const [hours, hoursAttrs] = defineField('hours')

const backLinkRoute = computed(() => {
  if (mainStore.selectedView === 'admin') {
    return { name: 'free-time-admin-dashboard' };
  } else {
    return { name: 'free-time-dashboard', params: { filter: 'all' }};
  }
});

const onSubmit = handleSubmit(values => {
  const formattedValues = {
    ...values,
    staff_id: authStore.user.staff_id,
  }
  if (props.formType === 'create') {
    freeTimeStore.submitFreeTime(formattedValues).then(() => {
      router.push({name: 'free-time-dashboard', params: {filter: 'all'}});
    }).catch((error) => {
      console.error(error);
    });
  } else {
    freeTimeStore.updateFreeTime(props.id, formattedValues).then(() => {
      router.push({name: 'free-time-detail', params: {id: props.id}});
    }).catch((error) => {
      console.error(error);
    });
  }
});

onMounted(async () => {
  if (props.formType === 'update') {
    const initialValues = {
      description: freeTimeStore.freeTime.description,
      request_date: freeTimeStore.freeTime.request_date,
      hours: freeTimeStore.freeTime.hours
    };
    resetForm({values: initialValues});
  }
});
</script>