export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase'],
  css: ['~/assets/main.css'],
  supabase: {
    // Redirect unauthenticated users to /login; these pages stay public.
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: ['/', '/signup', '/confirm','/forgot-password', '/reset-password'],
      saveRedirectToCookie: false,
    },
  },
})
