<script setup lang="ts" generic="Option extends AllowedOptionTypes | Record<string, AllowedOptionTypes>">
export type AllowedOptionTypes = string | number | Date | unknown;

export interface SelectProps<Data> {
  options: Data[]
  optionLabel?: Data extends Record<string, unknown> ? keyof Data : never
  optionValue?: Data extends Record<string, unknown> ? keyof Data : never
}

defineProps<SelectProps<Option>>();

const model = defineModel<Option>();
</script>

<template>
  <select v-model="model">
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="optionValue ? option[optionValue] : option"
    >
      {{ optionLabel ? option[optionLabel] : option }}
    </option>
  </select>
</template>
