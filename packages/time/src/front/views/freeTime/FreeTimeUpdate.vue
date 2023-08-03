<template>
  <div class="columns section">
    <div class="column is-7">
      <div class="box has-background-free-time">
        <div class="columns">
          <div class="column">
            <h3 class="title is-4 has-text-white">Update Your Free Time</h3>
          </div>
          <div class="column is-3">
            <figure class="image">
              <img alt="Free Time" :src="'/dist/img/icons/free-time.svg'">
            </figure>
          </div>
        </div>
        <FreeTimeForm v-if="!loading" :freeTimeProps="freeTime" :formType="'update'" :id="id"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import FreeTimeForm from "../../components/freeTime/FreeTimeForm.vue";
import {useFreeTimeStore} from "../../../stores/freeTimeStore";
import {computed, onMounted, ref} from "vue";

const props = defineProps({
  id: {
    required: true
  }
})

const freeTimeStore = useFreeTimeStore();
const freeTime = computed(() => freeTimeStore.freeTime)
const loading = ref(true)

onMounted(async () => {
  try {
    await freeTimeStore.loadFreeTime(props.id);
    loading.value = false;
  } catch (error) {
    console.error('Failed to load free time: ', error);
  }
})

</script>