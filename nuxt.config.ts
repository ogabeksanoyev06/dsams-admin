export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  css: ['@/assets/styles/main.css'],
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/color-mode', '@nuxtjs/i18n', '@pinia/nuxt', 'dayjs-nuxt'],
  i18n: {
    langDir: 'locales',
    baseUrl: 'https://dsams.uz',
    locales: [
      { code: 'ru', iso: 'ru', file: 'ru.json' },
      { code: 'uz', iso: 'uz', file: 'uz.json' },
      { code: 'en', iso: 'en', file: 'en.json' },
    ],
    lazy: true,
    useCookie: true,
    cookieKey: 'i18n_redirected',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      onlyOnRoot: true, // recommended
      fallbackLocale: 'uz',
    },
    defaultLocale: 'uz',
    strategy: 'prefix_and_default',
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },

  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'https://dsams-back.onrender.com/api/',
    },
  },

  build: {
    transpile: ['vue-toastification'],
  },
})