// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint"],
  devtools: { enabled: true },
  compatibilityDate: "2025-07-15",
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/gh/nandaleio/shadcn-classless@main/dist/shadcn-classless.css",
        },
      ],
    },
  },
});
