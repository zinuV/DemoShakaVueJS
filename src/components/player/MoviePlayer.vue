<template>
  <div class="movie-player">
    <VideoPlayer
      :manifestUri="movieInfor.manifestUri"
      :setVideoPlay="setVideoStatus.play"
      :setVideoCurrentTime="setVideoStatus.currentTime"
      :setVideoSpeed="setVideoStatus.speed"
      @updateVideoStatus="updateVideoStatus"
    />
    <MoviePlayerControl
      :manifestUri="movieInfor.manifestUri"
      :keyCode="currentPos === 0?keyCode.value:0"
      :eventKey="currentPos === 0?keyCode.eventKey:null"
      :videoStatus="videoStatus"
      :setHidePlayerControl="hidePlayerControl"
      @playVideo="playVideo"
      @setVideoCurrentTime="setVideoCurrentTime"
      @openSoundSubMenu="openSoundSubMenu"
      @openSpeedMenu="openSpeedMenu"
      @hideMoviePlayerControl="hideMoviePlayerControl"
    />
    <SoundSubMenu
      v-if="currentPos === 1"
      :soundList="movieInfor.soundList"
      :subList="movieInfor.subList"
      :keyCode="currentPos === 1?keyCode.value:0"
      :eventKey="currentPos === 1?keyCode.eventKey:null"
      @openMoviePlayerControl="openMoviePlayerControl"
    />
    <SpeedMenu
      v-if="currentPos === 2"
      :keyCode="currentPos === 2?keyCode.value:0"
      :eventKey="currentPos === 2?keyCode.eventKey:null"
      :setVideoSpeed="setVideoStatus.speed"
      @openMoviePlayerControl="openMoviePlayerControl"
      @setSpeedVideo="setSpeedVideo"
    />
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
          "https://vnso-pt-5-tf-zingtv-video-6.zadn.vn/Video720/2013/1127/c7/f769ab94f6f16e1d690da36c81ec259f.mp4?authen=exp=1597810878~acl=f769ab94f6f16e1d690da36c81ec259f~hmac=9fdc15677524fa31d7ad462ad1d291c4",
        // "https://wowzaec2demo.streamlock.net/live/bigbuckbunny/manifest_mpm4sav_mvtime.mpd",
        // "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4",
        soundList: ["Tiếng Anh", "Tiếng gốc"],
        subList: ["Tiếng Việt", "Tắt phụ đề"],
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
        speed: 1,
      },
      currentPos: 0,
      hidePlayerControl: true,
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
      if (this.videoStatus.ended || this.videoStatus.play === false)
        this.setVideoStatus.play = false;
      else this.setVideoStatus.play = true;
    },
    playVideo() {
      this.setVideoStatus.play = !this.videoStatus.play;
    },
    setVideoCurrentTime(newCurrentTime) {
      this.setVideoStatus.currentTime = newCurrentTime;
    },
    openSoundSubMenu() {
      this.currentPos = 1;
    },
    openSpeedMenu() {
      this.currentPos = 2;
    },
    openMoviePlayerControl() {
      this.currentPos = 0;
      this.hidePlayerControl = false;
    },
    hideMoviePlayerControl() {
      this.hidePlayerControl = true;
    },
    setSpeedVideo(speed) {
      this.setVideoStatus.speed = speed;
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