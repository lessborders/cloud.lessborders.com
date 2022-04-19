<template>
  <v-list>
    <v-list-group>
      <template #activator="{ props }">
        <v-list-item v-bind="props" :append-icon="null" nuxt>
          {{ $t('components.theme_switcher.change_theme') }}
          <small class="ms-auto my-auto">
            ({{ $t('components.theme_switcher.' + themeSetting) }})
          </small>
        </v-list-item>
      </template>
      <SettingsThemeSwitcher />
    </v-list-group>

    <v-divider />

    <v-list-group>
      <template #activator="{ props }">
        <v-list-item v-bind="props" :append-icon="null" nuxt>
          {{ $t('components.language_switcher.change_language') }}
          <small class="ms-auto my-auto">
            ({{ $t('components.language_switcher.' + localeSetting) }})
          </small>
        </v-list-item>
      </template>
      <SettingsLocaleSwitcher />
    </v-list-group>
  </v-list>
</template>

<script lang="ts" setup>
import { ITheme, IThemeSettingOptions, availableThemes } from '~/utils/theme'
import { availableLocales } from '~/utils/lang'

// state
const themeSetting = useState<IThemeSettingOptions>('theme.setting')
const themeCurrent = useState<ITheme>('theme.current')
const localeSetting = useState<string>('locale.setting')
</script>
