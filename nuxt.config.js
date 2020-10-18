module.exports = {
  /*
  ** Headers of the page
  */
  mode: 'universal',
  target: 'server',
  head: {
    title: 'skillline-test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
  ],
  axios: {
    // prefix: '/api/',
    credentials: true,
    baseURL: process.env.API_URL || 'https://api-test.skillline.ru/',
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  bootstrapVue: {
    icons: true,
    bootstrapCSS: false,
    bootstrapVueCSS: false,
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
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

