<script setup lang="ts">
export interface TextProps {}

export interface TextEmits {}

const props = defineProps<TextProps>();
defineEmits<TextEmits>();
const model = defineModel<string>();
</script>

<template>
  <input
    v-model="model"
    type="text"
    v-bind="{ ...props }"
  >
</template>
