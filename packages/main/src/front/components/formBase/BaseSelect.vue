<template>
  <label v-if="label" class="label">{{ label }}</label>
  <div class="control">
    <div class="select is-fullwidth">
      <select
        :value="modelValue"
        v-bind="{
          ...$attrs,
          onChange: ($event) => { $emit('update:modelValue', $event.target.value) }
        }"
      >
        <option
            v-for="option in options"
            :value="option"
            :key="option"
            :selected="option === modelValue"
        >{{ option }}</option>
      </select>
    </div>
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
    },
    options: {
      type: Array,
      required: true
    }
  }
}
</script>