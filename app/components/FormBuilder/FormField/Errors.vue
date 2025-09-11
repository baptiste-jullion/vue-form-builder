<script setup lang="ts">
defineProps<{
  path: string
}>();
</script>

<template>
  <p>errors: {{ path }}</p>
</template>
