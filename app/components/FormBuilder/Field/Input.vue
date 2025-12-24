<script generic="
Context extends FormContext,
Keys extends FormContextKeys<Context>,
InputPropsGeneric = unknown,
ModelValue = unknown
" lang="ts" setup
>
import type {
  FieldPropSet,
  FormContext,
  FormContextKeys,
} from "~/components/FormBuilder/types";
import * as _ from "lodash-es";
import z from "zod";
import { FieldInputs } from "~/components/FormBuilder/types";

const {
  ctx,
  path,
} = defineProps<
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

  validateSelf();
}

function validateSelf() {
  const validator = getValidatorByPath(ctx.schema, path);
  if (validator) {
    const error = validator.safeParse(_.get(ctx.values, path)).error;
    if (error) {
      _.set(ctx.errors, path, z.treeifyError(error).errors);
    }
    else {
      unsetAndClean(ctx.errors, path);
    }
  }
}

function unsetAndClean(obj: object, path: string | string[]) {
  _.unset(obj, path);

  let parts = _.toPath(path);
  while (parts.length) {
    const parentPath = parts.slice(0, -1);
    const parent = _.get(obj, parentPath);

    if (_.isPlainObject(parent) && _.isEmpty(parent)) {
      _.unset(obj, parentPath);
      parts = parentPath;
    }
    else {
      break;
    }
  }
}
</script>

<template>
  <component
    :is="FieldInputs[type]"
    v-bind="props"
    :id="`input-${path}`"
    :model-value="_.get(ctx.values, path)"
    v-on="{ ...emits }"
    @update:model-value="onValueChange"
  />
</template>
