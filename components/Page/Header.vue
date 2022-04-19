<template>
  <div class="my-4">
    <h1>
      <slot />
    </h1>
    <p class="text-center mb-4">
      <slot name="intro" />
    </p>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  layout: 'dashboard',
})
</script>
