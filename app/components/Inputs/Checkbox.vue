<script setup lang="ts">
export interface CheckboxProps {}

export interface CheckboxEmits {}

const props = defineProps<CheckboxProps>();
defineEmits<CheckboxEmits>();
const model = defineModel<boolean>();
</script>

<template>
  <input
    v-model="model"
    type="checkbox"
    v-bind="{ ...props }"
  >
</template>
