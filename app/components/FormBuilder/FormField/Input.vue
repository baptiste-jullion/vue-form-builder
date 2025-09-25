<script setup lang="ts" generic="
Context extends FormContext,
Keys extends FormContextKeys<Context>,
InputPropsGeneric = unknown,
ModelValue = unknown
"
>
import type { FieldPropSet, FormContext, FormContextKeys } from "../types";
import * as _ from "lodash-es";

import { FormFieldInputs } from "../types";

const { ctx, path } = defineProps<
  FieldPropSet<InputPropsGeneric> & {
    ctx: Context
    path: Keys
  }
>();

function onValueChange(newValue: ModelValue) {
  const validator = getValidatorByPath(ctx.schema, path);

  if (validator) {
    if (validator.safeParse(null).success && newValue === "") {
      _.set(ctx.form, path, null);
    }
    else if (validator.safeParse(undefined).success && newValue === "") {
      _.set(ctx.form, path, undefined);
    }
    else {
      _.set(ctx.form, path, newValue);
    }
  }
  else {
    _.set(ctx.form, path, newValue);
  }
}
</script>

<template>
  <component
    :is="FormFieldInputs[type]"
    v-bind="props"
    :model-value="_.get(ctx.form, path)"
    @update:model-value="onValueChange"
  />
</template>
