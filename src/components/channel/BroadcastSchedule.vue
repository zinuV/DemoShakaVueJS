<template>
  <div class="broadcast-schedule">
    <div class="bs-title">VTV1 - Lịch phát sóng ngày {{dayTitle}}</div>

    <div class="bs-time">
      <div class="bs-time-background"></div>
      <div class="bs-time-character">
        <p :style="{visibility: currentDay === 0? 'hidden': 'visible'}">&#10092;</p>
        <p :style="{visibility: currentDay === 2? 'hidden': 'visible'}">&#10093;</p>
      </div>
      <div class="bs-time-name" :style="{ right:  bsTimeNameRight + 'px'}">
        <p
          :style="{visibility: currentDay === 2? 'hidden': 'visible'}"
          :class="{currentDayActived: currentDay === 0}"
        >Hôm qua</p>
        <p :class="{currentDayActived: currentDay === 1}">Hôm nay</p>
        <p
          :style="{visibility: currentDay === 0? 'hidden': 'visible'}"
          :class="{currentDayActived: currentDay === 2}"
        >Ngày mai</p>
      </div>
    </div>
    <div class="bs-content">
      <div
        class="bs-show-content"
        :style="{bottom: positionBottom + 'px', transition: keyCode===37 || keyCode===39? 'none':'all 0.3s ease 0s'}"
      >
        <div
          class="bs-content-item"
          v-for="(item, index) in  broadcastScheduleAPI[currentDay]"
          :key="index"
          :class="{bsSelectorActived: index === currentPos, bsSelectorActivedCanPlay: index === currentPos && index <= redTimeIndex && currentDay === 1, canPlay: currentPos != index && index <= redTimeIndex && currentDay === 1}"
        >
          <p class="bs-content-item-time">{{item.time}}</p>
          <img
            v-show="currentPos != index && index<redTimeIndex && currentDay === 1"
            class="icon-play-back"
            src="../../assets/icon-control/play-back.png"
            alt
          />
          <img
            v-show="currentPos === index && index<redTimeIndex && currentDay === 1"
            class="icon-play-back"
            src="../../assets/icon-control/play-back-actived.png"
            alt
          />
          <div v-if="index === redTimeIndex && currentDay === 1" class="red-time"></div>

          <div class="bs-content-item-name">
            <p
              :class="index != currentPos?'bsItemName':'bsItemNameActived'"
              :ref="checkIndex(index)? 'bsItemNameActived':null"
            >{{showItemName(item.title, index)}}</p>
          </div>
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
      currentDay: 1,
      positionBottom: 0,
      prePos: { Day: null, pos: null },
      redTimeIndex: 0,
      keySetItemName: -1,
    };
  },
  props: {
    today: Date,
    broadcastScheduleAPI: Array,
    keyCode: Number,
    eventKey: Boolean,
  },
  methods: {
    bsTimeStringToNumber(timeString) {
      return (
        parseInt(timeString.slice(0, 3)) * 60 + parseInt(timeString.slice(3, 5))
      );
    },
    positionBottomFromIndex(index) {
      if (this.broadcastScheduleAPI.length > 1) {
        if (index <= 4) return 0;
        else if (index >= this.broadcastScheduleAPI[this.currentDay].length - 5)
          return (this.broadcastScheduleAPI[this.currentDay].length - 8) * 64;
        else return (index - 4) * 64;
      } else return 0;
    },
    indexFromBsTime(bsTime, bsArray) {
      var tmp = bsArray.findIndex((item, index) => {
        if (index + 1 < bsArray.length)
          return (
            this.bsTimeStringToNumber(item.time) <=
              this.bsTimeStringToNumber(bsTime) &&
            this.bsTimeStringToNumber(bsArray[index + 1].time) >
              this.bsTimeStringToNumber(bsTime)
          );
        else
          return (
            this.bsTimeStringToNumber(item.time) <=
            this.bsTimeStringToNumber(bsTime)
          );
      });
      return tmp;
    },
    showItemName(name, index, maxLen = 50, separator = " ") {
      if (name.length <= maxLen + 2) return name;
      else {
        if (index != this.currentPos)
          return name.substr(0, name.lastIndexOf(separator, maxLen)) + "...";
        else return name;
      }
    },
    checkIndex(index) {
      if (index === this.currentPos) this.keySetItemName = index;
      return index === this.currentPos;
    },
  },
  computed: {
    dayTitle: function () {
      var tmpDay = this.today;
      switch (this.currentDay) {
        case 0:
          tmpDay.setDate(tmpDay.getDate() - 1);
          break;
        case 2:
          tmpDay.setDate(tmpDay.getDate() + 1);
          break;
      }
      return (
        tmpDay.getDate() +
        "/" +
        (tmpDay.getMonth() + 1) +
        "/" +
        tmpDay.getFullYear()
      );
    },
    bsTimeNameRight: function () {
      return (this.currentDay - 1) * 140;
    },

    currentTime: function () {
      var tmpHours =
        this.today.getHours() < 10
          ? "0" + this.today.getHours()
          : this.today.getHours();
      var tmpMinutes =
        this.today.getMinutes() < 10
          ? "0" + this.today.getMinutes()
          : this.today.getMinutes();
      return tmpHours + ":" + tmpMinutes;
    },
  },

  watch: {
    eventKey: function (vNew, vOld) {
      var maxList =
        this.broadcastScheduleAPI[this.currentDay] != "undefine"
          ? this.broadcastScheduleAPI[this.currentDay].length
          : 0;
      if (vNew != null) {
        switch (this.keyCode) {
          case 37:
            //Left key pressed
            if (this.currentDay > 0) {
              var tmpPreDay = this.prePos.day;
              var tmpPrePos = this.prePos.pos;
              this.prePos = {
                day: this.currentDay,
                pos: this.currentPos,
              };
              this.currentDay--;
              if (this.currentDay === tmpPreDay) {
                this.currentPos = tmpPrePos;
              } else {
                var tmpTime = this.broadcastScheduleAPI[this.prePos.day][
                  this.currentPos
                ].time;
                this.currentPos = this.indexFromBsTime(
                  tmpTime,
                  this.broadcastScheduleAPI[this.currentDay]
                );
              }
            }
            break;
          case 38:
            //Up key pressed
            if (this.currentPos > 0) {
              this.currentPos--;
              this.prePos.day = null;
            }
            break;
          case 39:
            //Right key pressed
            if (this.currentDay < 2) {
              var tmpDay = this.prePos.day;
              var tmpPrePos = this.prePos.pos;
              this.prePos = {
                day: this.currentDay,
                pos: this.currentPos,
              };
              this.currentDay++;
              if (this.currentDay === tmpDay) {
                this.currentPos = tmpPrePos;
              } else {
                var tmpTime = this.broadcastScheduleAPI[this.prePos.day][
                  this.currentPos
                ].time;
                this.currentPos = this.indexFromBsTime(
                  tmpTime,
                  this.broadcastScheduleAPI[this.currentDay]
                );
              }
            }
            break;
          case 40:
            //Down key pressed
            if (this.currentPos < maxList - 1) {
              this.currentPos++;
              this.prePos.day = null;
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
    broadcastScheduleAPI: function () {
      if (this.broadcastScheduleAPI.length > 1) {
        this.redTimeIndex = this.indexFromBsTime(
          this.currentTime,
          this.broadcastScheduleAPI[1]
        );

        this.currentPos = this.redTimeIndex;
        this.positionBottom = this.positionBottomFromIndex(this.currentPos);
      }
    },
    currentPos: function () {
      this.positionBottom = this.positionBottomFromIndex(this.currentPos);
    },
    keySetItemName: function () {
      var item = this.$refs.bsItemNameActived[0];
      // item.setAttribute("style", "left: -" + item.clientWidth + "px;");
      // setTimeout(() => {
      //   item.setAttribute(
      //     "style",
      //     "left: -" + item.clientWidth + "px; transition: all 9s ease 0s;"
      //   );
      // }, 3000);
      console.log(this.$refs.bsItemNameActived[0].className);
      var count = 0;
      var tmp = setInterval(() => {
        count++;
        console.log(count);

        if (count >= 3) {
          item.setAttribute(
            "style",
            "left: -" + item.clientWidth + "px; transition: all 9s ease 0s;"
          );
          clearInterval(tmp);
        }
      }, 1000);
    },
  },
  created() {
    var self = this;
  },
  mounted() {
    // console.log("first: ", this.$refs.bsItemNameActived[0]);
    // setTimeout(() => {
    //   // var tmp = this.$refs.bsItemNameActived[0];
    //   // tmp.setAttribute("style", "left: -400px; transition: all 5s ease 0s;");
    //   console.log("second: ", this.$refs.bsItemNameActived[0]);
    // }, 5000);
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
.currentDayActived {
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
  width: max-content;
}
.bs-content .bs-show-content .bs-content-item .bs-content-item-time {
  left: 32px;
}
.bs-content .bs-show-content .bs-content-item .bs-content-item-name {
  width: 505px;
  height: 100%;
  overflow: hidden;
  position: absolute;
  left: 131px;
}
.bs-content .bs-show-content .bs-content-item .bs-content-item-name p {
  left: 0;
}
.bsItemName {
  left: 0 !important;
  transition: none !important;
}
.bsItemNameActived {
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