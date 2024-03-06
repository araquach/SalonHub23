<template>
  <div>
    <label class="label">{{ label }}</label>
    <div class="control has-addons">
      <VueDatePicker
          v-model="value"
          :range="range"
          :enable-time-picker="enableTimePicker"
          class="input"
          :class="{
            'is-danger': errorMessage,
            'is-success': meta.validated
        }"
      />
      <span class="help is-danger">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import { useField } from "vee-validate"
import { watch } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  name: String,
  modelValue: Array,
  label: {
    type: String,
    default: ''
  },
  range: {
    type: Boolean,
    default: false
  },
  enableTimePicker: {
    type: Boolean,
    default: true
  }
})

const { value, errorMessage, meta } = useField(() => props.name);

watch(value, (newValue) => { if (newValue !== props.modelValue) { emit('update:modelValue', newValue); } }); watch(() => props.modelValue, (newVal) => { if (newVal && newVal !== value.value) { value.value = newVal; } }, { immediate: true });

watch(value, (newValue) => {
  emit('update:modelValue', newValue);
});

watch(() => props.modelValue, (newVal) => {
  console.log('BaseDatePickerValidate prop modelValue change:', newVal);
  if (newVal) {
    value.value = newVal;
  }
}, { immediate: true });

</script>
