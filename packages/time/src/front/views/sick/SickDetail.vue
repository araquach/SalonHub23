<template>
  <div v-if="loading" class="columns section">
    <p class="is-size-4">Loading sick log...</p>
  </div>
  <div v-else-if="sick" class="columns section">
    <div class="column is-9">
      <div :class="statusColour" class="box has-background-sick">
        <div class="columns">
          <div class="column">
            <h2 class="title is-3 has-text-white">Sick Log</h2>
            <h3 v-if="mainStore.selectedView === 'admin'" class="title is-3">{{ sick.first_name }} {{
                sick.last_name
              }}</h3>
            <h3 class="title is-4">{{ sick.description }}</h3>
            <table class="table has-background-sick has-text-white is-size-5">
              <tr>
                <td>Log made:</td>
                <td>{{ formatDate(sick.created_at) }}</td>
              </tr>
              <tr>
                <td>Sick From:</td>
                <td>{{ formatDate(sick.date_from) }}</td>
              </tr>
              <tr>
                <td>Sick To:</td>
                <td>{{ formatDate(sick.date_to) }}</td>
              </tr>
              <tr>
                <td>Sick Days:</td>
                <td>{{ sick.hours }}</td>
              </tr>
              <tr>
                <td>Deducted:</td>
                <td>{{ deductionStatus }}</td>
              </tr>
            </table>
            <form v-if="mainStore.selectedView === 'admin'" @submit="onSubmit">
              <label class="label">Deduct:</label>
              <div class="buttons has-addons">
                <button class="button is-small is-approved" @click="deducted = 1">Yes</button>
                <button class="button is-small is-denied" @click="deducted = 0">No</button>
              </div>
            </form>
            <br>
            <div class="buttons">
              <router-link v-if="sick.deducted === 0" :to="{name: 'sick-admin-update', params: {id: props.id}}"
                           class="button is-white is-small is-outlined">
                Edit Sick
              </router-link>
              <router-link :to="backLinkRoute" class="button is-small is-white is-outlined">
                Back
              </router-link>
            </div>
          </div>
          <div class="column is-3">
            <figure class="image">
              <img alt="Sick Days" :src="'/dist/img/icons/sick.svg'">
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref, computed, onMounted, watchEffect} from 'vue';
import {useSickStore} from '../../../stores/sickStore';
import {format} from 'date-fns';
import {useSickAdminStore} from "../../../stores/admin/sickAdminStore";
import {useRouter} from "vue-router";
import {useMainStore} from "main/src/stores/mainStore";
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
const sickStore = useSickStore();
const sickAdminStore = useSickAdminStore()
const sick = computed(() => sickStore.sickDay);
const loading = ref(true);
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'do MMMM yyyy');
}

watchEffect(() => {
  if (props.initialValues) {
    resetForm({values: props.initialValues});
  }
});

const {handleSubmit, defineField, resetForm} = useForm({
  validationSchema: toTypedSchema(
      object({
        deducted: number().default(0)
      })
  ),
  initialValues: props.initialValues ?? {
    deducted: 0
  }
})

const [deducted] = defineField('deducted')

const onSubmit = handleSubmit(values => {
  sickAdminStore.deductSickDay(props.id, values).then(() => {
  }).catch((error) => {
    console.error(error);
  });
  router.push({name: 'sick-admin-dashboard'});
})

const backLinkRoute = computed(() => {
  if (mainStore.selectedView === 'admin') {
    return { name: 'sick-admin-dashboard' };
  } else {
    return { name: 'sick-dashboard', params: { filter: 'all' }};
  }
});

onMounted(async () => {
  await sickStore.loadSickDay(props.id)
  loading.value = false
  const initialValues = {
    approved: sickStore.sickDay.deducted,
  };
  resetForm({values: initialValues});
})

const deductionStatus = computed(() => sick.value?.deducted ? 'Yes' : 'No');
const statusColour = computed(() => sick.value?.deducted ? 'approved' : 'pending');

</script>
<style scoped>
.table td {
  border-bottom: 1px solid #fff;
}
</style>