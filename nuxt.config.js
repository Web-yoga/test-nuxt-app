const bodyParser = require('body-parser')
const axios = require('axios')

export default {
  // Target: https://go.nuxtjs.dev/config-target
  //server | static
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'test-nuxt-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
	  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Acme&display=swap' },
    ]
  },

  loading:{
	color: '#98c223',
	height: '5px',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
	'bootstrap/dist/css/bootstrap.css',
	'~assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
	'~plugins/core-components.js',
	'~plugins/date-filter.js',
	{ src: '~/plugins/infiniteloading', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
	['@nuxtjs/axios']
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env: {
	baseUrl: process.env.BASE_URL || 'https://nuxt-blog-dffff-default-rtdb.firebaseio.com',
	fireBaseAPIKey: 'AIzaSyBV-8H8j2rC3JKm5VKtOpnQK3FyENsEUAs'
  },

  transition: {
	name: 'fade',
	mode: 'out-in',
  },

serverMiddleware: [
	bodyParser.json(),
	'~/api'
],
generate: {
	//роуты для генерации динамических страниц (если static)
    routes: function() {
		//Возвращает массив динамических страниц для генерации
      return axios
        .get("https://nuxt-blog-dffff-default-rtdb.firebaseio.com/posts.json")
        .then(res => {
          const routes = [];
          for (const key in res.data) {
			//формируем роуты из id страниц, которое приходит как key и динамич данных
            routes.push({
              route: "/posts/" + key,
              payload: {postData: res.data[key]}
            });
          }
          return routes;
        });
    }
  },
}
