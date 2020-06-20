<template>
    <div>
        <p>Slug Page</p>
        <component v-bind:is="componentInstance" v-bind:page="page"></component>
    </div>
</template>

<script>

// Using Nuxt's built-in dynamic router, use this as the catch-all route to load other components dynamically
// This allows for any slug to be mapped to any component, beyond the pattern matching that comes with Nuxt based on the route
// This project was using this but is instead using the extendRoutes method in the config to assign the components and data

import axios from 'axios'

    export default {

        asyncData({params, error, payload}) {
            if (payload) {
                
                console.log('_slug - PAYLOAD:')
                console.log(payload)

                return {
                    page: payload                
                }

            } else if (process.server) {

                console.log("_slug - IS SERVER");
                console.log("_slug - PARAMS:");
                console.log(params)

                var pages = JSON.parse(require('fs').readFileSync('./butter_content/allSiteContent.json', 'utf8'));
                var currentPageContent = pages.data.find(p => p.slug == params.slug);
                console.log(currentPageContent);   

                return {
                    page: currentPageContent
                }

            } else {

                console.log('_slug - FALLBACK')

                var allButterContentResponse = {};

                return axios.get('/allSiteContent.json', 'utf8')
                    .then(response => {
                        console.log('_slug - AXIOS RESPONSE:')
                        console.log(response);
                        var pages = response.data.data;
                        var currentPageContent = pages.find(page => page.slug == params.slug);
                        console.log(currentPageContent);               
                        
                        return {
                            page: currentPageContent
                        }
                    }
                );

            }
        },

        computed: {
            componentInstance () {
                console.log("_slug - COMPUTING INSTANCE, this.PAGE:")
                console.log(this.page)
                if (this.page && this.page.page_type) {
                    const pageType = this.page.page_type;
                    const moduleName = pageType[0].toUpperCase() + pageType.slice(1);

                    return () => import(`../components/${moduleName}.vue`)
                } 
            }
        }, 

    }
</script>