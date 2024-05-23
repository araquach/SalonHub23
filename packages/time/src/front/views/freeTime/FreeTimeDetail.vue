<template>
  <div v-if="loading" class="columns section">
    <p class="is-size-4">Loading free time...</p>
  </div>
  <div v-else-if="freeTime" class="columns section">
    <div class="column is-9">
      <div :class="statusColour" class="box has-background-free-time">
        <div class="columns">
          <div class="column">
            <h2 class="title is-3 has-text-white">Free Time Booking</h2>
            <h3 v-if="mainStore.selectedView === 'admin'" class="title is-3">{{ freeTime.first_name }} {{ freeTime.last_name }}</h3>
            <h3 class="title is-4">{{ freeTime.description }}</h3>
            <table class="table has-background-free-time has-text-white is-size-5">
              <tr>
                <td>Date Booked:</td>
                <td>{{ formatDate(freeTime.created_at) }}</td>
              </tr>
              <tr>
                <td>Date Requested:</td>
                <td>{{ formatDate(freeTime.request_date) }}</td>
              </tr>
              <tr>
                <td>Number of hours:</td>
                <td>{{ freeTime.hours }}</td>
              </tr>
              <tr>
                <td>Approval Status:</td>
                <td>{{ approvalStatus }}</td>
              </tr>
            </table>
            <form v-if="mainStore.selectedView === 'admin'" @submit="onSubmit">
              <label class="label">Approval Status</label>
              <div class="buttons has-addons">
                <button class="button is-small is-approved" @click="approved = 1">Approve</button>
                <button class="button is-small is-denied" @click="approved = 2">Deny</button>
              </div>
            </form>
            <br>
            <div class="buttons">
              <router-link v-if="freeTime.approved === 0" :to="{name: 'free-time-update', params: { id: props.id }}" class="button is-white is-small">
                Edit Free Time
              </router-link>
              <router-link v-if="mainStore.selectedView !== 'admin'" :to="{ name: 'free-time-dashboard', params: {filter: 'all'} }" class="button is-small is-white">
                Back to All Free Time
              </router-link>
              <router-link v-else :to="{ name: 'free-time-admin-dashboard' }" class="button is-small is-white">
                Back to pending Free Time
              </router-link>
            </div>
          </div>
          <div class="column is-3">
            <figure class="image">
              <img alt="Free Time" :src="'/dist/img/icons/free-time.svg'">
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref, computed, onMounted, watchEffect} from 'vue';
import {useMainStore} from "main/src/stores/mainStore";
import { useFreeTimeStore } from '../../../stores/freeTimeStore';
import {useFreeTimeAdminStore} from "../../../stores/admin/freeTimeAdminStore";
import { format } from 'date-fns';
import {useRouter} from "vue-router";
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/yup";
import {number, object} from "yup";

const props = defineProps({
  id: {
    required: true
  },
  initialValues: {
    type: {},
    default: null
  }
})

const router = useRouter();
const mainStore = useMainStore();
const freeTimeStore = useFreeTimeStore();
const freeTimeAdminStore = useFreeTimeAdminStore()
const freeTime = computed(() => freeTimeStore.freeTime);
const loading = ref(true);
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'do MMMM yyyy');
};

const {handleSubmit, defineField, resetForm} = useForm ({
  validationSchema: toTypedSchema(
      object({
        approved: number().default(0)
      })
  ),
  initialValues: props.initialValues ?? {
    approved: 0
  }
})

const [approved] = defineField('approved')

const approvalStatus = computed(() => {
  if (freeTime.value.approved === 2) {
    return "Denied"
  } else if (freeTime.value.approved === 1) {
    return "Approved"
  } else {
    return "Pending"
  }
});

const statusColour = computed(() => {
  if (freeTime.value.approved === 1) {
    return 'approved'
  } else if (freeTime.value.approved === 2) {
    return 'denied'
  } else return 'pending'
});

watchEffect(() => {
  if (props.initialValues) {
    resetForm({values: props.initialValues});
  }
});

const onSubmit = handleSubmit(values => {
  freeTimeAdminStore.approveFreeTime(props.id, values).then(() => {
  }).catch((error) => {
    console.error(error);
  });
  router.push({name: 'free-time-admin-dashboard' });
})

onMounted(async () => {
  await freeTimeStore.loadFreeTime(props.id)
  loading.value = false
  const initialValues = {
    approved: freeTimeStore.freeTime.approved,
  };
  resetForm({values: initialValues});
})
</script>

<style scoped>
.table td {
  border-bottom: 1px solid #fff;
}
</style>