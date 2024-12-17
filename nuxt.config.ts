import Lara from '@primevue/themes/lara';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@primevue/nuxt-module'],
  primevue: {
    autoImport: true,
    usePrimeVue: true,
    options: {
      ripple: true,
      theme: {
        preset: Lara,
        options: {
          darkModeSelector: true,
        }
      },
      
    }
  },
  css: [ 'primeicons/primeicons.css' ],
  runtimeConfig: {
    public: {
      API_URL: import.meta.env.API_URL || "http://localhost:8000"
    }
  }
})