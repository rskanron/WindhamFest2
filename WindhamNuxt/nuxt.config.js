import colors from 'vuetify/es5/util/colors'
import axios from 'axios'

// Butter's JS library doesn't create the route I need to get all pages. See generate: routes() below
// import Butter from 'buttercms';
// const butter = Butter('api_key');

const isDev = process.env.NODE_ENV !== 'production';

export default {
  mode: 'spa',
  render: {
    ssr: false,
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

      //  console.log('CALLING THE API');
      //   axios.get('https://api.buttercms.com/v2/pages/simple?auth_token=b3c9a561dcfeb322516598e4f037b0ffa65a3ef1')
      //     .then((response) => {
      //       const simplePages = response.data.data;
      //       turnPagesIntoRoutes(simplePages);
      //     });
      // }

      console.log('GETTING LOCAL DATA');
      var siteContent = JSON.parse(require('fs').readFileSync('./butter_content/allSiteContent.json', 'utf8'));
      var pageRoutes = turnPagesIntoRoutes(siteContent.data, resolve);
      
      routes = pageRoutes.forEach(pr => routes.push(pr));
      console.log('EXTENDED ROUTES');
      console.log(routes);
    }
  },
  generate: {
    fallback: true, // Per https://nuxtjs.org/faq/netlify-deployment/ -- note: no longer using netlify
    async routes() {
      // TODO: butter's JS library doesn't create the route I need to get all pages
      // butter.page.retrieve('*', '').then((response) => {
      //   console.log(response.data);
      // });

      // var all = butter.page.list('*')
      //   .then((response) => {
      //     console.log(response.data);
      // });

      // console.log(all);

      console.log('CALLING THE API')

      const response = await axios.get('https://api.buttercms.com/v2/pages/simple?auth_token=b3c9a561dcfeb322516598e4f037b0ffa65a3ef1');
      const simplePages = response.data.data;
      
      const routes = simplePages.map((page) => {
        // console.log(page);
        return {
          // name: page.slug,
          route: '/' + page.slug,
          // components: {
          //   default: `./components/Simple.vue`,
          //   top: `./components/${page.page_type}.vue`,
          // },
          // chunkNames: {
          //   top: `./components/${page.page_type}`,
          // },
          payload: page,
        } 
      });

      console.log('GENERATED ROUTES');
      // console.log(routes);

      return routes;
    }
  }

}

var turnPagesIntoRoutes = function(pages, resolve) {

  var pageRoutes = [];

  pages.forEach((page) => {
    // console.log("PAGE FROM BUTTER:")
    // console.log(page)

    let componentPath = '';
    let chunkName = '';
    switch(page.page_type) {
      case "Simple": 
        componentPath = 'components/Simple.vue'
        chunkName = 'pages/Simple'
      default:
        componentPath = 'components/Simple.vue'
        chunkName = 'pages/Simple'
    }
    
    var route = {
      name: page.slug,
      path: '/' + page.slug,
      component: resolve(__dirname, './components/Simple.vue'),
      chunkName: chunkName,
      // component: resolve('~/components/Simple.vue'),
      // components:{
      //   default: './components/Simple.vue',
      //   top: './components/Simple.vue',
      // },
      payload: page,
    };

    pageRoutes.push(route);
    console.log(`CREATED ROUTE FOR ${page.slug}`)
    console.log(route);
  });

  return pageRoutes;
}
