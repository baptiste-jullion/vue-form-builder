<script setup lang="ts">
import type { InputTypeHTMLAttribute } from "vue";

defineProps<{
  type: InputTypeHTMLAttribute
  props?: any
  emits?: any
  path: string
  ctx: any
}>();
</script>

<template>
  <FormBuilderFormFieldLabel :path />
  <FormBuilderFormFieldInput
    :type
    v-bind="{ ...props }"
    :ctx
    :path
  />
  <FormBuilderFormFieldErrors :path />
</template>
