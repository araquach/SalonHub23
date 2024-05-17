<template>
  <div v-if="loading" class="columns section">
    <p class="is-size-4">Loading lieu...</p>
  </div>
  <div v-else-if="lieu" class="columns section">
    <div class="column is-9">
      <div :class="statusColour" class="box has-background-lieu">
        <div class="columns">
          <div class="column">
            <h2 class="title is-3 has-text-white">Lieu Request</h2>
            <h3 class="title is-4">{{ lieu.description }}</h3>
            <table class="table has-background-lieu has-text-white is-size-5">
              <tr>
                <td>Request made:</td>
                <td>{{ formatDate(lieu.created_at) }}</td>
              </tr>
              <tr>
                <td>Date Regarding:</td>
                <td>{{ formatDate(lieu.request_date) }}</td>
              </tr>
              <tr>
                <td>Number of hours:</td>
                <td>{{ lieu.hours }}</td>
              </tr>
              <tr>
                <td>Approved:</td>
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
              <router-link v-if="lieu.approved === 0" :to="{name: 'lieu-update', params: {id: props.id}}" class="button is-white is-small">
                Edit Lieu
              </router-link>
              <router-link v-if="mainStore.selectedView !== 'admin'" :to="{ name: 'lieu-dashboard', params: {filter: 'all'} }" class="button is-small is-white">
                Back to all Lieu Requests
              </router-link>
              <router-link v-else :to="{ name: 'lieu-admin-dashboard' }" class="button is-small is-white">
                Back to pending lieu
              </router-link>
            </div>
          </div>
          <div class="column is-3">
            <figure class="image">
              <img alt="LieuHours" :src="'/dist/img/icons/lieu.svg'">
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useLieuStore} from "../../../stores/lieuStore";
import {useLieuAdminStore} from "../../../stores/admin/lieuAdminStore";
import {computed, onMounted, ref, watchEffect} from "vue";
import {useForm} from 'vee-validate';
import {number, object} from "yup";
import {toTypedSchema} from "@vee-validate/yup";
import { format } from "date-fns";
import {useRouter} from "vue-router";
import {useMainStore} from "main/src/stores/mainStore";

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
const mainStore = useMainStore()
const lieuStore = useLieuStore();
const lieuAdminStore = useLieuAdminStore()
const lieu = computed(() => lieuStore.lieuHour);
const loading = ref(true);
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'do MMMM yyyy');
}

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

// Computed properties
const approvalStatus = computed(() => {
  if (lieu.value?.approved === 2) {
    return "Denied"
  } else if (lieu.value?.approved === 1) {
    return "Approved"
  } else {
    return "Pending"
  }
});

const statusColour = computed(() => {
  if (lieu.value?.approved === 1) {
    return 'approved'
  } else if (lieu.value?.approved === 2) {
    return 'denied'
  } else return 'pending'
});

watchEffect(() => {
  if (props.initialValues) {
    resetForm({values: props.initialValues});
  }
});

const onSubmit = handleSubmit(values => {
  lieuAdminStore.approveLieu(props.id, values).then(() => {
  }).catch((error) => {
    console.error(error);
  });
  router.push({name: 'lieu-admin-dashboard', params: {filter: 'all'}});
})

onMounted(async () => {
  await lieuStore.loadLieuHour(props.id)
  loading.value = false
  const initialValues = {
    approved: lieuStore.lieuHour.approved,
  };
  resetForm({values: initialValues});
})
</script>

<style scoped>
.table td {
  border-bottom: 1px solid #fff;
}
</style>