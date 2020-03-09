<template>
<div id="music_page">

    <h1 class="page_title">Music</h1>

    <h3>Post-Smackdown music lineup and more</h3>

    <div id="playlists">

        <div id="laura_lynn" class="playlist">

            <h2>Laura Lynn</h2>

            <iframe scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/5334840&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
        </div>

        <div id="nappy_pipes" class="playlist">

            <h2>Nappy Pipes</h2>

            <iframe scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/1247432&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
        </div>

        <div id="djrt_playlist" class="playlist">

            <h2>DJ RT - AKA Fluff</h2>

            <p>The original Windhamfest DJ</p>

            <iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/5309651&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                scrolling="no" frameborder="no" allow="autoplay"></iframe>
        </div>

        <div id="spotify_playlist" class="playlist">

            <h2>Summer's Eve Cove Playlist</h2>

            <p>
                <a href="https://open.spotify.com/user/rskanron/playlist/1XazFsIQ0Ve8ZqnrO9enEC">Click here</a>
                to listen to full songs and edit
            </p>

            <iframe src="https://open.spotify.com/embed/user/rskanron/playlist/1XazFsIQ0Ve8ZqnrO9enEC" 
                frameborder=0 allowtransparency="true" allow="encrypted-media"></iframe>
        </div>

    </div>    
    
</div>
    
</template>

<style scoped>

    #music_page {
        text-align: center;
    }

    #playlists {
        display: flex;
        flex-wrap: wrap;
    }


    .playlist {
        margin: auto;
        width: 90%;
        min-width: 300px;
        max-width: 600px;
        margin-bottom: 50px;
    }

    .playlist > iframe {
        width: 100%;
        height: 550px;
        flex: 1 1 310px;
    }


</style>
