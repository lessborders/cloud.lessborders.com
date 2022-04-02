<template>
  <div>
    <div
      v-for="theme in availableThemes"
      :key="theme.key"
      :value="theme.key"
      class="dropdown-item"
      :class="{
        active: themeSetting == theme.key,
      }"
      @click="themeSetting = theme.key"
    >
      <i v-if="theme.key === 'light'" class="fa-regular fa-sun-bright" />
      <i v-if="theme.key === 'dark'" class="fa-regular fa-moon" />
      <i v-if="theme.key === 'system'" class="fa-regular fa-laptop" />
      {{ $t('components.theme_switcher.' + theme.key) }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ITheme, IThemeSettingOptions, availableThemes } from '~/utils/theme'

// state
const themeSetting = useState<IThemeSettingOptions>('theme.setting')
const themeCurrent = useState<ITheme>('theme.current')
</script>
