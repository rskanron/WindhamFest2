import colors from 'vuetify/es5/util/colors'

import dotenv from 'dotenv'
import Butter from 'buttercms';
import request from 'sync-request';

const config = dotenv.config()
if(config.error){
  console.log('Could not load env file', config.error)
} else {
  console.log('------- env file loaded --------')
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
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' }
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
  ** https://v15.vuetifyjs.com/en/framework/theme/
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
          primary: colors.blue.darken4,
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
  
      routes.pop();

      var pageTypes = [
        'simple',
        'videos'
      ]

      console.log("CURRENT DIRECTORY: " + __dirname);

      pageTypes.forEach(pageType => {
        let simplePagesResponse = request(
          'GET', 
          `https://api.buttercms.com/v2/pages/${pageType}?auth_token=${process.env.VUE_APP_BUTTER_API_KEY}`);
          
        var pagesJson = JSON.parse(simplePagesResponse.getBody()).data;

        const simplePageComponent = resolve(__dirname, `components/${pageType}.vue`)

        let pageRoutes = mapPagesToRoutes(pagesJson, simplePageComponent)
            
        if (pageRoutes) {
          pageRoutes.forEach(pageRoute => routes.push(pageRoute))
        }
      });
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
      let route = {
        name: page.slug,
        path: '/' + page.slug,
        component: component,
        chunkName: chunkName,
        props: page.fields,
      };
  
      pageRoutes.push(route);

      if (page.slug.toLowerCase() == "home")
      {
        let defaultRoute = JSON.parse(JSON.stringify(route));
        defaultRoute.name = '';
        defaultRoute.path = '/';
        pageRoutes.push(defaultRoute);
      }
  });

  return pageRoutes;
}


