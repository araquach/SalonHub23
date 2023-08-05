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
  </form>
</template>
<script setup>
import {ref} from "vue";
import {useLieuStore} from "../../../stores/lieuStore";
import {useAuthStore} from "auth/src/stores/authStore";
import BaseInput from "main/src/front/components/formBase/BaseInput.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import {useRouter} from 'vue-router';

const props = defineProps({
  id: String,
  lieuProps: Object,
  formType: String
});

const lieuStore = useLieuStore();
const authStore = useAuthStore();
const router = useRouter();

// Initialize 'lieu' with 'lieuProp' if it's provided
const lieu = ref(props.lieuProps || {
  id: null,
  staff_id: authStore.user.staff_id,
  lieu_hours: 0,
  description: '',
  date_regarding: null
});

const submitForm = () => {
  if (props.formType === 'update') {
     lieuStore.updateLieu(props.id, lieu.value).then(() => {
      router.push({name: 'lieu-detail', params: {id: props.id}});
    }).catch((error) => {
      console.error(error)
     });
  } else {
    lieuStore.submitLieu(lieu.value).then(() => {
      router.push({ name: 'lieu-dashboard', params: {filter: 'all'}});
    }).catch((error) => {
      console.error(error)
    });
  }
};
</script>
