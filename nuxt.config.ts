import NuxtConfiguration from '@nuxt/config'
require('dotenv').config()

const config: NuxtConfiguration = {
  mode: 'universal',
  head: {
    title: "pug",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "A cute puppy that displays dashboards on your TV" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ]
  },
  css: [
    '~/assets/style/app.scss'
  ],
  plugins: [
    '~/plugins/model-axios'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],
  devModules: [
    '@nuxtjs/vuetify'
  ],
  serverMiddleware: [
    '~/serverMiddleware/api'
  ],
  vuetify: {
    defaultAssets: {
      font: false,
      icons: false
    }
  },
  /**
   * Axios module configuration
   */
  axios: {
    credentials: true,
    proxy: true
  }
}

export default config