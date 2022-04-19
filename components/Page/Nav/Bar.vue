<template>
  <div>
    <!-- Navbar -->
    <v-app-bar style="width: 100%">
      <template #prepend>
        <NuxtLink to="/">
          <img
            class="mx-2 logo d-none d-sm-block"
            src="https://static.lessborders.com/apps/lessborders/lessborders_logo.svg"
          />
        </NuxtLink>
        <v-app-bar-nav-icon
          size="small"
          icon="fa-regular fa-bars"
          @click.stop="mainMenu = !mainMenu"
        ></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Home</v-app-bar-title>

      <v-btn :to="{ name: 'auth-signin' }" color="red" class="me-1">
        {{ t('pages.login.nav') }}
      </v-btn>
      <v-btn
        size="small"
        icon="fa-regular fa-sliders"
        @click.stop="preferenceMenu = !preferenceMenu"
      />
    </v-app-bar>

    <!-- Main Menu -->
    <v-navigation-drawer
      v-model="mainMenu"
      temporary
      rounded
      position="left"
      width="380"
    >
      <v-toolbar>
        <NuxtLink to="/" class="d-flex me-auto">
          <img
            class="ms-2 me-4 logo"
            src="https://static.lessborders.com/apps/lessborders/lessborders_logo.svg"
          />
          <v-toolbar-title class="my-auto">Less Borders</v-toolbar-title>
        </NuxtLink>
        <v-btn
          size="small"
          icon="fa-regular fa-times"
          @click.stop="mainMenu = !mainMenu"
        ></v-btn>
      </v-toolbar>
      <v-list>
        <PageNavLink v-for="(item, i) in menu" :key="i" :item="item" />
      </v-list>
    </v-navigation-drawer>

    <!-- Preference Menu -->
    <v-navigation-drawer
      v-model="preferenceMenu"
      temporary
      rounded
      position="right"
      width="380"
    >
      <v-toolbar>
        <v-toolbar-title class="me-auto">
          {{ $t('components.settings.title') }}
        </v-toolbar-title>
        <v-btn
          size="small"
          icon="fa-regular fa-times"
          @click.stop="preferenceMenu = !preferenceMenu"
        />
      </v-toolbar>
      <SettingsMenu />
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts" setup>
import { IApp } from '~/utils/app'

export interface IMenuItem {
  type: 'link' | 'button'
  text: string
  icon?: string
  href?: any
  route?: any
  active?: boolean
  children?: any
}

const { t } = useLang()
// const app = useState<IApp>('app')
const menu = computed((): IMenuItem[] => [
  {
    type: 'link',
    text: t('pages.services.branding.nav'),
    route: "/",
  },
])
</script>

<script lang="ts">
export default {
  data() {
    return {
      mainMenu: false,
      preferenceMenu: false,
    }
  },
}
</script>
