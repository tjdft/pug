const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const pkg = require('./package')
require('dotenv').config()

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'PUG',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Nunito:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['~/assets/style/app.styl'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/vuetify', '@/plugins/model'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/moment',
    '@nuxtjs/toast',
    [
      // All env vars are loaded through `@nuxtjs/dotenv` module.
      // But, all variables listed here can be replaced at run time through `nuxt-env` module
      // In pages/components use `this.$env.VAR_NAME` instead of `process.env.VAR_NAME`
      'nuxt-env',
      {
        keys: [
          'TV_MODE',
          'TV_TRANSITION_INTERVAL',
          'TV_DASHBOARDS',
          'OPENSHIFT_URL',
          'OPENSHIFT_REFRESH_INTERVAL',
          'SENTRY_URL',
          'SENTRY_REFRESH_INTERVAL',
          'SONAR_URL',
          'SONAR_REFRESH_INTERVAL'
        ]
      }
    ]
  ],

  /*
  ** Toast module configuration
  */
  toast: {
    duration: 5000,
    icon: 'notifications',
    className: 'application',
    position: 'top-center'
  },

  /*
  ** Axios module configuration
  */
  axios: {
    credentials: true,
    proxy: true
  },

  /*
  ** Proxy module configuration
  */
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

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
