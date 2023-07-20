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
            <div class="field">
              <BaseInput
                  v-model="holiday.description"
                  label="Description"
                  type="text"
              />
            </div>
            <p class="label">Date Range</p>
            <div class="field has-addons">
              <p class="control">
                <VueDatePicker v-model="dateRange" range :enable-time-picker="false"></VueDatePicker>
              </p>
            </div>
            <div v-if="holiday.hours_requested">
              <div class="field">
                <p class="is-size-4">Requested: {{ holiday.hours_requested }} days</p>
              </div>

              <div class="field">
                <p class="is-size-4">Saturdays: {{ holiday.saturday }}</p>
              </div>
            </div>
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
import {useTimeStore} from "../../../stores/timeStore";
import {useAuthStore} from "auth/src/stores/authStore";

export default {
  components: {VueDatePicker, BaseInput},

  setup() {
    const holidayStore = useHolidayStore();
    const authStore = useAuthStore();
    const timeStore = useTimeStore();
    return {
      holidayStore,
      authStore,
      timeStore
    }
  },

  data() {
    return {
      dateRange: [],
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
    workingDays(startDate, endDate) {
      let workingDaysCount = 0;
      let schedule = this.timeStore.timeDetails.schedule
      let currentDate = new Date(startDate);
      const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

      while (currentDate <= endDate) {
        let dayOfWeek = daysOfWeek[currentDate.getDay()];

        if (schedule[dayOfWeek]['am']) {
          workingDaysCount += 0.5;
        }

        if (schedule[dayOfWeek]['pm']) {
          workingDaysCount += 0.5;
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      return workingDaysCount;
    },

    countSaturdays(startDate, endDate) {
      let saturdaysCount = 0;
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        if (currentDate.getDay() === 6) { // Check if it's Saturday
          saturdaysCount += 1;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return saturdaysCount;
    },

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
  },

  watch: {
    dateRange: function(newVal) {
      if (newVal.length === 2) {
        this.holiday.request_date_from = newVal[0];
        this.holiday.request_date_to = newVal[1];

        const startDate = new Date(this.holiday.request_date_from);
        const endDate = new Date(this.holiday.request_date_to);

        this.holiday.hours_requested = this.workingDays(startDate, endDate, this.schedule);
        this.holiday.saturday = this.countSaturdays(startDate, endDate);
      }
    }
  }
}
</script>