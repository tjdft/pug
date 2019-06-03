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
  /**
   * Axios module configuration
   */
  axios: {
    credentials: true,
    proxy: true
  }
  // proxy: {
  //   '/sonar/': {
  //     target: `${process.env.SONAR_URL}/api`,
  //     pathRewrite: { '^/sonar': '' },
  //     secure: false,
  //     onProxyReq: proxyReq => {
  //       // Sonar basic auth token need to be converted to base64
  //       proxyReq.setHeader(
  //         'Authorization',
  //         `Basic ${Buffer.from(process.env.SONAR_TOKEN + ':', 'ascii').toString(
  //           'base64'
  //         )}`
  //       )
  //     }
  //   },
  //   '/openshift/': {
  //     target: `${process.env.OPENSHIFT_URL}`,
  //     pathRewrite: { '^/openshift': '' },
  //     secure: false,
  //     onProxyReq: proxyReq => {
  //       proxyReq.setHeader(
  //         'Authorization',
  //         `Bearer ${process.env.OPENSHIFT_TOKEN}`
  //       )
  //     }
  //   },
  //   '/sentry/': {
  //     target: `${process.env.SENTRY_URL}`,
  //     pathRewrite: { '^/sentry': '' },
  //     secure: false,
  //     onProxyReq: proxyReq => {
  //       proxyReq.setHeader(
  //         'Authorization',
  //         `Bearer ${process.env.SENTRY_TOKEN}`
  //       )
  //     }
  //   },
  //   '/smax/': {
  //     target: `${process.env.SMAX_URL}`,
  //     pathRewrite: { '^/smax': '' },
  //     secure: false,

  //     onProxyReq: (proxyReq, req) => {

  //       console.log(proxyReq)

  //       // let token

  //       // this.$axios.post(`${process.env.SMAX_URL}/auth/authentication-endpoint/authenticate/login?TENANTID=${process.env.SMAX_TENANTID}`, {
  //       //   'Login': process.env.SMAX_USER,
  //       //   'Password': process.env.SMAX_PASSWORD
  //       // }).then(response => {
  //       //     // TODO: We got a token            
  //       //     if (response.data && response.data.length === 1580) {
  //       //         token = response.data
  //       //     }
  //       // })

  //       // proxyReq.setHeader('Cookie', `LWSSO_COOKIE_KEY=${token}`)


  //       // req.setHeader('Cookie', 'LWSSO_COOKIE_KEY=444')
  //       //   let bodyData = JSON.stringify({
  //       //     'Login': process.env.SMAX_USER,
  //       //     'Password': process.env.SMAX_PASSWORD
  //       //   });
  //       //   console.log(proxyReq.config)
  //       //   proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
  //       //   proxyReq.write(bodyData)
  //       //   console.log(proxyReq.config)
  //       //   req.params = {
  //       //     'Login': process.env.SMAX_USER,
  //       //     'Password': process.env.SMAX_PASSWORD
  //       //   };
  //       //   proxyReq.setHeader(
  //       //     'Authorization',
  //       //     `Bearer ${process.env.SENTRY_TOKEN}`
  //       //   )
  //     }
  // }
  // }
}

export default config