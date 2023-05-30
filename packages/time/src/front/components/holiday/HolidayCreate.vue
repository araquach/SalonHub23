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
              <img alt="Holidays" src="/dist/img/icons/holiday.svg">
            </figure>
          </div>
        </div>
        <form @submit.prevent="addHoliday">
          <div v-if="submitStatus !== 'OK'">
            <b-field :date-formatter="dateFormatter"
                     :message="[
                         {'Date Range Required' : !$v.holiday.dateRange.required},
                         {'You cannot book more than 3 weeks in a block' : !$v.holiday.dateRange.maxWeeks},
                         {'Too many Saturdays in a block' : !$v.holiday.dateRange.maxSat}
                        ]"
                     :type="{ 'is-danger': $v.holiday.dateRange.$error }"
                     label="Date Range">
              <b-datepicker
                  v-model.trim="$v.holiday.dateRange.$model"
                  placeholder="Click to select..."
                  range>
              </b-datepicker>
            </b-field>
            <b-field :message="[
                  {'Days Requested required' : !$v.holiday.hours_requested.required},
                  {'You cannot book more than 3 weeks in a block' : !$v.holiday.hours_requested.maxValue},
                  {'You can only book half day or more holiday' : !$v.holiday.hours_requested.minValue},
                  {'You don\'t have enough holidays': !$v.holiday.hours_requested.withinEntitlement}
                ]"
                     :type="{ 'is-danger': $v.holiday.hours_requested.$error }"
                     label="Days">
              <b-numberinput v-model.trim.number="$v.holiday.hours_requested.$model"
                             :step=".5"
                             placeholder="Days Requested">
              </b-numberinput>
            </b-field>

            <b-field v-show="holiday.saturday" :message="[
                    {'Description is required' : !$v.holiday.saturday.required},
                    {'You don\'t have enough Saturdays left' : !$v.holiday.saturday.withinEntitlement},
                    {'You can only book 2 consecutive Saturdays ' : !$v.holiday.saturday.maxSat}
                  ]"
                     :type="{ 'is-danger': $v.holiday.saturday.$error }"
                     label="Saturdays">
              <div class="column is-4 is-5-mobile">
                <div class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <p class="is-size-3">{{ holiday.saturday }}</p>
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

            <b-field :message="{'Description is required' : !$v.holiday.description.required}"
                     :type="{ 'is-danger': $v.holiday.description.$error }"
                     label="Description">
              <b-input v-model.trim="$v.holiday.description.$model"
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
import {mapGetters, mapState} from "vuex"
import {maxValue, minValue, required} from "vuelidate/lib/validators"
import {addDays, addWeeks, eachDayOfInterval, isSaturday, isWithinInterval} from "date-fns"

const maxWeeks = (value) => isWithinInterval(
    value.length ? value[1] : new Date(),
    { start: value.length ? value[0] : new Date(), end: addWeeks(value.length ? value[0] : new Date(), 3) }
)
const maxSat = (value) => {
  const interval = eachDayOfInterval({
    start: value.length ? value[0] : new Date(),
    end: value.length ? value[1] : new Date()
  })
  const satNumber = interval.filter(d => isSaturday(d)).length

  if (satNumber > 2) {
    return false
  }
  return true
}

export default {
  data() {
    return {
      isClicked: false,
      dateFormatter: {
        type: Function,
        required: true,
        default: date => date.toLocaleDateString(),
      },
      holiday: {
        hours_requested: null,
        dateRange: [],
        saturday: null,
        description: null,
        prebooked: false
      },
      submitStatus: null
    }
  },

  validations: {
    holiday: {
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
    }
  },

  methods: {
    halfSat() {
      this.isClicked = true
      return this.holiday.saturday = this.holiday.saturday - .5
    },

    addHoliday() {
      const newHoliday = {
        staff_id: this.staff_id,
        hours_requested: this.toHours,
        prebooked: this.isPrebooked,
        request_date_from: this.holiday.dateRange[0],
        request_date_to: this.holiday.dateRange[1],
        saturday: this.holiday.saturday,
        description: this.holiday.description
      }
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.$store.dispatch('addHoliday', newHoliday)
            .then(response => {
              this.submitStatus = 'OK'
            })
            .then(setTimeout(() => {
              this.$router.push({ name: 'holiday-index', params: { filter: 'all' } })
            }, 1000))
            .catch((e) => {
              console.error(e)
            })
      }
    }
  },

  computed: {
    ...mapState({
      staff_id: state => state.auth.user.staff_id
    }),

    ...mapGetters([
      'remainingSaturdays',
      'remainingHolidays'
    ]),

    isPrebooked() {
      const today = Date.now()

      if (this.holiday.dateRange[0] <= addDays(today, 14)) {
        return true
      }
    },

    toHours() {
      return this.holiday.hours_requested * 8
    },

    totalSat() {
      const r = eachDayOfInterval({
        start: !this.holiday.dateRange.length ? new Date() : new Date(this.holiday.dateRange[0]),
        end: !this.holiday.dateRange.length ? new Date() : new Date(this.holiday.dateRange[1])
      })

      const f = r.filter(d => isSaturday(d))

      return this.holiday.saturday = f.length
    }
  }
}
</script>