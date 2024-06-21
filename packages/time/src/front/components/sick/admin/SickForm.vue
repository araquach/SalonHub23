<template>
  <form v-if="!sickStore.sickDayLoading" @submit="onSubmit">
    <div>
      <div v-if="props.formType === 'create'" class="field">
        <label class="label">Team Member</label>
        <div class="control">
          <div class="select">
            <select v-model="teamMember" v-bind="teamMemberAttrs">
              <option selected value="">Select Stylist</option>
              <option v-for="tm in teamStore.teamMembers" :key="tm.id" :value="tm">{{ tm.first_name }} {{ tm.last_name }}</option>
            </select>
          </div>
          <span class="help is-danger">{{ errors.teamMember }}</span>
        </div>
      </div>
      <div v-else>
        <h2 class="title is-4 mb-5">{{ sickStore.sickDay.first_name }} {{ sickStore.sickDay.last_name }}</h2>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <input class="input" :class="{'is-danger': errors.description }" v-model="description"
                 v-bind="descriptionAttrs" type="text">
        </div>
        <span class="help is-danger">{{ errors.description }}</span>
      </div>
      <div class="field">
        <div class="label">Date Range</div>
        <div class="control">
          <VueDatePicker
              v-model="dateRange"
              v-bind="dateRangeAttrs"
              :enable-time-picker="false"
              :class="{'is-danger': errors.dateRange}"
              range
          ></VueDatePicker>
        </div>
        <span class="help is-danger">{{ errors.dateRange }}</span>
      </div>
      <div class="field">
        <label class="label">Sick Time</label>
        <div class="control">
          <input class="input" :class="{'is-danger': errors.hours }" v-model="hours"
                 v-bind="hoursAttrs" type="number">
        </div>
        <span class="help is-danger">{{ errors.hours }}</span>
      </div>
      <div class="field">
        <label class="label">Deduct?</label>
        <div class="buttons has-addons">
          <button class="button is-small is-approved" @click="deducted = 1">Yes</button>
          <button class="button is-small is-denied" @click="deducted = 0">No</button>
        </div>
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
import {useForm} from 'vee-validate';
import VueDatePicker from '@vuepic/vue-datepicker';
import {object, string, number, date, array} from "yup";
import {toTypedSchema} from '@vee-validate/yup';
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {useSickAdminStore} from "../../../../stores/admin/sickAdminStore";
import {useSickStore} from "../../../../stores/sickStore";
import {useTeamStore} from "team/src/stores/teamStore";

const props = defineProps({
  id: {
    type: String
  },
  formType: {
    type: String,
    required: true
  }
})

const router = useRouter();
const teamStore = useTeamStore()
const sickStore = useSickStore()
const sickAdminStore = useSickAdminStore();

const {handleSubmit, defineField, errors, resetForm} = useForm({
  validationSchema: toTypedSchema(
      object({
        teamMember: object().required().default({}),
        description: string().required().default(''),
        dateRange: array().of(date().required()).min(2).max(2).required().default([]).test('is-valid-daterange', 'Start date must be before end date', (dates) => dates && dates[0] <= dates[1]),
        hours: number().required().default(0),
        deducted: number().default(0)
      })
  ),
  initialValues: {
    teamMember: '',
    description: '',
    dateRange: [],
    hours: 0,
    deducted: 0
  }
})

const [teamMember, teamMemberAttrs] = defineField('teamMember')
const [description, descriptionAttrs] = defineField('description')
const [dateRange, dateRangeAttrs] = defineField('dateRange')
const [hours, hoursAttrs] = defineField('hours')
const [deducted] = defineField('deducted')

const onSubmit = handleSubmit(values => {
  const [date_from, date_to] = values.dateRange || [];
  const staff_id = Number(teamMember.value.staff_id)
  const formattedValues = {
    ...values,
    date_from,
    date_to,
    staff_id
  }
  delete formattedValues.dateRange;
  delete formattedValues.teamMember;
  if (props.formType === 'create') {
    sickAdminStore.submitSick(formattedValues).then(() => {
      router.push({name: 'sick-admin-dashboard'});
    }).catch((error) => {
      console.error(error);
    });
  } else {
    sickAdminStore.updateSick(props.id, formattedValues).then(() => {
      router.push({name: 'sick-detail', params: {id: props.id}});
    }).catch((error) => {
      console.error(error);
    });
  }
});

onMounted(async () => {
  if (props.formType === 'update') {
    const initialValues = {
      teamMember: sickStore.sickDay.team_member,
      description: sickStore.sickDay.description,
      dateRange: [
        new Date(sickStore.sickDay.date_from),
        new Date(sickStore.sickDay.date_to)
      ],
      hours: sickStore.sickDay.hours,
      deducted: sickStore.sickDay.deducted
    };
    resetForm({values: initialValues});
  }
});
</script>
