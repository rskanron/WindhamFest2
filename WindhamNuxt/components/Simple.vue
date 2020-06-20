<template>

  <v-layout column justify-center align-center>

    <v-flex xs12 sm8 md6 body-2>

      <h1>{{ this.heading }}</h1>

      <h2>{{ this.subHeading }}</h2>

      <section v-html="body"></section>

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
  import { mapState } from 'vuex'

  export default {
    props: {
      heading: {
        type: String,
        required: true
      },
      subHeading: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true
      }
    },
    computed: {
      ...mapState({
        layout: state => state.modules.layout.layout,
      })
    },
  }
</script>
