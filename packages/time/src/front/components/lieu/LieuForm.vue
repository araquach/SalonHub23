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
        <div class="control buttons">
          <button class="button is-outlined is-white" type="submit">
            {{ formType === 'update' ? 'Update Lieu' : 'Add/Redeem Lieu' }}
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
import VueDatePicker from "@vuepic/vue-datepicker";
import {object, string, number, date} from "yup";
import {toTypedSchema} from '@vee-validate/yup';
import {computed, onMounted} from "vue";
import {useLieuStore} from "../../../stores/lieuStore";
import {useAuthStore} from "auth/src/stores/authStore";
import {useRouter} from 'vue-router';
import {useMainStore} from "main/src/stores/mainStore";

const props = defineProps({
  id: {
    type: String,
  },
  formType: {
    type: String,
    required: true
  }
});

const router = useRouter();
const lieuStore = useLieuStore();
const authStore = useAuthStore();
const mainStore = useMainStore();

const backLinkRoute = computed(() => {
  if (mainStore.selectedView === 'admin') {
    return { name: 'lieu-admin-dashboard' };
  } else {
    return { name: 'lieu-dashboard', params: { filter: 'all' }};
  }
});

const {handleSubmit, defineField, errors, resetForm} = useForm({
  validationSchema: toTypedSchema(
      object({
        description: string().required().default(''),
        request_date: date().required().default({}),
        hours: number().required()
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
      hours: lieuStore.lieuHour.hours,
      deducted: lieuStore.lieuHour.deducted
    };
    resetForm({values: initialValues});
  }
});
</script>
