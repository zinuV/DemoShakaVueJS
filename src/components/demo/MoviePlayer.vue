<template>
  <div class="movie-player">
    <div
      data-shaka-player-container
      data-shaka-player-cast-receiver-id="7B25EC44"
      class="video-container"
      ref="videoContainer"
    >
      <video
        autoplay
        data-shaka-player
        class="video-current"
        ref="videoCurrent"
        style="width: 100%; height: 100%;"
      ></video>
      <div class="player-control" :class="{ hidePlayerControl: hidePlayerControl }">
        <div class="timeline">
          <div class="current-time">
            <p>{{currentTime.hour}}:{{currentTime.minute}}:{{currentTime.second}}</p>
          </div>
          <div class="timing" :style="{ width: currentTime.timeLine + '%' }"></div>
          <div class="timeball" :style="{ left: currentTime.timeLine*9.66 - 8 + 'px' }"></div>
          <div class="duration-time">
            <p>{{duration.hour}}:{{duration.minute}}:{{duration.second}}</p>
          </div>
        </div>
        <div class="button-control">
          <div class="control-sound-sub">
            <button class="style-buttom" :class="{ invisible: arrSelect[0] }">
              <img src="../../assets/icon-control/control-sound-sub.png" alt />
            </button>
            <button
              class="style-buttom"
              :class="{ invisible: !arrSelect[0], buttonActived: arrSelect[0] }"
            >
              <img src="../../assets/icon-control/control-sound-sub-actived.png" alt />
            </button>
            <p :class="{ invisible: !arrSelect[0] }">Âm thanh - phụ đề</p>
          </div>
          <div class="control-speed">
            <button class="style-buttom" :class="{ invisible: arrSelect[1] }">
              <img src="../../assets/icon-control/control-speed.png" alt />
            </button>
            <button
              class="style-buttom"
              :class="{ invisible: !arrSelect[1], buttonActived: arrSelect[1] }"
            >
              <img src="../../assets/icon-control/control-speed-actived.png" alt />
            </button>
            <p :class="{ invisible: !arrSelect[1] }">Tốc độ</p>
          </div>
          <div class="control-play-pause">
            <button
              class="control-pause style-buttom"
              :class="{ invisible: !t_play || arrSelect[2] }"
            >
              <img src="../../assets/icon-control/control-stop.png" alt />
            </button>
            <button
              class="control-pause style-buttom"
              :class="{
              invisible: !t_play || !arrSelect[2],
              buttonActived: arrSelect[2],
            }"
            >
              <img src="../../assets/icon-control/control-stop-actived.png" alt />
            </button>
            <button
              class="control-play style-buttom"
              :class="{ invisible: t_play || arrSelect[2] }"
            >
              <img src="../../assets/icon-control/control-play.png" alt />
            </button>
            <button
              class="control-play style-buttom"
              :class="{
              invisible: t_play || !arrSelect[2],
              buttonActived: arrSelect[2],
            }"
            >
              <img src="../../assets/icon-control/control-play-actived.png" alt />
            </button>
            <p :class="{ invisible: !arrSelect[2] || !t_play}">Tạm Dừng</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const shaka = require("../../../node_modules/shaka-player/dist/shaka-player.ui.js");

export default {
  name: "MoviePlayer",
  data() {
    return {
      currentTime: {
        timeline: 0,
        hour: 0,
        minute: 0,
        second: 0,
      },
      duration: {
        hour: 0,
        minute: 0,
        second: 0,
      },
      t_play: true,
      arrSelect: [false, true, false],
      currentPosition: 1,
      hidePlayerControl: true,
    };
  },
  methods: {
    playVideo: function (video, player) {
      if (this.t_play) video.pause();
      else video.play();
      this.$set(this, "t_play", !this.t_play);
    },
    rewindVideo: function () {
      if (this.t_play === false) this.$set(this, "t_play", true);
    },
    forwardVideo: function (video, player) {
      if (this.t_play === false) this.$set(this, "t_play", true);

      player.trickPlay(4);
      console.log(player.getPlaybackRate());
    },

    // Actived moving
    updatePos: function (newPos) {
      let tmpPos = this.currentPosition;
      this.$set(this.arrSelect, tmpPos, false);
      this.currentPosition = newPos;
      this.$set(this.arrSelect, newPos, true);
    },
    up: function () {
      this.$set(this, "hidePlayerControl", false);
    },
    down: function () {
      this.$set(this, "hidePlayerControl", false);
    },
    left: function () {
      if (this.currentPosition > 0) {
        this.updatePos(this.currentPosition - 1);
      }
    },
    right: function () {
      if (this.currentPosition < this.arrSelect.length - 1) {
        this.updatePos(this.currentPosition + 1);
      }
    },
    enter: function (video, player) {
      if (this.hidePlayerControl === true)
        this.$set(this, "hidePlayerControl", false);
      switch (this.currentPosition) {
        case 0:
          this.rewindVideo();
          break;

        case 1:
          this.forwardVideo(video, player);
          break;
        case 2:
          this.playVideo(video, player);
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    // Init shaka player ---------------------------

    const manifestUri =
      // "https://www.googleapis.com/drive/v3/files/1m3JHEjGzFvWe57pTxGaGSlBp8EyrpFfS?alt=media&key=AIzaSyD739-eb6NzS_KbVJq1K8ZAxnrMfkIqPyw";
      // "http://node-11.vkool.info/videos/e47dntrdu7y99pbzifhene5ush.mp4";
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4";
    const video = this.$refs.videoCurrent;
    const videoContainer = this.$refs.videoContainer;
    const player = new shaka.Player(video);
    const ui = new shaka.ui.Overlay(player, videoContainer, video);
    const controls = ui.getControls();

    // Listen for error events.
    player.addEventListener("error", this.onErrorEvent);

    // Try to load a manifest.
    // This is an asynchronous process.
    player
      .load(manifestUri)
      .then(function () {
        // This runs if the asynchronous load is successful.
      })
      .catch(this.onError); // onError is executed if the asynchronous load fails.

    //-------------------------------------------------------------------------
    // Set timeline
    video.addEventListener("timeupdate", () => {
      this.$set(
        this.currentTime,
        "timeLine",
        (video.currentTime / video.duration) * 100
      );
      this.$set(this, "currentTime", {
        timeLine: (video.currentTime / video.duration) * 100,
        hour: Math.floor(video.currentTime / 3600),
        minute: Math.floor((video.currentTime % 360) / 60),
        second: Math.floor(video.currentTime % 60),
      });
      this.$set(this, "duration", {
        hour: Math.floor(video.duration / 3600),
        minute: Math.floor((video.duration % 360) / 60),
        second: Math.floor(video.duration % 60),
      });

      if (video.ended) {
        this.$set(this, "t_play", !this.t_play);
      }
    });

    //-------------------------------------------------------------------
    var app = this;
    var keypressed = false;
    document.onkeydown = function (event) {
      switch (event.keyCode) {
        case 37:
          //console.log('Left key pressed');
          if (app.hidePlayerControl === false) app.left();
          break;
        case 38:
          //console.log('Up key pressed');
          app.up();
          break;
        case 39:
          //console.log('Right key pressed');
          if (app.hidePlayerControl === false) app.right();
          break;
        case 40:
          //console.log('Down key pressed');
          app.down();
          break;
        case 13:
          //console.log('Enter key pressed');
          app.enter(video, player);
          break;
      }

      // auto hide PlayerControl after 3s
      // if (!app.hidePlayerControl) {
      //   keypressed = true;
      //   let i = 0;
      //   let t_hideControlPlayer = setInterval(function() {
      //     if (i === 0) keypressed = false;
      //     ++i;
      //     if (keypressed) {
      //       clearInterval(t_hideControlPlayer);
      //     } else if (i === 30) {
      //       app.$set(app, "hidePlayerControl", true);
      //       app.updatePos(1);
      //       clearInterval(t_hideControlPlayer);
      //     }
      //   }, 100);
      // }
    };
  },
};
</script>
<style>
.shaka-controls-container {
  display: none;
}
.movie-player {
  position: relative;
  overflow: hidden;
}
.movie-player .video-container {
  width: 1280px;
  height: 720px;
  margin: auto;
  overflow: hidden;
}
.video-container .video-current {
  width: 100%;
  height: 100%;
}
.video-container .player-control {
  width: 100%;
  height: 100%;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0.3, rgba(0, 0, 0, 0)),
    color-stop(0.7, rgba(0, 0, 0, 0.9))
  );

  position: absolute;
  bottom: 0;

  text-align: center;

  transition: 0.1s ease;
}
/* .video-container .hidePlayerControl {
  height: 0;
} */
.video-container .player-control .timeline {
  background-color: white;
  width: 966px;
  height: 7px;
  position: absolute;
  left: 157px;
  bottom: 230px;
}

.video-container .player-control .timeline .current-time {
  position: absolute;
  bottom: -8px;
  left: -80px;
  font-size: 20px;
  color: #ffffff;
}
.video-container .player-control .timeline .duration-time {
  position: absolute;
  bottom: -8px;
  right: -92px;
  font-size: 20px;
  color: #ffffff;
}
.video-container .player-control .timeline .timing {
  background-color: tomato;
  width: 966px;
  height: 7px;
  position: absolute;
  bottom: 0;
}
.video-container .player-control .timeline .timeball {
  width: 17px;
  height: 17px;
  border-radius: 8.5px;
  background-color: tomato;
  position: absolute;
  bottom: -5px;
}
.video-container .player-control .button-control {
  position: absolute;
  bottom: 112px;
  display: flex;
  color: #ffffff;
}

.invisible {
  display: none;
}
.video-container .player-control .style-buttom {
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
}

.video-container .player-control .button-control .buttonActived {
  background-color: #ffffff;
}
.video-container .player-control .button-control .control-sound-sub,
.control-speed,
.control-play-pause {
  position: absolute;
  bottom: 0;
  width: max-content;
}
.video-container .player-control .button-control .control-sound-sub {
  left: 112px;
}
.video-container .player-control .button-control .control-speed {
  left: 225px;
}
.video-container .player-control .button-control .control-play-pause {
  left: 604px;
  bottom: -5px;
}
.video-container .player-control .button-control p {
  position: absolute;
  bottom: 0;
  width: max-content;
}
.video-container .player-control .button-control .control-sound-sub button,
.control-speed button {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  padding: 0;
  position: absolute;
  bottom: 40px;
}
.video-container .player-control .button-control .control-sound-sub button {
  left: 45px;
}
.video-container .player-control .button-control .control-speed button {
  left: 5px;
}

.video-container .player-control .control-play-pause button {
  width: 56px;
  height: 56px;
  border-radius: 28px;
  padding: 0;
  position: absolute;
  bottom: 32px;
  left: 10px;
}
</style>
