<template>
  <v-app dark>
  
    <v-parallax dark app v-bind:src="this.layout.banner_image">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-3 font-weight-thin">{{ this.layout.heading }}</h1>
        </v-col>
      </v-row>
      <v-row></v-row>
    </v-parallax>
    
   <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in navigation" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-app-bar :clipped-left="clipped" fixed app >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>

    <div style="text-align: center">
    </div>

    <v-footer :absolute=true app>
      <v-layout justify-center row wrap>
          <a href="https://nuxtjs.org"><img alt="nuxt logo" width="250" src="~/assets/images/built-with-nuxt-white.svg"></a>
      </v-layout>      
      <v-layout justify-center row wrap>
          <a href="https://buttercms.com/"><img width="486" height="121" src="https://cdn.buttercms.com/JSSDbrHPSnGlLUcyHTn5"></a>
      </v-layout>
      <v-layout justify-center row wrap>
          <span>&copy; Rick Skanron {{ new Date().getFullYear() }}</span>
      </v-layout>  
    </v-footer>

  </v-app>

</template>

<script>

import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      layout: state => state.modules.layout.layout,
    })
  },
  data () {
    return {
      expand: false,
      clipped: false,
      drawer: false,
      fixed: false,
      navigation: [
        {
          icon: 'home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-video',
          title: 'Videos',
          to: '/videos'
        },
        {
          icon: 'mdi-music',
          title: 'Music',
          to: '/Music'
        },
      ],
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: 'WindhamFest'
    }
  },
  mounted () {
    this.expand = true;
  }
}
</script>
