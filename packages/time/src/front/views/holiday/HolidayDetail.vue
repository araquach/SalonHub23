<template>
  <div v-if="loading" class="columns section">
    <p class="is-size-4">Loading holidays...</p>
  </div>
  <div v-else-if="holiday" class="columns section">
    <div class="column is-9">
      <div :class="statusColour" class="box has-background-holiday">
        <div class="columns">
          <div class="column">
            <h2 class="title is-3 has-text-white">Holiday Booking</h2>
            <h3 v-if="mainStore.selectedView === 'admin'" class="title is-3">{{ holiday.first_name }} {{ holiday.last_name }}</h3>
            <h3 class="title is-4">{{ holiday.description }}</h3>
            <table class="table has-background-holiday has-text-white is-size-5">
              <tr>
                <td>Request made:</td>
                <td>{{ formatDate(holiday.created_at) }}</td>
              </tr>
              <tr>
                <td>Date From:</td>
                <td>{{ formatDate(holiday.date_from) }}</td>
              </tr>
              <tr>
                <td>Date To:</td>
                <td>{{ formatDate(holiday.date_to) }}</td>
              </tr>
              <tr>
                <td>Number of days:</td>
                <td>{{ holiday.requested }}</td>
              </tr>
              <tr>
                <td>Number of Saturdays:</td>
                <td>{{ holiday.saturday }}</td>
              </tr>
              <tr>
                <td>Approval Status:</td>
                <td>{{ approvalStatus }}</td>
              </tr>
            </table>
            <form v-if="mainStore.selectedView === 'admin'" @submit="onSubmit">
              <div class="buttons has-addons">
                <button class="button is-small is-approved" @click="approved = 1">Approve</button>
                <button class="button is-small is-denied" @click="approved = 2">Deny</button>
              </div>
            </form>
            <br>
            <div class="buttons">
              <router-link v-if="holiday.approved === 0" :to="{name: 'holiday-update', params: {id: props.id}}" class="button is-white is-small">
                Edit Holiday
              </router-link>
              <router-link v-if="mainStore.selectedView !== 'admin'" :to="{ name: 'holiday-dashboard', params: {filter: 'all'} }" class="button is-small is-white">
                Back to all Holidays
              </router-link>
              <router-link v-else :to="{ name: 'holiday-admin-dashboard'}" class="button is-small is-white">
                Back to pending
              </router-link>
            </div>
            </div>
          <div class="column is-3">
            <figure class="image">
              <img :src="'/dist/img/icons/holiday.svg'" alt="Holiday">
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useMainStore} from "main/src/stores/mainStore"
import {useHolidayStore} from "../../../stores/holidayStore";
import {useHolidayAdminStore} from "../../../stores/admin/holidayAdminStore";
import {computed, ref, onMounted, watchEffect} from "vue";
import {useForm} from 'vee-validate';
import {number, object} from "yup";
import {toTypedSchema} from "@vee-validate/yup";
import {format} from "date-fns"
import {useRouter} from "vue-router";

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  initialValues: {
    type: {},
    default: null
  }
})

const router = useRouter();
const mainStore = useMainStore();
const holidayStore = useHolidayStore();
const holidayAdminStore = useHolidayAdminStore()
const holiday = computed(() => holidayStore.holiday)
const loading = ref(true)
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'do MMMM yyyy');
}

const approvalStatus = computed(() => {
  if (holiday.value?.approved === 2) {
    return "Denied"
  } else if (holiday.value?.approved === 1) {
    return "Approved"
  } else {
    return "Pending"
  }
})

const statusColour = computed(() => {
  if (holiday.value?.approved === 1) {
    return 'approved'
  } else if (holiday.value?.approved === 2) {
    return 'denied'
  } else return 'pending'
})

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

watchEffect(() => {
  if (props.initialValues) {
    resetForm({values: props.initialValues});
  }
});

const onSubmit = handleSubmit(values => {
  holidayAdminStore.approveHoliday(props.id, values).then(() => {
  }).catch((error) => {
    console.error(error);
  });
  router.push({ name: 'holiday-admin-dashboard' });
})

onMounted(async () => {
  await holidayStore.loadHoliday(props.id)
  loading.value = false
  const initialValues = {
    approved: holidayStore.holiday.approved,
  };
  resetForm({values: initialValues});
})

</script>

<style scoped>
.table td {
  border-bottom: 1px solid #fff;
}
</style>