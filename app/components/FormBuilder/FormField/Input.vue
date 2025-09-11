<script setup lang="ts" generic="
InputType extends FormFieldInputsKeys,
Context extends { schema?: ZodType<any>, form: Record<string, string>},
Keys extends DeepKeyOf<z.infer<NonNullable<Context['schema']>>>
"
>
import type { z, ZodType } from "zod";
import type { FormFieldInputsInterface } from "../../../../shared/types/useForm";
// import { FormFieldInputs } from "../../../../shared/types/useForm";

defineProps<{
  type: FormFieldInputsInterface[InputType]
  ctx: Context
  path: Keys
}>();
</script>

<template>
  <input v-model="ctx.form[path]" type="text">
  <!-- <component
    :is="FormFieldInputs[type]"
  /> -->
</template>
