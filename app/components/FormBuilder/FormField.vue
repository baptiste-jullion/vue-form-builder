<script setup lang="ts" generic="
Context extends FormContext,
Keys extends FormContextKeys<Context>,
InputPropsGeneric = unknown
"
>
import type { FieldPropSet, FormContext, FormContextKeys } from "./types";

const props = defineProps<FieldPropSet<InputPropsGeneric> & {
  ctx: Context
  path: Keys
}>();
</script>

<template>
  <FormBuilderFormFieldLabel :path :ctx />
  <FormBuilderFormFieldInput
    v-bind="{ ...props }"
  />
  <FormBuilderFormFieldErrors :path :ctx />
</template>
