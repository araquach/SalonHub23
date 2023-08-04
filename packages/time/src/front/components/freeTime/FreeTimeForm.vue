<template>
  <form v-on:submit.prevent="submitForm">
    <div>
      <div class="field">
        <BaseInput
            v-model="freeTime.description"
            label="Description"
            type="text"
        />
      </div>
      <div class="field">
        <VueDatePicker v-model="freeTime.date_regarding" :enable-time-picker="false"></VueDatePicker>
      </div>
      <div class="field">
        <BaseInput
            v-model.number="freeTime.free_time_hours"
            label="Time Requested"
            type="number"
        />
      </div>
      <br>
      <div class="field">
        <div class="control">
          <button class="button is-outlined is-white" type="submit">
            {{ formType === 'update' ? 'Update' : 'Submit' }}
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
<script setup>
import {ref} from 'vue';
import { useFreeTimeStore } from '../../../stores/freeTimeStore';
import { useAuthStore } from 'auth/src/stores/authStore';
import BaseInput from 'main/src/front/components/formBase/BaseInput.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: String,
  freeTimeProps: Object,
  formType: String
})

const router = useRouter();
const freeTimeStore = useFreeTimeStore();
const authStore = useAuthStore();

let freeTime = ref(props.freeTimeProps || {
  id: null,
  staff_id: authStore.user.staff_id,
  free_time_hours: 0,
  description: '',
  date_regarding: null,
});

const submitForm = () => {
  if (props.formType === 'update') {
    freeTimeStore.updateFreeTime(props.id, freeTime.value).then(() => {
      router.push({name: 'free-time-detail', params: {id: props.id}});
    }).catch((error) => {
      console.log(error)
    });
  } else {
    freeTimeStore.submitFreeTime(freeTime.value).then(() => {
      router.push({name: 'free-time-dashboard', params: {filter: 'all'}})
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>