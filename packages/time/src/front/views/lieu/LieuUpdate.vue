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
        <div v-if="lieuStore.lieuHourLoading">
          Loading...
        </div>
        <div v-else-if="!lieuStore.lieuHourLoading && lieu">
          <LieuForm :formType="'update'" :id="props.id"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import LieuForm from "../../components/lieu/LieuForm.vue";
import {useLieuStore} from "../../../stores/lieuStore";
import {computed} from "vue";

const props = defineProps({
  id: {
    required: true
  }
})

const lieuStore = useLieuStore();
const lieu = computed(() => lieuStore.lieuHour);
</script>