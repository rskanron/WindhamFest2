<template>

  <v-layout column justify-center align-center>

    <v-flex xs12 sm8 md6 body-2>

      <h1>SIMPLE PAGE</h1>

      <h2>Heading: {{ page.heading }}</h2>

      <!-- heading -->
      <!-- body -->
      <!-- text snippets -->

    </v-flex>

  </v-layout>

</template>

<style>  
  h3 {
    color: var(--v-primary-base);
  }
</style>

<script>
import axios from 'axios'

export default {
  // name: 'SimplePage',
  // props: ['page'],
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
            page: currentPageContent.fields
        }

    } else {

        console.log('_slug - FALLBACK')

        var allButterContentResponse = {};
        console.log(params.slug)

        return axios.get('/allSiteContent.json', 'utf8')
            .then(response => {
                console.log('_slug - AXIOS RESPONSE:')
                console.log(response);
                var pages = response.data.data;
                var currentPageContent = pages.find(page => page.slug == params.slug);
                console.log(currentPageContent);               
                
                return {
                    page: currentPageContent.fields
                }
            }
        );

    }
  },

}
</script>
