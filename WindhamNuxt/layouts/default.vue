<template>
  <v-app dark>
    
   <!-- <v-navigation-drawer v-model="sidebar" temporary app>
      <v-list>
        <v-list-item v-for="(item, i) in navigation" :key="i" :to="item.path" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            {{item.text}}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <v-app-bar app>
      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar" />
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ title }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          text
          v-for="(item, i) in navigation" :key="i" :to="item.path"
        >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.text }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <nuxt />

    <v-footer :absolute=true app>
      <!-- <v-layout justify-center row wrap>
          <a href="https://nuxtjs.org"><img alt="nuxt logo" width="150" src="~/assets/images/built-with-nuxt-white.svg"></a>
      </v-layout>       -->
      <v-layout justify-center row wrap>
          <a href="https://buttercms.com/"><img width="243" height="61" src="https://cdn.buttercms.com/JSSDbrHPSnGlLUcyHTn5"></a>
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
        sidebar: false,
        title: 'Windhamfest'
      }
    },
    mounted () {
      this.expand = true;
    }
  }
</script>
