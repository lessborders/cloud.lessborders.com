import { defineNuxtConfig } from 'nuxt3'
import { IntlifyModuleOptions } from '@intlify/nuxt3'

declare module '@nuxt/schema' {
  interface NuxtConfig {
    intlify?: IntlifyModuleOptions
  }
}

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // meta
  meta: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Less Borders is making it easier for startups, creators and entrepreneurs by providing services and tools to help deliver projects.',
      },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://static.lessborders.com/assets/css/root.css',
      },
    ],
    // js
    script: [
      {
        hid: 'gtm',
        children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WMKMN4V');`,
        type: 'text/javascript',
      },
    ],
  },

  // css
  css: ['vuetify/lib/styles/main.sass', '~/assets/scss/styles.scss'],

  // plugins
  plugins: ['~/plugins/routeChange.ts'],

  // build
  build: {
    transpile: ['@headlessui/vue', 'vuetify'],
  },

  // build modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    '@intlify/nuxt3',
    '@vueuse/nuxt',
  ],

  // auto import components
  components: true,

  // vite plugins
  vite: {
    define: {
      'process.env.DEBUG': 'false',
    },
    plugins: [],
  },

  // localization - i18n config
  intlify: {
    localeDir: 'locales',
    vueI18n: {
      locale: 'en',
      fallbackLocale: 'en',
      availableLocales: ['en', 'de'],
    },
  },
})
