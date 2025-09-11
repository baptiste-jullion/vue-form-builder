<script setup lang="ts">
defineProps<{
  path: string
}>();
</script>

<template>
  <p>label: {{ path }}</p>
</template>
