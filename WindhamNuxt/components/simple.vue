<template>
  <div>
     <v-img
     contain
      :max-height="600"
      :src="this.banner_image"
    ></v-img>

    <!-- <v-parallax dark app v-bind:src="this.banner_image">
      <v-row v-if="this.heading" align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 id="mainHeading" class="display-2 font-weight-heavy">{{ this.heading }}</h1>
          <br>
          <h2 id="subHeading" class="font-weight-thin">{{ this.subHeading }}</h2>
        </v-col>
      </v-row>
      <v-row></v-row>
    </v-parallax> -->

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

<style scoped>
#mainHeading {
  text-align: center;
  vertical-align: middle;
  margin: auto;
  margin-top: 2%;
  color: white;
  border-style: ridge;
  border-width: 8px;
  width: 300px;;
  line-height: 250%;
  border-color: white; 
  border-radius: 10px;
  background-color: red; 
}

#subHeading {
  font-family:monospace;
}
</style>


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
