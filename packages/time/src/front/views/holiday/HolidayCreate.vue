<template>
  <div class="columns section">
    <div class="column is-7">
      <div class="box has-background-holiday">
        <div class="columns">
          <div class="column">
            <h3 class="title is-4 has-text-white">Book a Holiday</h3>
          </div>
          <div class="column is-3">
            <figure class="image">
              <img alt="Holidays" :src="'/dist/img/icons/holiday.svg'">
            </figure>
          </div>
        </div>
        <form v-on:submit.prevent="submitForm">
          <div>
            <p class="label">Date From</p>
            <div class="field has-addons">
              <p class="control">
                <VueDatePicker v-model="holiday.request_date_from" :enable-time-picker="false"></VueDatePicker>
              </p>
            </div>
            <p class="label">Date To</p>
            <div class="field has-addons">
              <p class="control">
                <VueDatePicker v-model="holiday.request_date_to" :enable-time-picker="false"></VueDatePicker>
              </p>
            </div>
            <div class="field">
              <BaseInput
                  v-model.number="holiday.hours_requested"
                  label="Days Requested"
                  type="number"
              />
            </div>

            <div class="field">
              <BaseInput
                  v-model.number="holiday.saturday"
                  label="Saturdays"
                  type="number"
              />
            </div>

            <div class="field">
              <BaseInput
                  v-model="holiday.description"
                  label="Description"
                  type="text"
              />
            </div>

            <p class="is-size-7">Saturdays in date range: 3</p>
            <br>
            <div class="field">
              <div class="control">
                <button class="button is-outlined is-white" type="submit">
                  Book Holiday
                </button>
              </div>
            </div>
          </div>
          <div v-if="submitStatus">
            <p class="is-size-4 has-text-white">Holiday request submitted</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import BaseInput from "main/src/front/components/formBase/BaseInput.vue";
import {useHolidayStore} from "../../../stores/holidayStore";
import {useAuthStore} from "auth/src/stores/authStore";

export default {
  components: {VueDatePicker, BaseInput},

  setup() {
    const holidayStore = useHolidayStore()
    const authStore = useAuthStore()
    return {
      holidayStore,
      authStore
    }
  },

  data() {
    return {
      holiday: {
        staff_id: this.authStore.user.staff_id,
        hours_requested: 0,
        request_date_from: null,
        request_date_to: null,
        saturday: 0,
        description: '',
      }
    }
  },

  computed: {
    submitStatus() {
      return useHolidayStore().submitStatus
    }
  },

  methods: {
    async submitForm() {
      try {
        await this.holidayStore.submitHoliday(this.holiday).then(()=>{
          this.$router.push({name: 'holiday-dashboard', params: {filter: 'all'}})
        })
      } catch (error) {
        // handle the error here
        console.error(error)
      }
    }
  }
}
</script>