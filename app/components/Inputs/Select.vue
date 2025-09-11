<script setup lang="ts" generic="Option extends AllowedOptionTypes | Record<string, AllowedOptionTypes>">
export type AllowedOptionTypes = string | number | Date | unknown;

interface SelectProps {
  options: Option[]
  optionLabel?: Option extends object ? keyof Option : never
  optionValue?: Option extends object ? keyof Option : never
}

defineProps<SelectProps>();
</script>

<template>
  <select>
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="optionValue ? option[optionValue] : option"
    >
      {{ optionLabel ? option[optionLabel] : option }}
    </option>
  </select>
</template>
