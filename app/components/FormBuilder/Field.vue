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
  dependencies?: Exclude<FormContextKeys<Context>, Keys>[]
  localized?: boolean
}>();
</script>

<!-- Add better i18n support, temporarily using hardcoded locales should also include localization in Label, Input and Errors components -->

<template>
  <div>
    <template v-if="localized">
      <div v-for="locale in ['fr', 'en']" :key="locale">
        <FormBuilderFieldLabel :ctx :path="(`${path}.${locale}` as Keys)" />
        <FormBuilderFieldInput
          v-bind="{ ...props, path: (`${path}.${locale}` as Keys) }"
        />
        <FormBuilderFieldErrors :ctx :path="(`${path}.${locale}` as Keys)" />
      </div>
    </template>
    <template v-else>
      <FormBuilderFieldLabel :ctx :path />
      <FormBuilderFieldInput
        v-bind="{ ...props }"
      />
      <FormBuilderFieldErrors :ctx :path />
    </template>
  </div>
</template>
