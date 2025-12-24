<script setup lang="ts">
export interface NumberProps {}

const props = defineProps<NumberProps>();
const model = defineModel<number>();
</script>

<template>
  <input
    v-model="model"
    type="number"
    v-bind="{ ...props }"
  >
</template>
