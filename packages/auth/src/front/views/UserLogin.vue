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
              <img :src="'/dist/img/icons/user.svg'" alt="User">
            </figure>
          </div>
        </div>
        <form @submit.prevent="login">
          <div v-if="submitStatus !== 'OK'">
            <div class="field">
              <BaseInput
                  v-model="user.email"
                  label="Email Address"
                  type="text"
              />
            </div>
            <div class="field">
              <BaseInput
                  v-model="user.password"
                  label="Password"
                  type="text"
              />
            </div>
            <br>
            <div class="field">
              <div class="control">
                <button class="button is-outlined is-white" type="submit" :disabled="submitStatus === 'PENDING'">
                  Sign In
                </button>
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

<script setup>
import BaseInput from "main/src/front/components/formBase/BaseInput.vue";
import {useAuthStore} from "../../stores/authStore";
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const user = reactive({ email: null, password: null });
const submitStatus = ref(null);

const login = async () => {
  try {
    await authStore.login(user);
    await router.push({name: 'main-dashboard'});
  } catch (error) {
    // handle the error here
    console.error(error);
  }
}
</script>