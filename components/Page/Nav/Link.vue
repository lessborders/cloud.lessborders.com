<template>
  <v-list-item
    v-if="!item.children"
    :to="item.route ? item.route : undefined"
    :href="item.href ? item.href : undefined"
    :class="classes"
    :prepend-icon="item.icon"
    nuxt
  >
    <span>{{ item.text }}</span>
  </v-list-item>

  <v-list-group v-else>
    <template #activator="{ props }">
      <v-list-item
        v-bind="props"
        :append-icon="null"
        :title="item.text"
        :value="item.text"
        nuxt
      />
    </template>
    <PageNavLink v-for="(child, i) in item.children" :key="i" :item="child" />
  </v-list-group>
</template>

<script>
export default {
  name: 'NavLink',
  props: {
    classes: {
      type: String,
      default: '',
    },
    item: {
      type: Object,
      default: null,
    },
  },
}
</script>
