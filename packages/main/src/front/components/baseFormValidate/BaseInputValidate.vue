<template>
  <label class="label">{{ label }}</label>
  <div class="control">
    <input
        v-model="value"
        :type="type || 'text'"
        v-bind="$attrs"
        :placeholder="label"
        class="input"
        :class="{
            'is-danger': errorMessage,
            'is-success': meta.validated
        }"
    >
    <span class="help is-danger">{{ errorMessage }}</span>
  </div>
</template>
<script setup>
import { useField } from "vee-validate"
import {watch} from "vue";

const props = defineProps({
  name: String,
  modelValue: String,
  type: String,
  label: {
    type: String,
    default: ''
  }
})

const { value, errorMessage, meta } = useField(() => props.name);

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    value.value = newVal;
  }
}, { immediate: true });
</script>