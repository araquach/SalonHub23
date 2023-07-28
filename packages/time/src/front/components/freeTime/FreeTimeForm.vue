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
            Submit
          </button>
        </div>
      </div>
    </div>
    <div v-if="submitStatus">
      <p class="is-size-4 has-text-white">Free Time request submitted</p>
    </div>
  </form>
</template>
<script setup>
import {computed, reactive} from 'vue';
import { useFreeTimeStore } from '../../../stores/freeTimeStore';
import { useAuthStore } from 'auth/src/stores/authStore';
import BaseInput from 'main/src/front/components/formBase/BaseInput.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import { useRouter } from 'vue-router';

const freeTimeStore = useFreeTimeStore();
const authStore = useAuthStore();
const router = useRouter();

let freeTime = reactive({
  staff_id: authStore.user.staff_id,
  free_time_hours: 0,
  description: '',
  date_regarding: null,
});

const submitStatus = computed(() => freeTimeStore.submitStatus);

async function submitForm() {
  try {
    await freeTimeStore.submitFreeTime(freeTime);
    router.push({ name: 'free-time-dashboard', params: { filter: 'all' } });
  } catch (error) {
    console.error(error);
  }
}
</script>