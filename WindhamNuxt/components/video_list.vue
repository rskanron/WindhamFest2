<template>
    <div id="videos">

        <h1>{{ heading }}</h1>
        <h2>{{ subHeading }}</h2>
        <p v-html="description"></p>

        <br>
        <br>

        <div id="video-reel">
            
            <div id="windoomfest1">
                <iframe src="https://player.vimeo.com/video/272444046" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            </div>
            
            <div id="windoomfest2">
                <!-- <iframe src="https://www.youtube.com/embed/NShuitIuKnM?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> -->
            </div>
            <div id="windhamfestTrailer" >
                <!-- <iframe src="https://player.vimeo.com/video/52329817" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> -->
            </div>
            <div id="windievalTimesRockumentary" >
                <!-- <iframe src="https://www.youtube-nocookie.com/embed/n0GoiWoX7bU?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> -->
            </div>
            <div id="super_windhamfest_rockumentary" >
                <!-- <iframe src="https://player.vimeo.com/video/96666573" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> -->
            </div>
            <div id="backToWinhamfestVideo" >
                <!-- <iframe src="https://player.vimeo.com/video/176507100" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> -->
            </div>
            <div id="backToWinhamfestVideo2" >
                <!-- <iframe src="https://player.vimeo.com/video/174276567" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> -->
            </div>
            <div id="right_things_motos" >
                <!-- <iframe src="https://www.youtube-nocookie.com/embed/B8yUvynCf-g?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> -->
            </div>
            <div id="swim_race" >
                <!-- <iframe src="https://www.youtube-nocookie.com/embed/ZXHXnmQ1vHI?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> -->
            </div>
        </div>
        
        <br>

        <p style="text-align: center;" class="vimeo-description">
            Videos Produced by Geoff Thomas - <a href="https://vimeo.com/hunglowfilms">Hung Low Films</a>
        </p>

    </div>
</template>

<script>

    export default {
        props: [
            "heading", 
            "subHeading",
            "description", 
            "videos", 
            "postVideosDescription",
        ]
    }

</script>


<style scoped>

    #videos {
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
        /* secret sauce for uniform 16:9ish dimensions */
        /* padding-bottom: 56.25%; */
        padding-bottom: 40%;
        width: 100%;
        max-width: 600px;
        max-height: 338px;
        height: 100%;
    }

</style>