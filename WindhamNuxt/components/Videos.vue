<template>
    <v-content>
        <v-container>
            <div>

                <h1>{{ heading }}</h1>
                <h2>{{ subHeading }}</h2>
                <p v-html="description"></p>

                <br>
                    {{ description }}
                <br>

                <!-- TODO: style videos -->
                <div v-for="video in videos" :key="video.heading">
                    <h3>{{ video.heading }}</h3>
                    <h2 v-html=video.description></h2>
                    <iframe 
                        :src="video.video_url" 
                        frameborder="0" 
                        webkitallowfullscreen 
                        mozallowfullscreen 
                        allowfullscreen>
                    </iframe>
                </div>
        
                <br>

                <p style="text-align: center;" class="vimeo-description">
                    Videos Produced by Geoff Thomas - <a href="https://vimeo.com/hunglowfilms">Hung Low Films</a>
                </p>

            </div>
        </v-container>
    </v-content>
</template>

<script>
    export default {
        props: [
            "heading", 
            "subHeading",
            "description", 
            "videos", 
            "postVideosDescription",
        ],
    }
</script>

<style scoped>

    h3 {
        color: var(--v-primary-base);
    }

    /* #videos {
        text-align: center;
    }

    #video-reel {
        display: flex;
        flex-wrap: wrap;
    }

    #video-reel>* {
        flex: 1 1 338px;
        min-height: 250px;
        margin: 0em 1em;
    }

    iframe {
        padding-bottom: 56.25%;
        padding-bottom: 40%;
        width: 100%;
        max-width: 600px;
        max-height: 338px;
        height: 100%;
     } */

</style>