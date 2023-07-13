<template>
  <div class="columns section">
    <div class="column is-7">
      <div class="box has-background-lieu">
        <div class="columns">
          <div class="column">
            <h3 class="title is-4 has-text-white">Add/Redeem Lieu Hours</h3>
          </div>
          <div class="column is-3">
            <figure class="image">
              <img alt="Lieu Hours" :src="'/dist/img/icons/lieu.svg'">
            </figure>
          </div>
        </div>
        <form>
          <div>
            <p class="label">Date Regarding</p>
            <div class="field has-addons">
              <p class="control">
                <VueDatePicker v-model="lieu.date_regarding" :enable-time-picker="false"></VueDatePicker>
              </p>
            </div>

            <div class="field">
              <BaseInput
                  v-model="lieu.lieu_hours"
                  label="Lieu Hours"
                  type="number"
              />
            </div>

            <div class="field">
              <BaseInput
                  v-model="lieu.description"
                  label="Description"
                  type="text"
              />
            </div>
            <br>
            <div class="field">
              <div class="control">
                <button class="button is-outlined is-white" type="submit">
                  Add/Redeem Lieu
                </button>
              </div>
            </div>
          </div>

          <div v-if="submitStatus">
            <p class="is-size-4 has-text-white">Lieu request submitted</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import BaseInput from "main/src/front/components/formBase/BaseInput.vue";

export default {
  components: {BaseInput, VueDatePicker},
  data() {
    return {
      lieu: {
        lieu_hours: 0,
        description: '',
        date_regarding: null
      },
      submitStatus: false
    }
  }
}
</script>