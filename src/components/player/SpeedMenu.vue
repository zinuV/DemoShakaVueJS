<template>
  <div class="speed-menu">
    <div class="speed-menu-content">
      <p class="speed-title">Tốc độ</p>

      <div
        class="menu-selecter"
        v-for="(item, index) in speedList"
        :key="index"
        :class="{menuActived: currentPos === index}"
      >
        <img
          src="../../assets/icon-control/check.png"
          alt
          v-if="index === t_speed  &&  index != currentPos"
        />
        <img
          src="../../assets/icon-control/check-actived.png"
          alt
          v-if="index === t_speed  &&  index === currentPos"
        />
        <p>{{item===1?"Bình thường":item + "x"}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpeedMenu",
  data() {
    return {
      speedList: [0.25, 0.5, 1, 1.25, 1.5, 2],
      t_speed: 2,
      currentPos: 2,
    };
  },
  props: {
    keyCode: Number,
    eventKey: Boolean,
    setVideoSpeed: Number,
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
            if (this.currentPos < this.speedList.length - 1) {
              this.currentPos++;
            }
            break;
          case 13:
            //Enter key pressed
            this.t_speed = this.currentPos;
            this.$emit("setSpeedVideo", this.speedList[this.t_speed]);
            break;
          case 8:
            //BackSpace key pess
            this.$emit("openMoviePlayerControl");
        }
      }
    },
  },
  mounted() {
    this.currentPos = this.speedList.indexOf(this.setVideoSpeed);
    this.t_speed = this.speedList.indexOf(this.setVideoSpeed);
  },
};
</script>

<style>
.speed-menu {
  position: absolute;
  top: 0;
  width: 1280px;
  height: 720px;
  background-color: rgba(0, 0, 0, 0.6);
}
.speed-menu .speed-menu-content {
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
.speed-menu-content .speed-title {
  font-size: 28px;
  margin-bottom: 44px;
}
.speed-menu > p {
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
  position: absolute;
}
.menu-selecter p {
  font-size: 20px;
  position: static;
  margin: 0 auto;
  left: 132px;
}
.menuActived {
  background-color: #ffffff;
  color: #000000;
  border-radius: 7px;
}
</style>