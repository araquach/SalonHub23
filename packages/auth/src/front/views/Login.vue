<template>
    <div class="section columns is-centered">
        <div class="column is-7">
            <div class="box has-background-holiday">
                <div class="columns">
                    <div class="column">
                        <h3 class="title is-4 has-text-white">Sign In</h3>
                    </div>
                    <div class="column is-3">
                        <figure class="image">
                            <img src="/dist/img/icons/user.svg" alt="User">
                        </figure>
                    </div>
                </div>
                <form @submit.prevent="login">
                    <div v-if="submitStatus !== 'OK'">
                    <b-field label="Email Address"
                             :type="{ 'is-danger': $v.email.$error }"
                             :message="[{'Email address is required' : !$v.email.required}, {'Valid Email Address required' : !$v.email.email}]">
                        <b-input v-model.trim="$v.email.$model"
                                 placeholder="Email">
                        </b-input>
                    </b-field>
                    <b-field label="Password"
                             :type="{ 'is-danger': $v.password.$error }"
                             :message="{'Password is required' : !$v.password.required}">
                        <b-input v-model.trim="$v.password.$model"
                                 placeholder="Password">
                        </b-input>
                    </b-field>
                      <p class="has-text-danger">
                        {{ error }}
                      </p>
                    <br>
                    <div class="field">
                        <div class="control">
                            <button class="button is-outlined is-white" type="submit" :disabled="submitStatus === 'PENDING'">Sign In</button>
                        </div>
                    </div>
                    </div>
                    <div v-if="submitStatus === 'OK'">
                        <p class="is-size-4 has-text-white">Login Successful</p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {required, email} from 'vuelidate/lib/validators'
    export default {
        data() {
            return {
                email: null,
                password: null,
                submitStatus: null,
                error: null
            }
        },

        validations: {
            email: { required, email },
            password: { required }
        },

        methods: {
            login() {
                const payload =  {
                    email: this.email,
                    password: this.password
                }
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    this.$store.dispatch('login', payload)
                        .then(response => {
                            this.submitStatus = 'OK'
                        })
                        .then(setTimeout(() => {
                            this.$router.push('/')
                        }, 1000))
                        .catch(err => {
                          this.error = err.response.data.message
                        })
                }
            }
        }
    }
</script>