<template>
  <div class="columns section">
    <div class="column is-7">
      <div class="box has-background-lieu">
        <div class="columns">
          <div class="column">
            <h3 class="title is-4 has-text-white">Update Lieu Request</h3>
          </div>
          <div class="column is-3">
            <figure class="image">
              <img alt="Lieu Hours" :src="'/dist/img/icons/lieu.svg'">
            </figure>
          </div>
        </div>
        <LieuForm v-if="!loading" :lieuProps="lieu" :formType="'update'"/>
      </div>
    </div>
  </div>
</template>
<script>
import LieuForm from "../../components/lieu/LieuForm.vue";
import {useLieuStore} from "../../../stores/lieuStore";
import {useRoute} from "vue-router";
import {computed, ref} from "vue";

export default {
  components: {LieuForm},

  setup() {
    const route = useRoute();
    const lieuStore = useLieuStore();
    const lieu = computed(() => lieuStore.lieuHour)
    const id = route.params.id
    const loading = ref(true)

    lieuStore.loadLieuHour(id).then(() => {
      loading.value = false;  // Once the data has loaded, we set loading to false
    }).catch(error => {
      console.error('Failed to load lieu hour: ', error);
      // Here you can handle the error in some way, like showing a message to the user
    });

    return {
      lieuStore,
      lieu,
      loading
    }
  }
}
</script>