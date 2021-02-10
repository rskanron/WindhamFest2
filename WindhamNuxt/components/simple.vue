<template>
  <div>
    <v-parallax dark app v-bind:src="this.banner_image">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-2 font-weight-light">{{ this.heading }}</h1>
          <br>
          <h2 class="font-weight-thin">{{ this.subHeading }}</h2>
        </v-col>
      </v-row>
      <v-row></v-row>
    </v-parallax>

    <v-main>
      <v-container>
        <v-layout column justify-center align-center>
          <v-flex xs12 sm8 md6 body-2>      
            <section v-html="body"></section>
            <!-- TODO: implement text snippets -->
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>

    <v-spacer></v-spacer>

  </div>
</template>

<script>
  export default {
    props: {
      banner_image: {
        type: String,
        require: true,
      },
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
    }
  }
</script>
