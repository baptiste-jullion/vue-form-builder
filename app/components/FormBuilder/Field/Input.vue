<script setup lang="ts" generic="
Context extends FormContext,
Keys extends FormContextKeys<Context>,
InputPropsGeneric = unknown,
ModelValue = unknown
"
>
import type { FieldPropSet, FormContext, FormContextKeys } from "~/components/FormBuilder/types";
import * as _ from "lodash-es";

import z from "zod";
import { FieldInputs } from "~/components/FormBuilder/types";

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
      _.set(ctx.values, path, null);
    }
    else if (validator.safeParse(undefined).success && newValue === "") {
      _.set(ctx.values, path, undefined);
    }
    else {
      _.set(ctx.values, path, newValue);
    }
  }
  else {
    _.set(ctx.values, path, newValue);
  }

  validate();
}

function validate() {
  const validator = getValidatorByPath(ctx.schema, path);
  if (validator) {
    const error = validator.safeParse(_.get(ctx.values, path)).error;
    if (error) {
      _.set(ctx.errors, path, z.treeifyError(error).errors);
    }
    else {
      _.unset(ctx.errors, path);
    }
  }
}
</script>

<template>
  <component
    :is="FieldInputs[type]"
    v-bind="props"
    :model-value="_.get(ctx.values, path)"
    v-on="{ ...emits }"
    @update:model-value="onValueChange"
  />
</template>
