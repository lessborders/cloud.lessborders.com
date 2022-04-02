<template>
  <NuxtLink v-if="to" tag="a" :to="to">
    <slot>{{ text }}</slot>
  </NuxtLink>
  <a v-else :href="href">
    <slot>{{ text }}</slot>
  </a>
</template>

<script lang="ts" setup>
// micro compiler
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  to: {
    type: [String, Object],
    default: undefined,
  },
  href: {
    type: String,
    default: '',
  },
})

// state
const href = toRef(props, 'href')
const to = toRef(props, 'to')
</script>
