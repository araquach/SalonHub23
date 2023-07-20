<template>
  <div class="columns section">
    <div class="column is-7">
      <div class="box has-background-free-time">
        <div class="columns">
          <div class="column">
            <h3 class="title is-4 has-text-white">Book Free Time</h3>
          </div>
          <div class="column is-3">
            <figure class="image">
              <img alt="Free Time" :src="'/dist/img/icons/free-time.svg'">
            </figure>
          </div>
        </div>
        <form v-on:submit.prevent="submitForm">
          <div>
            <div class="field">
              <BaseInput
                  v-model="freeTime.description"
                  label="Description"
                  type="text"
              />
            </div>

            <div class="field">
              <VueDatePicker v-model="freeTime.date_regarding" :enable-time-picker="false"></VueDatePicker>
            </div>

            <div class="field">
              <BaseInput
                  v-model.number="freeTime.free_time_hours"
                  label="Time Requested"
                  type="number"
              />
            </div>

            <br>
            <div class="field">
              <div class="control">
                <button class="button is-outlined is-white" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div v-if="submitStatus">
            <p class="is-size-4 has-text-white">Free Time request submitted</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import BaseInput from "main/src/front/components/formBase/BaseInput.vue";
import {useFreeTimeStore} from "../../../stores/freeTimeStore";
import {useAuthStore} from "auth/src/stores/authStore";

export default {
  components: {BaseInput, VueDatePicker},

  setup() {
    const freeTimeStore = useFreeTimeStore();
    const authStore = useAuthStore();
    return {
      freeTimeStore,
      authStore
    }
  },

  data() {
    return {
      freeTime: {
        staff_id: this.authStore.user.staff_id,
        free_time_hours: 0,
        description: '',
        date_regarding: null
      }
    }
  },

  computed: {
    submitStatus() {
      return useFreeTimeStore().submitStatus
    }
  },

  methods: {
    async submitForm() {
      try {
        await this.freeTimeStore.submitFreeTime(this.freeTime).then(()=>{
          this.$router.push({name: 'free-time-dashboard', params: {filter: 'all'}})
        })
      } catch (error) {
        // handle the error here
        console.error(error)
      }
    }
  }
}
</script>