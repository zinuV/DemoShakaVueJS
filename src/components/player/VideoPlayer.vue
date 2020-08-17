<template>
  <div
    class="video-player"
    ref="videoContainer"
    data-shaka-player-container
    data-shaka-player-cast-receiver-id="7B25EC44"
  >
    <video autoplay data-shaka-player class="video-current" ref="videoCurrent" />
  </div>
</template>

<script>
const shaka = require("../../../node_modules/shaka-player/dist/shaka-player.ui.js");

export default {
  name: "VideoPlayer",
  data() {
    return {};
  },
  props: {
    manifestUri: String,
    setVideoPlay: Boolean,
    eventKey: Boolean,
  },
  watch: {
    setVideoPlay: function () {
      var video = this.$refs.videoCurrent;
      if (this.setVideoPlay) video.play();
      else video.pause();
    },
  },
  mounted() {
    var self = this;
    // Init shaka player ---------------------------

    const video = self.$refs.videoCurrent;
    const videoContainer = self.$refs.videoContainer;
    const player = new shaka.Player(video);
    const ui = new shaka.ui.Overlay(player, videoContainer, video);
    const controls = ui.getControls();

    // Listen for error events.
    player.addEventListener("error", self.onErrorEvent);

    // Try to load a manifest.
    // This is an asynchronous process.
    player
      .load(self.manifestUri)
      .then(function () {
        // This runs if the asynchronous load is successful.
      })
      .catch(self.onError); // onError is executed if the asynchronous load fails.

    // ---------------------------------------------------------

    // Update video's status

    video.addEventListener("timeupdate", () => {
      // event up
      self.$emit("updateVideoStatus", {
        play: !video.paused,
        currentTime: video.currentTime,
        duration: video.duration,
        ended: video.ended,
      });
    });
  },
};
</script>

<style>
.shaka-controls-container {
  display: none;
}

.video-player .video-current {
  width: 100%;
  height: 100%;
}
</style>