export default {
  head: {
    title: 'fate0new',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { hid: 'theme-color', name: 'theme-color', content: '#53adcb' }
    ],
    link: [{ rel: 'stylesheet', href: 'https://pro.fontawesome.com/releases/v6.0.0-beta1/css/all.css' }]
  },

  css: [],

  plugins: [],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
  ],

  modules: [
    'nuxt-buefy',
    '@nuxtjs/axios'
  ],

  build: {
    extend(config) {
      config.node = {
          fs: "empty"
      }
    }
  }
}
