import colors from 'vuetify/es5/util/colors'

import dotenv from 'dotenv'
import Butter from 'buttercms';
import request from 'sync-request';

const config = dotenv.config()
if(config.error){
  console.log('Could not load env file', config.error)
} else {
  console.log('------- env file loaded --------')
  console.log(config)
}

const isDev = process.env.NODE_ENV !== 'production';

export default {
  mode: 'universal',
  render: {
    ssr: true,
  },
  /*
  ** @nuxtjs/pwa module options
  */
  pwa: {
    manifest: {
      lang: 'en',
      name: "PWATestApp",
      short_name: "PWA/Nuxt - Test App",
      display: 'standalone',
      theme_color: '#F11010',
    },
    workbox: {
      dev: isDev // Put workbox module into development mode based on current NODE_ENV variable
    }
  },

  /*
  ** Headers of the page
  */
 head: {
  titleTemplate: '%s - ' + process.env.npm_package_name,
  title: process.env.npm_package_name || '',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
},
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // auto-loads components. May be useful but wasn't loaded in time for use with setting up routes
    // '~/plugins/componentLoader.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      options: {
        customProperties: true,
      },
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // https://medium.com/js-dojo/debugging-nuxt-js-with-vs-code-60a1a9e75cf6
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  },
  router: {
    extendRoutes(routes, resolve) {
      console.log("EXTEND ROUTES")
      console.log(process.env.VUE_APP_BUTTER_API_KEY)
  
      let simplePagesResponse = request(
        'GET', 
        `https://api.buttercms.com/v2/pages/simple?auth_token=${process.env.VUE_APP_BUTTER_API_KEY}`);
        
      var simplePagesJson = JSON.parse(simplePagesResponse.getBody()).data;
      const simplePageComponent = resolve(__dirname, 'components/simple.vue')

      simplePageRoutes = mapPagesToRoutes(simplePagesJson, simplePageComponent)
        
      console.log("FINISHED GETTING ROUTES)")

      if (simplePageRoutes)
        simplePageRoutes.forEach(r => routes.push(r))
    }
  },
  // see https://github.com/nuxt-community/router-module
  // If you are using SPA mode, add an index / route to generate section of nuxt.config.js:
  // generate: {
    // routes: [
    //   '/'
    // ]
  // }
}

var mapPagesToRoutes = function(pages, component) {
  var pageRoutes = [];

  pages.forEach((page) => {
      let componentName = page.page_type; 
      let chunkName = `pages_${componentName}_${page.slug}`;  
      var route = {
        name: page.slug,
        path: '/' + page.slug,
        component: component,
        chunkName: chunkName,
        props: page.fields,
      };
  
      pageRoutes.push(route);
  });

  return pageRoutes;
}


