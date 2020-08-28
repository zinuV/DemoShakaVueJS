<template>
  <div class="sound-sub-menu">
    <div class="sound-sub-content">
      <p class="sound-sub-title">Âm thanh - Phụ đề</p>
      <div class="sound-menu">
        <p>Âm thanh</p>
        <div
          class="menu-selecter"
          v-for="(item, index) in soundList"
          :key="index"
          :class="{menuActived: currentPos === index}"
        >
          <img
            src="../../assets/icon-control/check.png"
            alt
            v-if="index === t_sound  &&  index != currentPos"
          />
          <img
            src="../../assets/icon-control/check-actived.png"
            alt
            v-if="index === t_sound  &&  index === currentPos"
          />
          <p>{{item}}</p>
        </div>
      </div>
      <div class="sub-menu">
        <p>Phụ đề</p>
        <div
          class="menu-selecter"
          v-for="(item, index) in subList"
          :key="index"
          :class="{menuActived: currentPos === (index + soundList.length)}"
        >
          <img
            src="../../assets/icon-control/check.png"
            alt
            v-if="index === t_sub  &&  index != currentPos - soundList.length"
          />
          <img
            src="../../assets/icon-control/check-actived.png"
            alt
            v-if="index === t_sub  &&  index === currentPos - soundList.length"
          />
          <p>{{item}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SoundSubMenu",
  data() {
    return {
      currentPos: 0,
      t_sound: 1,
      t_sub: 1,
    };
  },
  props: {
    soundList: Array,
    subList: Array,
    keyCode: Number,
    eventKey: Boolean,
    setSoundSubVideo: Object,
  },
  watch: {
    eventKey: function (vNew, vOld) {
      if (vNew != null) {
        switch (this.keyCode) {
          case 38:
            //Up key pressed
            if (this.currentPos > 0) {
              this.currentPos--;
            }
            break;
          case 40:
            //Down key pressed
            if (
              this.currentPos <
              this.soundList.length + this.subList.length - 1
            ) {
              this.currentPos++;
            }
            break;
          case 13:
            //Enter key pressed
            if (this.currentPos < this.soundList.length) {
              this.t_sound = this.currentPos;
            } else {
              this.t_sub = this.currentPos - this.soundList.length;
            }
            this.$emit("setSoundSubVideo", {
              sound: this.t_sound,
              sub: this.t_sub,
            });
            break;
          case 8:
            //BackSpace key pess
            this.currentPos = this.t_sound;
            this.$emit("openMoviePlayerControl");
        }
      }
    },
  },
  mounted() {
    this.t_sound = this.setSoundSubVideo.sound;
    this.t_sub = this.setSoundSubVideo.sub;
    this.currentPos = this.t_sound;
  },
};
</script>

<style>
.sound-sub-menu {
  position: absolute;
  top: 0;
  width: 1280px;
  height: 720px;
  background-color: rgba(0, 0, 0, 0.6);
}
.sound-sub-menu .sound-sub-content {
  height: 100%;
  width: 490px;
  background-color: #000000;
  position: absolute;
  top: 0;
  right: 0;
  color: #ffffff;
  padding: 46px 64px;
  text-align: center;
}
.sound-sub-content .sound-sub-title {
  font-size: 28px;
  margin-bottom: 44px;
}
.sound-menu > p,
.sub-menu > p {
  font-size: 22px;
  margin: 27px 0;
  text-align: left;
}
.menu-selecter {
  width: 100%;
  height: 44px;
  display: flex;
  padding: 11px 0;
  margin: 10px 0;
}
.menu-selecter img {
  width: 20px;
  height: 15px;
  margin: 3px 24px;
}
.menu-selecter p {
  font-size: 20px;
  position: absolute;
  left: 132px;
}
.menuActived {
  background-color: #ffffff;
  color: #000000;
  border-radius: 7px;
}
</style>