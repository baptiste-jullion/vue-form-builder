<script setup lang="ts">
export interface DateProps {
  max?: string
  min?: string
}

const props = defineProps<DateProps>();

const model = defineModel<string>();
</script>

<template>
  <input
    v-model="model"
    type="date"
    v-bind="{ ...props }"
  >
</template>
