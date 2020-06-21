import colors from 'vuetify/es5/util/colors'
import axios from 'axios'

// Butter's JS library doesn't create the route I need to get all pages. See generate: routes() below
// import Butter from 'buttercms';
// const butter = Butter('api_key');

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
    extendRoutes (routes, resolve) {
      // doing anything asyncronously here blows past this entire method (until it's too late in the build), even if it's awaited!!
      // await axios.get('https://api.buttercms.com/v2/pages/simple?auth_token=b3c9a561dcfeb322516598e4f037b0ffa65a3ef1')
      //   .then(response => { pages = response.data.data });
      let pages = JSON.parse(require('fs').readFileSync('./butter_content/allSiteContent.json', 'utf8')).data;
      let pageRoutes = turnPagesIntoRoutes(pages, resolve);
      pageRoutes.forEach(pr => routes.push(pr));
      console.log(routes)
    }
  },
  // generate is not needed since all routes are explicitly defined above (no pattern matching)
  // generate: {
    // Since switching to Vuex, fallback doesn't mean anything here for the catch-all route (not used anymore) using asyncData().
    // Would need to implement fallbacks in the setup of Vuex modules
    // fallback: true, // Per https://nuxtjs.org/faq/netlify-deployment/ -- note: no longer using netlify
    // async routes() {
    //   // TODO: butter's JS library doesn't create the route I need to get all pages
    //   // butter.page.retrieve('*', '').then((response) => {
    //   //   console.log(response.data);
    //   // });

    //   // var all = butter.page.list('*')
    //   //   .then((response) => {
    //   //     console.log(response.data);
    //   // });

    //   // console.log(all);

    //   console.log('CALLING THE API')

    //   const response = await axios.get('https://api.buttercms.com/v2/pages/simple?auth_token=b3c9a561dcfeb322516598e4f037b0ffa65a3ef1');
    //   const simplePages = response.data.data;
      
    //   const routes = simplePages.map((page) => {
    //     return {
    //       route: '/' + page.slug,
    //       // payload: page,
    //     } 
    //   });

    //   console.log('GENERATED ROUTES');

    //   return routes;
    // }
  // }

}

var turnPagesIntoRoutes = function(pages, resolve) {
  // Tried a better way to ensure components are available for use, but require isn't available. I suppose I could be imported? Didn't feel like messing with it here.
  // const possibleComponents = require.context('@/components', false, /[a-zA-Z]\w+\.(vue)$/);

  var pageRoutes = [];

  pages.forEach((page) => {
    let componentName = page.page_type; 

    console.log("LOOKING FOR COMPONENT " + componentName)
    let componentExists = require('fs').existsSync(`./components/${componentName}.vue`)
    
    if (componentExists) {
      let componentPath = resolve(__dirname, `./components/${componentName}.vue`);
      let chunkName = `pages_${componentName}_${page.slug}`;
      console.log(componentPath)

      var route = {
        name: page.slug,
        path: '/' + page.slug,
        component: componentPath,
        chunkName: chunkName,
        props: page.fields,
      };
  
      pageRoutes.push(route);

    } else {
      console.log(`Couldn't find component for page type ${componentName}`)
    }

  });

  return pageRoutes;
}
