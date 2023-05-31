<template>
  <div class="columns is-centered">
    <div class="column is-7">
      <div class="box has-background-holiday">
        <div class="columns">
          <div class="column">
            <h3 class="title is-4 has-text-white">Book a Holiday</h3>
          </div>
          <div class="column is-3">
            <figure class="image">
              <img alt="Holidays" src="main/dist/img/icons/holiday.svg">
            </figure>
          </div>
        </div>
        <form @submit.prevent="addHoliday">
          <div v-if="submitStatus !== 'OK'">
            <div class="field">
              <div class="field has-addons">
                <label class="label has-text-white">Select Date Range</label>
                <p class="control">
                  <VueDatePicker v-model="dateRange" placeholder="Date Range" :enable-time-picker="false"
                                 :format="dateFormatter"></VueDatePicker>
                </p>
              </div>
              <div
                  class="help is-danger"
                  v-if="submitStatus === 'ERROR' && !v$.dateRange.required"
              >
                <p v-if="!v$.dateRange.required">Date Range is required</p>
                <p v-if="!v$.dateRange.maxWeeks">You cannot book more than 3 weeks in a block</p>
                <p v-if="!v$.dateRange.maxSat">Too many Saturdays in a block</p>
              </div>
            </div>

            <b-field :message="[
                  {'Days Requested required' : !v$.hours_requested.required},
                  {'You cannot book more than 3 weeks in a block' : !v$.hours_requested.maxValue},
                  {'You can only book half day or more holiday' : !v$.hours_requested.minValue},
                  {'You don\'t have enough holidays': !v$.hours_requested.withinEntitlement}
                ]"
                     :type="{ 'is-danger': v$.hours_requested.$error }"
                     label="Days">
              <b-numberinput v-model.trim.number="v$.hours_requested.$model"
                             :step=".5"
                             placeholder="Days Requested">
              </b-numberinput>
            </b-field>

            <b-field v-show="saturday" :message="[
                    {'Description is required' : !v$.saturday.required},
                    {'You don\'t have enough Saturdays left' : !v$.saturday.withinEntitlement},
                    {'You can only book 2 consecutive Saturdays ' : !v$saturday.maxSat}
                  ]"
                     :type="{ 'is-danger': v$.saturday.$error }"
                     label="Saturdays">
              <div class="column is-4 is-5-mobile">
                <div class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <p class="is-size-3">{{ saturday }}</p>
                    </div>
                  </div>
                  <div class="level-right">
                    <div v-if="!isClicked" class="level-item">
                      <p class="button is-white is-small" @click="halfSat">Half Saturday</p>
                    </div>
                  </div>
                </div>
              </div>
            </b-field>

            <b-field :message="{'Description is required' : !v$.description.required}"
                     :type="{ 'is-danger': v$.description.$error }"
                     label="Description">
              <b-input v-model.trim="v$.description.$model"
                       placeholder="Description">
              </b-input>
            </b-field>
            <p class="is-size-7">Saturdays in date range: {{ totalSat }}</p>
            <br>
            <b-field>
              <div class="control">
                <button :disabled="submitStatus === 'PENDING'" class="button is-outlined is-white" type="submit">Book
                  Holiday
                </button>
              </div>
            </b-field>
          </div>
          <div v-if="submitStatus === 'OK'">
            <p class="is-size-4 has-text-white">Holiday request submitted</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import {useVuelidate} from "@vuelidate/core";
import {maxValue, minValue, required} from "@vuelidate/validators"
import {addDays, addWeeks, eachDayOfInterval, isSaturday, isWithinInterval} from "date-fns"
import {useHolidayStore} from "../../../stores/holidayStore";
import {useAuthStore} from "auth/src/stores/authStore";

const maxWeeks = (value) => isWithinInterval(
    value.length ? value[1] : new Date(),
    {start: value.length ? value[0] : new Date(), end: addWeeks(value.length ? value[0] : new Date(), 3)}
)
const maxSat = (value) => {
  const interval = eachDayOfInterval({
    start: value.length ? value[0] : new Date(),
    end: value.length ? value[1] : new Date()
  })
  const satNumber = interval.filter(d => isSaturday(d)).length

  return satNumber <= 2;
}

export default {
  components: { VueDatePicker },

  setup() {
    const authStore = useAuthStore();
    const holidayStore = useHolidayStore();
    return {
      v$: useVuelidate(),
      holidayStore: holidayStore,
      authStore: authStore,
      staff_id: authStore.user.staff_id,
      remainingSaturdays: holidayStore.remainingSaturdays,
      remainingHolidays: holidayStore.remainingHolidays,
    }
  },

  data() {
    return {
      isClicked: false,
      dateFormatter: {
        type: Function,
        required: true,
        default: date => date.toLocaleDateString(),
      },
      hours_requested: null,
      dateRange: [],
      saturday: null,
      description: null,
      prebooked: false,
      submitStatus: null
    }
  },

  validations: {
    hours_requested: {
      required,
      minValue: minValue(.5),
      maxValue: maxValue(21),
      withinEntitlement(value) {
        return maxValue(this.remainingHolidays)(value)
      }
    },
    dateRange: {
      required,
      maxWeeks,
      maxSat
    },
    saturday: {
      required,
      withinEntitlement(value) {
        return maxValue(this.remainingSaturdays)(value)
      }
    },
    description: {required}
  },

  methods: {
    halfSat() {
      this.isClicked = true
      return this.saturday = this.saturday - .5
    },

    addHoliday() {
      const newHoliday = {
        staff_id: this.staff_id,
        hours_requested: this.hours_requested,
        prebooked: this.isPrebooked,
        request_date_from: this.dateRange[0],
        request_date_to: this.dateRange[1],
        saturday: this.saturday,
        description: this.description
      }
      this.v$.$touch()
      if (this.v$.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.$store.dispatch('addHoliday', newHoliday)
        this.submitStatus = 'OK'
            .then(setTimeout(() => {
              this.$router.push({name: 'holiday-index', params: {filter: 'all'}})
            }, 1000))
            .catch((e) => {
              console.error(e)
            })
      }
    }
  },

  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    isPrebooked() {
      const today = Date.now()

      if (this.dateRange[0] <= addDays(today, 14)) {
        return true
      }
    },

    totalSat() {
      const r = eachDayOfInterval({
        start: !this.dateRange.length ? new Date() : new Date(this.dateRange[0]),
        end: !this.dateRange.length ? new Date() : new Date(this.dateRange[1])
      })

      const f = r.filter(d => isSaturday(d))

      return f.length
    }
  }
}
</script>