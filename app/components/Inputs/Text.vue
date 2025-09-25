<script setup lang="ts">
export interface TextProps {
}

const props = defineProps<TextProps>();

const model = defineModel<string>();
</script>

<template>
  <input v-model="model" type="text" v-bind="{ ...props }">
</template>
