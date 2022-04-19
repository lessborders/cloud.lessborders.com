<template>
  <h1>
    <slot>{{ text }}</slot>
  </h1>
</template>

<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>
