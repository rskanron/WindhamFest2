<template>

  <v-layout column justify-center align-center>

    <v-flex xs12 sm8 md6 body-2>

      <h1>SIMPLE PAGE</h1>

      <h2>Heading: {{page.fields.heading}}</h2>

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

export default {
  name: 'SimplePage',
  props: ['page'],
}
</script>
