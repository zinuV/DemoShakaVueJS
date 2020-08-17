<template>
  <div class="movie-player">
    <VideoPlayer
      :manifestUri="movieInfor.manifestUri"
      :setVideoPlay="setVideoStatus.play"
      @updateVideoStatus="updateVideoStatus"
    />
    <MoviePlayerControl
      :keyCode="keyCode.value"
      :eventKey="keyCode.eventKey"
      :videoStatus="videoStatus"
      @playVideo="playVideo"
    />
    <SoundSubMenu />
    <SpeedMenu />
  </div>
</template>

<script>
import VideoPlayer from "./VideoPlayer";
import MoviePlayerControl from "./MoviePlayerControl";
import SoundSubMenu from "./SoundSubMenu";
import SpeedMenu from "./SpeedMenu";
export default {
  name: "MoviePlayer",
  data() {
    return {
      movieInfor: {
        manifestUri:
          // "https://wowzaec2demo.streamlock.net/live/bigbuckbunny/manifest_mpm4sav_mvtime.mpd",
          "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4",
        soundList: ["Tiếng Anh"],
        subList: ["Tiếng Việt"],
      },
      keyCode: { value: null, eventKey: false },
      videoStatus: {
        play: true,
        currentTime: 0,
        duration: 0,
        ended: false,
      },
      setVideoStatus: {
        play: true,
        currentTime: 0,
      },
    };
  },
  components: {
    VideoPlayer,
    MoviePlayerControl,
    SoundSubMenu,
    SpeedMenu,
  },
  methods: {
    updateVideoStatus(newVideoStatus) {
      this.$set(this, "videoStatus", newVideoStatus);
      if (this.videoStatus.ended) this.setVideoStatus.play = false;
    },
    playVideo() {
      this.setVideoStatus.play = !this.videoStatus.play;
    },
  },
  mounted() {
    var self = this;
    document.onkeydown = function (event) {
      self.keyCode.value = event.keyCode;
      self.keyCode.eventKey = !self.keyCode.eventKey;
    };
  },
};
</script>

<style>
.movie-player {
  width: 1280px;
  height: 720px;
  position: relative;
  margin: auto;
  overflow: hidden;
}
.video-player {
  width: 100%;
  height: 100%;
}
</style>