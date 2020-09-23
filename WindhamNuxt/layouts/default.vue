<template>
  <v-app dark>
    
   <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in navigation" :key="i" :to="item.path" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.text" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  
    <nuxt />

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

<style>  
  h1 {
    color: var(--v-primary-base);
  }
  h2 {
    color: var(--v-secondary-base);
  }
  h3 {
    color: var(--v-accent-base);
  }
</style>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState({
        navigation: state => state.modules.navigation.navigation,
      })
    },
    data () {
      return {
        expand: false,
        clipped: false,
        drawer: false,
        fixed: false,
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
