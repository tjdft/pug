import NuxtConfiguration from '@nuxt/config'

const config: NuxtConfiguration = {
  mode: 'spa',
  head: {
    title: "pug",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "A cute puppy that displays dashboards on your TV" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Muli:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i|Material+Icons'
      }
    ]
  },
  env: {
    API_URL: "http://localhost:8080/"
  },
  css: [
    '@/assets/style/app.scss'
  ],
  plugins: [
    '@/plugins/vue-api-query'
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  devModules: [
    '@nuxtjs/vuetify'
  ],
  axios: {
    baseURL: process.env.API_URL
  },
}

export default config