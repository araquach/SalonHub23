<template>
  <label class="label">{{ label }}</label>
  <div class="control">
    <input
        v-bind="$attrs"
        :placeholder="label"
        class="input"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>
