<template>
  <div class="section columns is-centered">
    <div class="column is-7">
      <div class="box has-background-holiday">
        <div class="columns">
          <div class="column">
            <h3 class="title is-4 has-text-white">Create User</h3>
          </div>
          <div class="column is-3">
            <figure class="image">
              <img :src="userImage" alt="User">
            </figure>
          </div>
        </div>
        <form @submit.prevent="register">
          <div v-if="submitStatus !== 'OK'">
            <div class="field">
              <div class="select">
                <select>
                  <option
                      v-for="t in teamMembers"
                      :value="t"
                      :key="t.id">
                    {{ t.first_name }} {{ t.last_name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="field">
              <label class="label has-text-white">Email Address</label>
              <div class="control">
                <input
                    class="input"
                    :class="{ 'is-danger': v$.email.$error }"
                    v-model.trim="v$.email.$model"
                    placeholder="Your Email Address"
                />
              </div>
              <div v-if="submitStatus === 'ERROR'" class="help is-danger">
                <p v-if="!v$.email.required">Your Email Address is required</p>
                <p v-if="!v$.email.email">Valid Email Address Required</p>
              </div>
            </div>
            <div class="field">
              <label class="label has-text-white">Password</label>
              <div class="control">
                <input
                    class="input"
                    :class="{ 'is-danger': v$.password.$error }"
                    v-model.trim="v$.password.$model"
                    placeholder="Your Password"
                />
              </div>
              <div v-if="submitStatus === 'ERROR'" class="help is-danger">
                <p v-if="!v$.password.required">Your Password is required</p>
              </div>
            </div>
            <div class="field">
              <div class="label has-text-white">Admin Level</div>
              <div class="select">
                <select>
                  <option value="">Select</option>
                  <option value="0">Normal User</option>
                  <option value="1">Manager</option>
                  <option value="2">Admin</option>
                </select>
              </div>
            </div>
            <br>
            <div class="field">
              <div class="control">
                <button class="button is-outlined is-white" type="submit" :disabled="submitStatus === 'PENDING'">
                  Register
                </button>
              </div>
            </div>
            <p>{{ error }}</p>
          </div>
          <div v-if="submitStatus === 'OK'">
            <p class="is-size-4 has-text-white">New User Registered</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {useVuelidate} from "@vuelidate/core";
import {required, email, numeric} from '@vuelidate/validators'
import {useMainStore} from "main/src/stores/mainStore";
import userImage from "main/dist/img/icons/user.svg"

export default {
  setup() {
    const mainStore = useMainStore()
    return {
      teamMembers: mainStore.teamMembers,
      userImage,
      v$: useVuelidate(),
    }
  },
  
  data() {
    return {
      tm: null,
      email: "",
      password: "",
      admin_level: null,
      submitStatus: null,
      error: null
    }
  },

  validations: {
    email: {required, email},
    password: {required},
    admin_level: {required, numeric}
  },

  methods: {
    register() {
      const data = {
        staff_id: this.tm.staff_id,
        email: this.email,
        password: this.password,
        admin_level: this.admin_level
      }
      this.v$.$touch()
      if (!this.v$.$invalid) {
        this.$store.dispatch('register', data)
            .then(response => {
              this.submitStatus = 'OK'
            })
            .then(setTimeout(() => {
              this.$router.push({name: 'dashboard'})
            }, 1500))
            .catch(err => {
              this.error = err.response.data.message
            })
      }
    }
  },

  // created() {
  //   this.$store.dispatch('loadTeamMembers')
  // }
}
</script>