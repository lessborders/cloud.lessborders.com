<template>
  <div>
    <v-list-item
      v-for="theme in availableThemes"
      :key="theme.key"
      :value="theme.key"
      :class="{
        'v-list-item--active': themeSetting == theme.key,
      }"
      @click="themeSetting = theme.key"
    >
      <v-icon v-if="theme.key === 'light'" icon="fa-regular fa-sun-bright" />
      <v-icon v-if="theme.key === 'dark'" icon="fa-regular fa-moon" />
      <v-icon v-if="theme.key === 'system'" icon="fa-regular fa-laptop" />
      {{ $t('components.theme_switcher.' + theme.key) }}
    </v-list-item>
  </div>
</template>

<script lang="ts" setup>
import { ITheme, IThemeSettingOptions, availableThemes } from '~/utils/theme'

// state
const themeSetting = useState<IThemeSettingOptions>('theme.setting')
const themeCurrent = useState<ITheme>('theme.current')
</script>
