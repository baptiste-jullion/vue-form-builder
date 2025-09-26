<script setup lang="ts" generic="
Context extends FormContext,
Keys extends FormContextKeys<Context>,
"
>
import type { FormContext, FormContextKeys } from "~/components/FormBuilder/types";

defineProps<{
  ctx: Context
  path: Keys
}>();
</script>

<template>
  <p>label: {{ path }}</p>
</template>
