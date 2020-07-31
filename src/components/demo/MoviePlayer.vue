<template>
  <div class="movie-player">
    <div
      data-shaka-player-container
      style="max-width: 40em;"
      data-shaka-player-cast-receiver-id="7B25EC44"
      ref="videoContainer"
    >
      <video
        autoplay
        data-shaka-player
        id="video"
        ref="videoCurrent"
        style="width: 100%; height: 100%;"
        src="https://media.istockphoto.com/videos/moon-moving-behind-the-trees-video-id1018241970"
      ></video>
    </div>
  </div>
</template>

<script>
const shaka = require("../../../node_modules/shaka-player/dist/shaka-player.ui.js");
// console.log('helloooo');
// console.log(shaka);

export default {
  name: "MoviePlayer",
  data() {
    return {};
  },
  mounted() {
   
    const manifestUri =
      "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";

  const video =this.$refs.videoCurrent;
  // Get a reference to the video container (a simple div which wraps the video)
  const videoContainer = this.$refs.videoCurrent;
  // Construct a player
  const player = new shaka.Player(video);
  // Construct the UI overlay
  const ui = new shaka.ui.Overlay(player, videoContainer, video);
 


  const config = {
        controlPanelElements: ["rewind", "play_pause", "fast_forward"],
    };
    
  ui.configure(config);


   const controls = ui.getControls();
console.log(window.player)
    window.player = player;
  window.ui = ui;

  player.load(manifestUri);








  },
};
</script>
<style></style>
