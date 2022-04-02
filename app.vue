<template>
  <Html :lang="locale">
    <Body :data-theme="`${theme === 'dark' ? 'dark' : ''}`">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<script lang="ts" setup>
import { AppSetup } from './utils/app'
import { ITheme } from './utils/theme'
AppSetup()
const theme = useState<ITheme>('theme.current')
const locale = useState<string>('locale.setting')

definePageMeta({
  layout: 'page',
})

if (process.client) {
  const mobileMenuOffcanvas = new bootstrap.Offcanvas(
    document.getElementById('mobileMenu')
  )
  const mobileMenuToggles = document.getElementsByClassName('mobileMenuToggle')
  for (let i = 0; i < mobileMenuToggles.length; i++) {
    mobileMenuToggles[i].addEventListener('click', function () {
      mobileMenuOffcanvas.toggle()
    })
  }
}
</script>
