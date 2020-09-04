<template>
  <div class="broadcast-schedule">
    <div
      class="bs-title"
    >VTV1 - Lịch phát sóng ngày {{today.getDate()}}/{{today.getMonth()+1}}/{{today.getFullYear()}}</div>

    <div class="bs-time">
      <div class="bs-time-background"></div>
      <div class="bs-time-character">
        <p :style="{visibility: bsTimeStringToNumberName === 0? 'hidden': 'visible'}">&#10092;</p>
        <p :style="{visibility: bsTimeStringToNumberName === 2? 'hidden': 'visible'}">&#10093;</p>
      </div>
      <div class="bs-time-name" :style="{ right:  bsTimeNameRight + 'px'}">
        <p
          :style="{visibility: bsTimeStringToNumberName === 2? 'hidden': 'visible'}"
          :class="{bsTimeStringToNumberNameActived: bsTimeStringToNumberName === 0}"
        >Hôm qua</p>
        <p :class="{bsTimeStringToNumberNameActived: bsTimeStringToNumberName === 1}">Hôm nay</p>
        <p
          :style="{visibility: bsTimeStringToNumberName === 0? 'hidden': 'visible'}"
          :class="{bsTimeStringToNumberNameActived: bsTimeStringToNumberName === 2}"
        >Ngày mai</p>
      </div>
    </div>
    <div class="bs-content">
      <div class="bs-show-content" :style="{bottom: bsSelectorBottom + 'px'}">
        <div
          class="bs-content-item"
          v-for="(item, index) in  broadcastScheduleAPI[bsTimeStringToNumberName]"
          :key="index"
          :class="{bsSelectorActived: index === currentPos, bsSelectorActivedCanPlay: index === currentPos && index <= showRedTimeIndex && bsTimeStringToNumberName === 1, canPlay: currentPos != index && index <= showRedTimeIndex && bsTimeStringToNumberName === 1}"
        >
          <p class="bs-content-item-time">{{item.time}}</p>
          <img
            v-show="currentPos != index && index<showRedTimeIndex && bsTimeStringToNumberName === 1"
            class="icon-play-back"
            src="../../assets/icon-control/play-back.png"
            alt
          />
          <img
            v-show="currentPos === index && index<showRedTimeIndex && bsTimeStringToNumberName === 1"
            class="icon-play-back"
            src="../../assets/icon-control/play-back-actived.png"
            alt
          />
          <div v-if="index === showRedTimeIndex && bsTimeStringToNumberName === 1" class="red-time"></div>

          <p class="bs-content-item-name">{{item.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BroadcastSchedule",
  data() {
    return {
      currentPos: 0,
      bsTimeStringToNumberName: 1,
      bsSelectorBottom: 0,
    };
  },
  props: {
    today: Date,
    keyCode: Number,
    eventKey: Boolean,
    broadcastScheduleAPI: Array,
  },
  methods: {
    bsTimeStringToNumber(timeString) {
      return (
        parseInt(timeString.slice(0, 3)) * 60 + parseInt(timeString.slice(3, 5))
      );
    },
  },
  computed: {
    bsTimeNameRight: function () {
      return (this.bsTimeStringToNumberName - 1) * 140;
    },

    setRedTimeMinute: function () {
      return this.today.getHours() * 60 + this.today.getMinutes();
    },
    showRedTimeIndex: function () {
      if (this.broadcastScheduleAPI.length > 1) {
        var tmp = this.broadcastScheduleAPI[1].findIndex((item, index) => {
          if (index + 1 < this.broadcastScheduleAPI[1].length)
            return (
              this.bsTimeStringToNumber(item.time) < this.setRedTimeMinute &&
              this.bsTimeStringToNumber(
                this.broadcastScheduleAPI[1][index + 1].time
              ) > this.setRedTimeMinute
            );
          else
            return this.bsTimeStringToNumber(item.time) < this.setRedTimeMinute;
        });
        return tmp;
      } else return 0;
    },
    redTimeBsSelectorBottom: function () {
      if (this.broadcastScheduleAPI.length > 1) {
        if (this.showRedTimeIndex <= 4) this.bsSelectorBottom = 0;
        else if (
          this.showRedTimeIndex >=
          this.broadcastScheduleAPI[1].length - 5
        )
          return (this.broadcastScheduleAPI[1].length - 5) * 64;
        else return (this.showRedTimeIndex - 4) * 64;
      } else return 0;
    },
  },

  watch: {
    eventKey: function (vNew, vOld) {
      var maxList =
        this.broadcastScheduleAPI[this.bsTimeStringToNumberName] != "undefine"
          ? this.broadcastScheduleAPI[this.bsTimeStringToNumberName].length
          : 0;
      if (vNew != null) {
        switch (this.keyCode) {
          case 37:
            //Left key pressed
            if (this.bsTimeStringToNumberName > 0)
              this.bsTimeStringToNumberName--;
            break;
          case 38:
            //Up key pressed
            if (this.currentPos > 0) {
              this.currentPos--;
              if (this.currentPos > 3 && this.currentPos < maxList - 4)
                this.bsSelectorBottom -= 64;
            }
            break;
          case 39:
            //Right key pressed
            if (this.bsTimeStringToNumberName < 2)
              this.bsTimeStringToNumberName++;
            break;
          case 40:
            //Down key pressed
            if (this.currentPos < maxList - 1) {
              this.currentPos++;
              if (this.currentPos > 4 && this.currentPos < maxList - 3)
                this.bsSelectorBottom += 64;
            }
            break;
          case 13:
            //Enter key pressed

            break;
          case 8:
            //BackSpace key pess

            break;
        }
      }
    },
  },
  created() {
    var self = this;
    self.currentPos = self.showRedTimeIndex;
    self.bsSelectorBottom = self.redTimeBsSelectorBottom;
  },
};
</script>

<style>
.broadcast-schedule {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
}
.bs-title {
  font-size: 38px;
  position: relative;
  top: 20px;
}
.bs-time {
  width: 642px;
  height: 64px;
  position: relative;
  left: 335px;
  top: 23px;
  font-size: 22px;
}
.bs-time .bs-time-background {
  width: 100%;
  height: 100%;
  background: -webkit-radial-gradient(
    center center,
    circle farthest-corner,
    rgba(0, 0, 0, 0.4) 0 0%,
    rgba(0, 0, 0, 0) 100%
  );
  position: absolute;
  top: 0;
}
.bs-time .bs-time-character {
  position: relative;
  top: 16px;
  display: flex;
  justify-content: center;
  font-size: 26px;
}
.bs-time .bs-time-character p {
  margin: 0 67px;
}
.bs-time .bs-time-name {
  height: 64px;
  display: flex;
  justify-content: center;
  position: relative;
  bottom: 29px;
  transition: all 0.3s ease 0s;
}
.bs-time .bs-time-name p {
  width: 96px;
  height: 26px;
  margin: 0 23px;
  font-size: 17px;
  position: relative;
  top: 18px;
  color: rgba(255, 255, 255, 0.4);
}
.bsTimeStringToNumberNameActived {
  font-size: 22px !important;
  top: 16px !important;
  color: #ffffff !important;
}
.bs-content {
  width: 642px;
  position: relative;
  left: 335px;
  top: 40px;
  font-size: 20px;
  overflow: hidden;
}
.bs-content .bs-show-content {
  position: relative;
  transition: all 0.3s ease 0s;
}
.bs-content .bs-show-content .bs-content-item {
  width: 100%;
  height: 64px;
  display: flex;
  color: rgba(255, 255, 255, 0.5);
}
.bs-content .bs-show-content .bs-content-item p {
  margin: 20px 0;
  position: absolute;
}
.bs-content .bs-show-content .bs-content-item .bs-content-item-time {
  left: 32px;
}
.bs-content .bs-show-content .bs-content-item .bs-content-item-name {
  left: 131px;
}
.bs-content .bs-show-content .bs-content-item .icon-play-back {
  width: 16px;
  height: 16px;
  margin: 23px 0;
  position: absolute;
  left: 100px;
}
.bs-content .bs-show-content .bs-content-item .red-time {
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: red;
  margin: 23px 0;
  position: absolute;
  left: 100px;
}
.bsSelectorActived {
  background-color: #ffffff !important;
  color: rgba(0, 0, 0, 0.5) !important;
  border-radius: 5px;
}
.bsSelectorActivedCanPlay {
  background-color: #ffffff !important;
  color: #000000 !important;
  border-radius: 5px;
}
.canPlay {
  color: #ffffff !important;
}
</style>