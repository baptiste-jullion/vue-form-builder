<script setup lang="ts" generic="
Context extends FormContext,
Keys extends FormContextKeys<Context>,
InputPropsGeneric = unknown
"
>
import type { FieldPropSet, FormContext, FormContextKeys } from "~/components/FormBuilder/types";

const props = defineProps<FieldPropSet<InputPropsGeneric> & {
  ctx: Context
  path: Keys
}>();
</script>

<template>
  <FormBuilderFieldLabel :ctx :path />
  <FormBuilderFieldInput
    v-bind="{ ...props }"
  />
  <FormBuilderFieldErrors :ctx :path />
</template>
