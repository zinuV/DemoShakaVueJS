<template>
  <div class="player-control" :class="{ hidePlayerControl: hidePlayerControl }">
    <div class="timeline" :class="{timelineActived:currentPos===0}">
      <div class="current-time">
        <p>{{transTime(videoStatus.currentTime).hour}}:{{transTime(videoStatus.currentTime).minute}}:{{transTime(videoStatus.currentTime).second}}</p>
      </div>
      <div
        class="timing"
        :style="{ width: timeline + '%' }"
        :class="{timingActived: currentPos===0}"
      ></div>
      <div
        class="timeball"
        :style="{ left: timeline*9.66 - 8 + 'px' }"
        :class="{timeballActive:currentPos===0}"
      ></div>
      <div
        class="timeline-miniVideo"
        :class="{invisible:false}"
        :style="{ left: timeline*9.66 - 120 + 'px' }"
      >
        <video class="miniVideo" src="manifestUri" ref="miniVideo"></video>
        <div class="miniVideo-timing">
          <!-- <p>{{Math.floor(t_timeline.setTime / 3600)}}:{{ Math.floor((t_timeline.setTime % 3600) / 60)}}:{{Math.floor(t_timeline.setTime % 60)}}</p> -->
        </div>
      </div>
      <div class="duration-time">
        <p>{{transTime(videoStatus.duration).hour}}:{{transTime(videoStatus.duration).minute}}:{{transTime(videoStatus.duration).second}}</p>
      </div>
    </div>
    <div class="button-control">
      <div class="control-sound-sub">
        <button class="style-buttom" v-if="currentPos!=1">
          <img src="../../assets/icon-control/control-sound-sub.png" alt />
        </button>
        <button class="style-buttom buttonActived" v-else>
          <img src="../../assets/icon-control/control-sound-sub-actived.png" alt />
        </button>
        <p v-if="currentPos===1">Âm thanh - phụ đề</p>
      </div>
      <div class="control-speed">
        <button class="style-buttom" v-if="currentPos!=2">
          <img src="../../assets/icon-control/control-speed.png" alt />
        </button>
        <button class="style-buttom buttonActived" v-else>
          <img src="../../assets/icon-control/control-speed-actived.png" alt />
        </button>
        <p :class="{ invisible: !(currentPos===2) }">Tốc độ</p>
      </div>
      <div class="control-play-pause">
        <button class="control-pause style-buttom" v-if=" videoStatus.play && (currentPos!=3)">
          <img src="../../assets/icon-control/control-stop.png" alt />
        </button>
        <button
          class="control-pause style-buttom buttonActived"
          v-if=" videoStatus.play && (currentPos===3)"
        >
          <img src="../../assets/icon-control/control-stop-actived.png" alt />
        </button>
        <button class="control-play style-buttom" v-if=" !videoStatus.play && (currentPos!=3)">
          <img src="../../assets/icon-control/control-play.png" alt />
        </button>
        <button
          class="control-play style-buttom buttonActived"
          v-if=" !videoStatus.play && (currentPos===3)"
        >
          <img src="../../assets/icon-control/control-play-actived.png" alt />
        </button>
        <p v-if=" !videoStatus.play && (currentPos===3)">Tạm Dừng</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MoviePlayerControl",
  data() {
    return {
      currentPos: 3,
      prePos: null,
      hidePlayerControl: false,
    };
  },
  props: {
    keyCode: Number,
    eventKey: Boolean,
    videoStatus: Object,
  },
  methods: {
    transTime(time) {
      return {
        hour: Math.floor(time / 3600),
        minute: Math.floor((time % 3600) / 60),
        second: Math.floor(time % 60),
      };
    },
    enter() {
      switch (this.currentPos) {
        case 3:
          this.$emit("playVideo");
          break;
      }
    },
  },
  watch: {
    eventKey: function (vNew, vOld) {
      if (vNew != null)
        switch (this.keyCode) {
          case 37:
            //Left key pressed
            if (this.currentPos > 1)
              this.$set(this, "currentPos", this.currentPos - 1);
            break;
          case 38:
            //Up key pressed
            if (this.currentPos > 0) this.$set(this, "prePos", this.currentPos);
            this.$set(this, "currentPos", 0);

            break;
          case 39:
            //Right key pressed
            if (this.currentPos < 3 && this.currentPos > 0)
              this.$set(this, "currentPos", this.currentPos + 1);
            break;
          case 40:
            //Down key pressed
            this.$set(this, "currentPos", this.prePos);
            break;
          case 13:
            //Enter key pressed
            this.enter();
            break;
        }
    },
  },
  computed: {
    timeline: function () {
      return (this.videoStatus.currentTime / this.videoStatus.duration) * 100;
    },
  },
  mounted() {},
};
</script>

<style>
.player-control {
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
.hidePlayerControl {
  height: 0;
  overflow: hidden;
}

/* ----- Css Timeline ------- */
.player-control .timeline {
  background-color: rgba(255, 255, 255, 0.3);
  width: 966px;
  height: 3px;
  position: absolute;
  left: 157px;
  bottom: 230px;
  border-radius: 2px;
}

.player-control .timeline .timing {
  background-color: #ffffff;
  width: 966px;
  height: 3px;
  position: absolute;
  bottom: 0;
  border-radius: 2px;
}
.player-control .timeline .timeball {
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: #ffffff;
  position: absolute;
  bottom: -4.5px;
}
.player-control .timelineActived,
.timingActived {
  height: 8px !important;
  border-radius: 4px !important;
}
.timeballActive {
  height: 20px !important;
  width: 20px !important;
  border-radius: 10px !important;
  display: block;
  bottom: -6.5px !important;
}
.player-control .timeline-miniVideo,
.miniVideo {
  width: 240px;
  height: 135px;
  border: 1px solid #000000;
  border-radius: 12px;
}
.player-control .timeline-miniVideo {
  position: relative;
  bottom: 160px;
  overflow: hidden;
}

.player-control .miniVideo-timing {
  width: 240px;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.85);
  position: relative;
  bottom: 32px;
  color: #ffffff;
}
.player-control .miniVideo-timing p {
  position: relative;
  top: 4px;
}

.player-control .timeline .current-time {
  position: absolute;
  bottom: -8px;
  left: -80px;
  font-size: 20px;
  color: #ffffff;
}
.player-control .timeline .duration-time {
  position: absolute;
  bottom: -8px;
  right: -92px;
  font-size: 20px;
  color: #ffffff;
}

/* ------ Css Player Control ----------- */
.player-control .button-control {
  position: absolute;
  bottom: 112px;
  display: flex;
  color: #ffffff;
}

.player-control .style-buttom {
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
}

.player-control .button-control .buttonActived {
  background-color: #ffffff;
}
.player-control .button-control .control-sound-sub,
.control-speed,
.control-play-pause {
  position: absolute;
  bottom: 0;
  width: max-content;
}
.player-control .button-control .control-sound-sub {
  left: 112px;
}
.player-control .button-control .control-speed {
  left: 225px;
}
.player-control .button-control .control-play-pause {
  left: 604px;
  bottom: -5px;
}
.player-control .button-control p {
  position: absolute;
  bottom: 0;
  width: max-content;
}
.player-control .button-control .control-sound-sub button,
.control-speed button {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  padding: 0;
  position: absolute;
  bottom: 40px;
}
.player-control .button-control .control-sound-sub button {
  left: 45px;
}
.player-control .button-control .control-speed button {
  left: 5px;
}

.player-control .control-play-pause button {
  width: 56px;
  height: 56px;
  border-radius: 28px;
  padding: 0;
  position: absolute;
  bottom: 32px;
  left: 10px;
}
</style>