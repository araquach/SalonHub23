<template>
  <form v-on:submit.prevent="submitForm">
    <div>
      <div class="field">
        <BaseInput
            v-model="lieu.description"
            label="Description"
            type="text"
        />
      </div>
      <p class="label">Date Regarding</p>
      <div class="field has-addons">
        <p class="control">
          <VueDatePicker v-model="lieu.date_regarding" :enable-time-picker="false"></VueDatePicker>
        </p>
      </div>

      <div class="field">
        <BaseInput
            v-model.number="lieu.lieu_hours"
            label="Lieu Hours"
            type="number"
        />
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

    <div v-if="submitStatus">
      <p class="is-size-4 has-text-white">Lieu request submitted</p>
    </div>
  </form>
</template>
<script setup>
import {ref, computed, defineProps} from "vue";
import {useLieuStore} from "../../../stores/lieuStore";
import {useAuthStore} from "auth/src/stores/authStore";
import BaseInput from "main/src/front/components/formBase/BaseInput.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import {useRouter} from 'vue-router';

// Define the props
const props = defineProps({
  lieuProps: Object,
  formType: String
});

const lieuStore = useLieuStore();
const authStore = useAuthStore();
const router = useRouter();

// Initialize 'lieu' with 'lieuProp' if it's provided
const lieu = ref(props.lieuProps || {
  staff_id: authStore.user.staff_id,
  lieu_hours: 0,
  description: '',
  date_regarding: null
});

const submitStatus = computed(() => lieuStore.submitStatus);

// The method has been converted to a regular function
const submitForm = async () => {
  try {
    await lieuStore.submitLieu(lieu.value).then(() => {
      router.push({name: 'lieu-dashboard', params: {filter: 'all'}});
    });
  } catch (error) {
    // handle the error here
    console.error(error);
  }
};
</script>
