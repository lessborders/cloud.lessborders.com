export type IThemeSettingOptions = 'dark' | 'light' | 'system'

export type ITheme = 'dark' | 'light'

export const availableThemes: {
  key: IThemeSettingOptions
  text: string
}[] = [
  { key: 'light', text: 'Light' },
  { key: 'dark', text: 'Dark' },
  { key: 'system', text: 'System' },
]

export function ThemeManager() {
  // composable
  const themeUserSetting = useCookie<IThemeSettingOptions>('theme', { path: "/" })

  // methods
  const getUserSetting = (): IThemeSettingOptions =>
    themeUserSetting.value || 'system'
  const getSystemTheme = (): ITheme => {
    try {
      return window
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : 'dark'
    } catch (error) {
      return 'dark'
    }
  }

  // state
  const themeSetting = useState<IThemeSettingOptions>('theme.setting', () =>
    getUserSetting(), { path: "/" }
  )
  const themeCurrent = useState<ITheme>('theme.current', () =>
    process.client ? getSystemTheme() : 'light', { path: "/" }
  )

  // wathcers
  const onThemeSettingChange = (themeSetting: IThemeSettingOptions) => {
    themeUserSetting.value = themeSetting
    if (themeSetting === 'system') {
      themeCurrent.value = getSystemTheme()
    } else {
      themeCurrent.value = themeSetting
    }
  }
  watch(themeSetting, (val) => onThemeSettingChange(val))
  const onThemeSystemChange = () => {
    if (themeSetting.value === 'system') {
      themeCurrent.value = getSystemTheme()
    }
  }

  // init theme
  const init = () => {
    themeSetting.value = getUserSetting()
  }
  onThemeSettingChange(themeSetting.value)

  // lifecycle
  onBeforeMount(() => init())
  onMounted(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', onThemeSystemChange)
  })
  onBeforeUnmount(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', onThemeSystemChange)
  })

  return {
    themeSetting,
    themeCurrent,

    getUserSetting,
    getSystemTheme,
  }
}
