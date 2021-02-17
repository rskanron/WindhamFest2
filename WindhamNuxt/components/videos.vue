<template>
    <v-main>
        <v-container>
            <h1 style="text-align: center">{{ heading }}</h1>
            <h2 style="text-align: center">{{ subHeading }}</h2>
            <p style="text-align: center" v-html="description"></p>

            <v-row class="mb-12">
                <v-col 
                    v-for="video in videos"
                    :key="video.heading"
                    :cols="12"
                    :xl="3"
                    :lg="4"
                    :md="4"
                    :sm="6"
                >
                    <v-card class="" outlined tile>

                        <h3 style="text-align: center;">{{ video.heading }}</h3>

                        <div style="padding:56.25% 0 0 0;position:relative;">
                            <iframe 
                                :src="video.video_url + `?title=0&byline=0`"
                                style="position:absolute;top:0;left:0;width:100%;height:100%;" 
                                frameborder="0" 
                                allow="autoplay; fullscreen; accelerometer; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                            >
                            </iframe>
                        </div>
                            
                        <h3 v-html=video.description></h3>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        
        <p style="text-align: center;" class="vimeo-description">
            Videos Produced by Geoff Thomas - <a href="https://vimeo.com/hunglowfilms">Hung Low Films</a>
        </p>

    </v-main>


</template>

<script src="https://player.vimeo.com/api/player.js"></script>

<script>
    export default {
        props: [
            "heading", 
            "subHeading",
            "description", 
            "videos", 
            "postVideosDescription",
        ],

        computed: {
            colWidth () {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs': return 12
                    case 'sm': return 12
                    case 'md': return 6
                    case 'lg': return 4
                    case 'xl': return 3
                }
            }
      },

    }
</script>

<style scoped>

</style>