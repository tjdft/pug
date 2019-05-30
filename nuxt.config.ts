import NuxtConfiguration from '@nuxt/config'
require('dotenv').config()

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
    API_URL: "http://localhost:8080"
  },
  css: [
    '@/assets/style/app.scss'
  ],
  plugins: [
    '@/plugins/vue-api-query'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],
  devModules: [
    '@nuxtjs/vuetify'
  ],
  /**
   * Axios module configuration
   */
  axios: {
    credentials: true,
    proxy: true
  },
  proxy: {
    '/sonar/': {
      target: `${process.env.SONAR_URL}/api`,
      pathRewrite: { '^/sonar': '' },
      secure: false,
      onProxyReq: proxyReq => {
        // Sonar basic auth token need to be converted to base64
        proxyReq.setHeader(
          'Authorization',
          `Basic ${Buffer.from(process.env.SONAR_TOKEN + ':', 'ascii').toString(
            'base64'
          )}`
        )
      }
    },
    '/openshift/': {
      target: `${process.env.OPENSHIFT_URL}`,
      pathRewrite: { '^/openshift': '' },
      secure: false,
      onProxyReq: proxyReq => {
        proxyReq.setHeader(
          'Authorization',
          `Bearer ${process.env.OPENSHIFT_TOKEN}`
        )
      }
    },
    '/sentry/': {
      target: `${process.env.SENTRY_URL}`,
      pathRewrite: { '^/sentry': '' },
      secure: false,
      onProxyReq: proxyReq => {
        proxyReq.setHeader(
          'Authorization',
          `Bearer ${process.env.SENTRY_TOKEN}`
        )
      }
    }
  },
}

export default config