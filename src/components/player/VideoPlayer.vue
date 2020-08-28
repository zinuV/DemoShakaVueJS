<template>
  <div
    class="video-player"
    ref="videoContainer"
    data-shaka-player-container
    data-shaka-player-cast-receiver-id="7B25EC44"
  >
    <video muted autoplay data-shaka-player class="video-current" ref="videoCurrent" />
  </div>
</template>

<script>
const shaka = require("../../../node_modules/shaka-player/dist/shaka-player.ui.js");
const muxjs = require("../../../node_modules/mux.js/dist/mux");

export default {
  name: "VideoPlayer",
  data() {
    return {};
  },
  props: {
    manifestUri: String,
    setVideoPlay: Boolean,
    setVideoCurrentTime: Number,
    eventKey: Boolean,
    setVideoSpeed: Number,
  },
  watch: {
    setVideoPlay: function () {
      var video = this.$refs.videoCurrent;
      if (this.setVideoPlay) video.play();
      else video.pause();
    },
    setVideoCurrentTime: function (newCurrentTime) {
      var video = this.$refs.videoCurrent;
      video.currentTime = newCurrentTime;
    },
    setVideoSpeed: function (newSpeed) {
      var video = this.$refs.videoCurrent;
      video.playbackRate = newSpeed;
      // player.trickPlay(newSpeed);
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

    // Assigned muxjs
    window.muxjs = muxjs;

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

    // console.log(player);
    // player.trickPlay(2);

    // ---------------------------------------------------------

    // Update video's status

    video.addEventListener("timeupdate", () => {
      // event up
      if (this.setVideoPlay) video.play();
      else video.pause();
      self.$emit("updateVideoStatus", {
        play: !video.paused,
        currentTime: video.currentTime,
        duration: isNaN(video.duration) ? 0 : video.duration,
        ended: video.ended,
      });
    });
    video.currentTime = this.setVideoCurrentTime;
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