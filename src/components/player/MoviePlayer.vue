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
      :typeOfMovie="movieInfor.type"
      :keyCode="currentPos === 0?keyCode.value:0"
      :eventKey="currentPos === 0?keyCode.eventKey:null"
      :videoStatus="videoStatus"
      :setHidePlayerControl="hidePlayerControl"
      @playVideo="playVideo"
      @setVideoCurrentTime="setVideoCurrentTime"
      @openSoundSubMenu="openSoundSubMenu"
      @openSpeedMenu="openSpeedMenu"
      @openEpisodeMenu="openEpisodeMenu"
      @hideMoviePlayerControl="hideMoviePlayerControl"
    />
    <SoundSubMenu
      v-show="currentPos === 1"
      :soundList="movieInfor.soundList"
      :subList="movieInfor.subList"
      :keyCode="currentPos === 1?keyCode.value:0"
      :eventKey="currentPos === 1?keyCode.eventKey:null"
      :setSoundSubVideo="{sound: setVideoStatus.sound, sub: setVideoStatus.sub}"
      @openMoviePlayerControl="openMoviePlayerControl"
      @setSoundSubVideo="setSoundSubVideo"
    />
    <SpeedMenu
      v-show="currentPos === 2"
      :keyCode="currentPos === 2?keyCode.value:0"
      :eventKey="currentPos === 2?keyCode.eventKey:null"
      :setVideoSpeed="setVideoStatus.speed"
      @openMoviePlayerControl="openMoviePlayerControl"
      @setSpeedVideo="setSpeedVideo"
    />
    <EpisodeMenu
      v-show="currentPos === 3"
      :keyCode="currentPos === 3?keyCode.value:0"
      :eventKey="currentPos === 3?keyCode.eventKey:null"
      @openMoviePlayerControl="openMoviePlayerControl"
      @openNewEpisodeDemo="openNewEpisodeDemo"
    />
  </div>
</template>

<script>
import VideoPlayer from "./VideoPlayer";
import MoviePlayerControl from "./MoviePlayerControl";
import SoundSubMenu from "./SoundSubMenu";
import SpeedMenu from "./SpeedMenu";
import EpisodeMenu from "./EpisodeMenu";
export default {
  name: "MoviePlayer",
  data() {
    return {
      movieInfor: {
        manifestUri:
          "https://d1czxfd0hfd9km.cloudfront.net/outputs/bbb/mediaconvert/hls/bbb.m3u8",
        // "https://vnso-pt-15-tf-zingtv-video-6.zadn.vn/Video720/2013/1230/26/36aca04fca5374983e796e22d81cf3fc.mp4?authen=exp=1598319641~acl=36aca04fca5374983e796e22d81cf3fc~hmac=f1bd202cc32dbc9e93b73c86e88011ca",
        // "https://wowzaec2demo.streamlock.net/live/bigbuckbunny/manifest_mpm4sav_mvtime.mpd",
        // "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4",
        soundList: ["Tiếng Anh", "Tiếng gốc"],
        subList: ["Tiếng Việt", "Tắt phụ đề"],
        type: 0, // type=0 là phim bộ, type=1 là phim lẻ
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
        sound: 1,
        sub: 1,
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
    EpisodeMenu,
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
      this.keyCode.value = -1;
    },
    openSpeedMenu() {
      this.currentPos = 2;
      this.keyCode.value = -1;
    },
    openEpisodeMenu() {
      this.currentPos = 3;
      this.keyCode.value = -1;
    },
    openMoviePlayerControl() {
      this.currentPos = 0;
      this.keyCode.value = -1;
      this.hidePlayerControl = false;
    },
    hideMoviePlayerControl() {
      this.hidePlayerControl = true;
    },
    setSpeedVideo(speed) {
      this.setVideoStatus.speed = speed;
    },
    setSoundSubVideo(value) {
      this.setVideoStatus.sound = value.sound;
      this.setVideoStatus.sub = value.sub;
    },
    openNewEpisodeDemo() {
      this.currentPos = 0;
      this.hidePlayerControl = true;
      this.keyCode.value = -1;
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