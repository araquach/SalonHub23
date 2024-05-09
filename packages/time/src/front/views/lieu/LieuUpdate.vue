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
          <LieuForm :lieuProps="lieu" :formType="'update'" :id="id"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import LieuForm from "../../components/lieu/LieuForm.vue";
import {useLieuStore} from "../../../stores/lieuStore";
import {computed, onMounted} from "vue";

const props = defineProps({
  id: {
    required: true
  }
})

const lieuStore = useLieuStore();
const lieu = computed(() => lieuStore.lieuHour);

onMounted(async () => {
  try {
    await lieuStore.loadLieuHour(props.id);
  } catch (error) {
    console.error('Failed to load lieu hour: ', error);
  }
});
</script>