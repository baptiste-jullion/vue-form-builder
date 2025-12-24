// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: { head: { link: [
    {
      href: "https://cdn.jsdelivr.net/gh/nandaleio/shadcn-classless@main/dist/shadcn-classless.css",
      rel: "stylesheet",
    },
  ] } },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint"],
});
