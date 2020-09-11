<template>
  <div class="broadcast-schedule">
    <div class="bs-title">{{title}} - Lịch phát sóng ngày {{dayTitle}}</div>

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
            class="icon-review"
            src="../../assets/icon-control/review.png"
            alt
          />
          <img
            v-show="currentPos === index && index<redTimeIndex && currentDay === 1"
            class="icon-review"
            src="../../assets/icon-control/review-actived.png"
            alt
          />
          <div v-if="index === redTimeIndex && currentDay === 1" class="red-time"></div>

          <div class="bs-content-item-name">
            <p
              :style="index != currentPos? 'left: 0; transition: none': ''"
              :ref=" 'bsItemName'+index"
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
      keySetItemName: 0,
      keypressed: false,
    };
  },
  props: {
    today: Date,
    broadcastScheduleAPI: Array,
    keyCode: Number,
    eventKey: Boolean,
    title: String,
    openBroadcastScheduleFromPlayer: Boolean,
    showBs: Boolean,
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

    setItemNameTransition: function () {
      var self = this;

      self.keypressed = true;

      var tmpPos = self.currentPos;
      self.keySetItemName++;
      if (self.keySetItemName > 255) self.keySetItemName = 0;
      var key = self.keySetItemName;
      if (
        self.broadcastScheduleAPI[self.currentDay] == undefined ||
        self.broadcastScheduleAPI[self.currentDay][self.currentPos] == undefined
      ) {
        return -1;
      }

      let count = 0;
      let countTime = setInterval(function () {
        if (count === 0) self.keypressed = false;
        ++count;
        if (self.keypressed) {
          clearInterval(countTime);
        } else if (count >= 10) {
          ///
          if (
            self.broadcastScheduleAPI[self.currentDay][self.currentPos].title
              .length > 52
          ) {
            var item = self.$refs["bsItemName" + self.currentPos][0];

            var timeTransition = 0.019 * item.clientWidth;

            item.setAttribute(
              "style",
              "left: -" +
                (item.clientWidth + 2) +
                "px; transition: all " +
                timeTransition +
                "s linear 0s;"
            );
            // console.log(tmpPos, " - 1 - First run ...", item);

            setTimeout(() => {
              if (self.currentPos === tmpPos && key === self.keySetItemName) {
                item.setAttribute("style", "left: 505px; transition: none;");
                item.setAttribute(
                  "style",
                  "left: -" +
                    (item.clientWidth + 5) +
                    "px; transition: all " +
                    (timeTransition + 10) +
                    "s linear 0s;"
                );
                // console.log(tmpPos, " - 2 - Second run ...", item);

                var loop = setInterval(() => {
                  if (self.currentPos != tmpPos || key != self.keySetItemName) {
                    clearInterval(loop);
                    // console.log(tmpPos, " - 2 - Clear Loop #####", item);
                  } else {
                    item.setAttribute(
                      "style",
                      "left: 505px; transition: none;"
                    );
                    item.setAttribute(
                      "style",
                      "left: -" +
                        (item.clientWidth + 5) +
                        "px; transition: all " +
                        (timeTransition + 10) +
                        "s linear 0s;"
                    );
                    // console.log(tmpPos, " - 3 - Loop run ...", item);
                  }
                }, (timeTransition + 10) * 1000);
              }
            }, timeTransition * 1000);
          }

          clearInterval(countTime);
          // console.log(tmpPos, "Stop Count**********");
        }
      }, 100);
    },
  },
  computed: {
    dayTitle: function () {
      var tmpDay = new Date();
      switch (this.currentDay) {
        case 0:
          tmpDay.setDate(tmpDay.getDate() - 1);
          break;
        case 2:
          tmpDay.setDate(tmpDay.getDate() + 1);
          break;
      }

      return (
        (tmpDay.getDate() < 10 ? "0" + tmpDay.getDate() : tmpDay.getDate()) +
        "/" +
        (tmpDay.getMonth() < 9
          ? "0" + (tmpDay.getMonth() + 1)
          : tmpDay.getMonth() + 1) +
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
        this.broadcastScheduleAPI[this.currentDay] != undefined
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
              if (this.broadcastScheduleAPI[this.currentDay] == undefined)
                break;

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

              //itemName
              if (this.$refs["bsItemName" + this.currentPos] != undefined) {
                var item = this.$refs["bsItemName" + this.currentPos][0];
                if (item == undefined) break;

                item.setAttribute("style", "left: 0px; transition: none;");
                this.setItemNameTransition();
              }
            }

            break;
          case 38:
            //Up key pressed
            if (this.currentPos > 0) {
              this.currentPos--;
              this.prePos.day = null;

              //itemName
              if (this.$refs["bsItemName" + this.currentPos] != undefined)
                this.setItemNameTransition();
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
              if (this.broadcastScheduleAPI[this.currentDay] == undefined)
                break;
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

              //itemName
              if (this.$refs["bsItemName" + this.currentPos] != undefined) {
                var item = this.$refs["bsItemName" + this.currentPos][0];
                if (item == undefined) break;
                item.setAttribute("style", "left: 0px; transition: none;");
                this.setItemNameTransition();
              }
            }

            break;
          case 40:
            //Down key pressed
            if (this.currentPos < maxList - 1) {
              this.currentPos++;
              this.prePos.day = null;

              //itemName
              if (this.$refs["bsItemName" + this.currentPos] != undefined)
                this.setItemNameTransition();
            }
            break;
          case 13:
            //Enter key pressed
            var tmpItem = {
              title: this.broadcastScheduleAPI[this.currentDay][this.currentPos]
                .title,
              time: this.broadcastScheduleAPI[this.currentDay][this.currentPos]
                .time,
              day: this.currentDay,
            };
            this.$emit("openChannelPlayer", tmpItem);
            //itemName
            if (this.$refs["bsItemName" + this.currentPos] != undefined) {
              var item = this.$refs["bsItemName" + this.currentPos][0];
              if (item == undefined) break;
              item.setAttribute("style", "left: 0px; transition: none;");

              this.keySetItemName++;
            }
            break;
          case 8:
            //BackSpace key pess
            if (this.openBroadcastScheduleFromPlayer)
              this.$emit("changeCurrentPos", 2);
            else this.$emit("openOverviewChannel");
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
        this.currentDay = 1;
        this.positionBottom = this.positionBottomFromIndex(this.currentPos);
      }
    },
    currentPos: function () {
      this.positionBottom = this.positionBottomFromIndex(this.currentPos);
    },
    showBs: function (value) {
      if (value) {
        //itemName
        if (this.$refs["bsItemName" + this.currentPos] != undefined)
          this.setItemNameTransition();
      }
    },
  },
  created() {
    var self = this;
  },
  mounted() {},
};
</script>

<style>
.broadcast-schedule {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
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
.bs-content .bs-show-content .bs-content-item .icon-review {
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