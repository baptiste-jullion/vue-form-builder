<script setup lang="ts" generic="
Context extends FormContext,
Keys extends FormContextKeys<Context>,
InputPropsGeneric = unknown
"
>
import type { FieldPropSet, FormContext, FormContextKeys } from "../types";
import { FormFieldInputs } from "../types";

defineProps<
  FieldPropSet<InputPropsGeneric> & {
    ctx: Context
    path: Keys
  }
>();
</script>

<template>
  <component
    :is="FormFieldInputs[type]"
    v-bind="props"
    v-model="ctx.form[path]"
  />
</template>
