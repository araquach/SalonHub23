<template>
  <form v-if="!lieuStore.lieuHoursLoading" @submit="onSubmit">
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
        <div class="control">
          <button class="button is-outlined is-white" type="submit">
            {{ formType === 'update' ? 'Update Lieu' : 'Add/Redeem Lieu' }}
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
<script setup>
import {useForm} from 'vee-validate';
import VueDatePicker from "@vuepic/vue-datepicker";
import {object, string, number, date} from "yup";
import {toTypedSchema} from '@vee-validate/yup';
import {onMounted, watchEffect} from "vue";
import {useLieuStore} from "../../../stores/lieuStore";
import {useAuthStore} from "auth/src/stores/authStore";
import {useRouter} from 'vue-router';

const props = defineProps({
  id: {
    type: String,
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
const lieuStore = useLieuStore();
const authStore = useAuthStore();

const {handleSubmit, defineField, errors, resetForm} = useForm({
  validationSchema: toTypedSchema(
      object({
        description: string().required().default(''),
        request_date: date().required().default({}),
        hours: number().required()
      })
  ),
  initialValues: props.initialValues ?? {
    description: '',
    request_date: {},
    hours: 0
  }
})

watchEffect(() => {
  if (props.initialValues) {
    resetForm({values: props.initialValues});
  }
});

const [description, descriptionAttrs] = defineField('description')
const [request_date, request_dateAttrs] = defineField('request_date')
const [hours, hoursAttrs] = defineField('hours')

const onSubmit = handleSubmit(values => {
  const formattedValues = {
    ...values,
    staff_id: authStore.user.staff_id,
  }
  if (props.formType === 'create') {
    lieuStore.submitLieu(formattedValues).then(() => {
      router.push({name: 'lieu-dashboard', params: {filter: 'all'}});
    }).catch((error) => {
      console.error(error);
    });
  } else {
    console.log(formattedValues)
    lieuStore.updateLieu(props.id, formattedValues).then(() => {
      router.push({name: 'lieu-detail', params: {id: props.id}});
    }).catch((error) => {
      console.error(error);
    });
  }
});

onMounted(async () => {
  if (props.formType === 'update') {
    const initialValues = {
      description: lieuStore.lieuHour.description,
      request_date: lieuStore.lieuHour.request_date,
      hours: lieuStore.lieuHour.hours
    };
    resetForm({values: initialValues});
  }
});
</script>
