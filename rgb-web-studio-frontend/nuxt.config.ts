// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false},
  plugins : [
  '~/plugins/toaster'
  ],
  modules: ["@nuxtjs/tailwindcss", '@pinia/nuxt'],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      title: "RGB test task",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon-rgb.ico" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        }
      ],
    },
  },
  runtimeConfig : {
    public : {
      BASE_URL: process.env.BASE_URL
    }
  },
});
