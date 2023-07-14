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
              <img :src="'/dist/img/icons/user.svg'" alt="User">
            </figure>
          </div>
        </div>
        <form @submit.prevent="register">
          <div v-if="submitStatus !== 'OK'">
            <div class="field">
              <BaseSelect
                  :options="team_members"
                  v-model="user.staff_id"
                  label="Your Name"
              />
            </div>
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
            <div class="field">
              <BaseSelect
                  :options="admin_levels"
                  v-model="user.admin_level"
                  label="Select a level"
              />
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
            <p class="is-size-4 has-text-white">You're now registered {{ authStore.user.first_name }}</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import {useMainStore} from "main/src/stores/mainStore";
import BaseInput from "main/src/front/components/formBase/BaseInput.vue";
import BaseSelect from "main/src/front/components/formBase/BaseSelect.vue";
import {useAuthStore} from "../../stores/authStore";

export default {
  components: {BaseInput, BaseSelect},
  setup() {
    const mainStore = useMainStore();
    const authStore = useAuthStore();
    const team_members = ref([]);

    const loadTeamMembers = async () => {
      await mainStore.loadTeamMembers();
      team_members.value = mainStore.getFullNamesAndId;
    };

    onMounted(loadTeamMembers);

    return {
      mainStore,
      authStore,
      team_members
    };
  },

  data() {
    return {
      admin_levels: [
        { key:'General User', value: 0 },
        { key:'Team User', value: 1 },
        { key:'Manager', value: 2 },
        { key:'Admin', value: 3 }
      ],
      user: {
        staff_id: null,
        email: '',
        password: '',
        admin_level: null,
      },
      submitStatus: null,
      error: null
    }
  },

  methods: {
    async register() {
      try {
        await this.authStore.register(this.user)
      } catch (error) {
        // handle the error here
        console.error(error)
      }
    }
  }
}
</script>
