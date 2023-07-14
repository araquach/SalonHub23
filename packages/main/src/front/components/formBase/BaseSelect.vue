<template>
  <label v-if="label" class="label">{{ label }}</label>
  <div class="control">
    <div class="select is-fullwidth">
      <select
          :value="modelValue"
          v-bind="{
          ...$attrs,
          onChange: ($event) => {
            // Convert the value to a number if possible
            const value = isNaN(Number($event.target.value)) ? $event.target.value : Number($event.target.value);
            $emit('update:modelValue', value);
          }
        }"
      >
        <option
            v-for="option in options"
            :value="option.value"
            :key="option.key"
            :selected="option.value === modelValue"
        >{{ option.key }}</option>
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
