<script setup lang="ts" generic="
Context extends FormContext,
Keys extends FormContextKeys<Context>,
"
>
import type { FormContext, FormContextKeys } from "~/components/FormBuilder/types";
import * as _ from "lodash-es";

const { ctx, path } = defineProps<{
  ctx: Context
  path: Keys
}>();

const errors = computed(() => _.get(ctx.errors, path));
</script>

<template>
  <p v-if="errors?.length">
    errors: {{ errors }}
  </p>
</template>
