<template>
  <div>
    <slot name="app-before" />
    <div id="app-before"></div>
    <div class="d-flex flex-column m-vh-100">
      <slot name="header">
        <PageNavBar />
      </slot>
      <main id="page" class="d-flex col mx-auto">
        <slot />
      </main>
      <slot name="footer">
        <PageFooter />
      </slot>
    </div>
    <slot name="app-after" />
    <div id="app-after"></div>
  </div>
</template>

<script setup>
const route = useRoute()

if (!route.meta.title) {
  route.meta.title = 'Cloud'
}

console.log(route.meta)

useMeta({
  title: computed(() => `${route.meta.title} · Less Borders Media Agency`),
  meta: [
    {
      hid: 'description',
      name: 'description',
      content:
        route.meta.description ||
        'Less Borders is making it easier for startups, creators and entrepreneurs by providing services and tools to help deliver projects.',
    },
  ],
})
</script>
