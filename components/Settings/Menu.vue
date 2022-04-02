<template>
  <div>
    <button
      class="dropdown-item collapsable d-flex"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#themeSwitcherCollapse"
      aria-expanded="false"
      aria-controls="themeSwitcherCollapse"
    >
      {{ $t('components.theme_switcher.change_theme') }}
      <small class="ms-auto my-auto">
        ({{ $t('components.theme_switcher.' + themeSetting) }})
      </small>
    </button>
    <div id="themeSwitcherCollapse" class="collapse">
      <SettingsThemeSwitcher />
    </div>

    <hr class="dropdown-divider" />

    <button
      class="dropdown-item collapsable d-flex"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#localeSwitcherCollapse"
      aria-expanded="false"
      aria-controls="localeSwitcherCollapse"
    >
      {{ $t('components.language_switcher.change_language') }}
      <small class="ms-auto my-auto">
        ({{ $t('components.language_switcher.' + localeSetting) }})
      </small>
    </button>
    <div id="localeSwitcherCollapse" class="collapse">
      <SettingsLocaleSwitcher />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ITheme, IThemeSettingOptions, availableThemes } from '~/utils/theme'
import { availableLocales } from '~/utils/lang'

// state
const themeSetting = useState<IThemeSettingOptions>('theme.setting')
const themeCurrent = useState<ITheme>('theme.current')
const localeSetting = useState<string>('locale.setting')
</script>
