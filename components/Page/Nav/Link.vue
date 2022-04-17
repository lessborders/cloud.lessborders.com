<template>
  <li>
    <NuxtLink
      v-if="item.type === 'link' && !item.children"
      :to="item.route ? item.route : undefined"
      :href="item.href ? item.href : undefined"
      :class="classes"
    >
      <span>{{ item.text }}</span>
    </NuxtLink>
  </li>
</template>

<script>
export default {
  name: 'NavLink',
  props: {
    classes: String,
    item: Object,
  },
}
</script>
