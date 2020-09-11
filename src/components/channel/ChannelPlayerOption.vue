<template>
  <div class="channel-player-option" :class="{hideChannelPlayerOption: hideOption}">
    <div class="option-infor">
      <div class="collum-yelow"></div>
      <div class="infor-content">
        <p class="content-title">{{infor.title}}</p>
        <p class="content-time">{{infor.time}} {{nameDay(infor.day)}}</p>
      </div>
    </div>
    <div class="option-selector">
      <div class="option-item" :class="{optionItemAcitved: currentPos === 0}">
        <img v-show="currentPos !=0" src="../../assets/icon-control/control-episode.png" alt />
        <img
          v-show="currentPos === 0"
          src="../../assets/icon-control/control-episode-actived.png"
          alt
        />
        <p>Danh sách kênh</p>
      </div>
      <div class="option-item" :class="{optionItemAcitved: currentPos === 1}">
        <img v-show="currentPos !=1" src="../../assets/icon-control/television-icon.png" alt />
        <img
          v-show="currentPos === 1"
          src="../../assets/icon-control/television-icon-actived.png"
          alt
        />
        <p>Lịch phát sóng</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChannelPlayerOption",
  data() {
    return {
      currentPos: 0,
      hideOption: true,
      keypressed: false,
    };
  },
  props: {
    keyCode: Number,
    eventKey: Boolean,
    infor: Object,
  },
  methods: {
    nameDay(day) {
      switch (day) {
        case 0:
          return "Hôm qua";
          break;
        case 1:
          return "Hôm nay";
          break;
        case 2:
          return "Ngày mai";
          break;
        default:
          break;
      }
    },
  },
  watch: {
    eventKey: function (vNew, vOld) {
      var self = this;
      var key = true;
      if (self.hideOption && vNew != null) {
        self.hideOption = false;
        key = false;
      }
      if (vNew != null && key) {
        switch (self.keyCode) {
          case 37:
            //Left key pressed
            if (self.currentPos > 0) self.currentPos--;
            break;
          case 38:
            //Up key pressed

            break;
          case 39:
            //Right key pressed
            if (self.currentPos < 1) self.currentPos++;
            break;
          case 40:
            //Down key pressed

            break;
          case 13:
            //Enter key pressed

            self.hideOption = true;
            if (self.currentPos === 0) {
              self.$emit("changeCurrentPos", 0);
            }
            if (self.currentPos === 1) {
              self.$emit("changeCurrentPos", 1);
            }
            break;
        }
      }
      // auto hide Channel Player Option after 3s
      if (self.hideOption === false && vNew != null) {
        self.keypressed = true;
        let count = 0;
        let loop = setInterval(function () {
          if (count === 0) self.keypressed = false;
          count++;
          if (self.keypressed) {
            clearInterval(loop);
          } else if (count === 30 && !self.hideOption) {
            self.hideOption = true;

            clearInterval(loop);
          }
        }, 100);
      }
    },
  },
};
</script>

<style>
.channel-player-option {
  height: 50%;
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  font-size: 18px;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0.3, rgba(0, 0, 0, 0)),
    color-stop(0.7, rgba(0, 0, 0, 0.9))
  );
  transition: all 0.6s ease 0s;
}
.hideChannelPlayerOption {
  height: 0;
  overflow: hidden;
}
.hideChannelPlayerOption .option-infor,
.hideChannelPlayerOption .option-selector {
  bottom: -60px;
}
.option-infor {
  display: flex;
  position: absolute;
  bottom: 64px;
  left: 74px;
  transition: all 0.6s ease 0s;
}
.option-infor .collum-yelow {
  width: 6px;
  height: auto;
  background-color: #ffd200;
}
.option-infor .infor-content {
  margin-left: 16px;
  text-align: left;
}
.option-infor .infor-content .content-title {
  width: 690px;
  font-size: 30px;
}
.option-infor .infor-content .content-time {
  margin-top: 10px;
}
.option-selector {
  display: flex;
  position: absolute;
  bottom: 64px;
  right: 74px;
  transition: all 0.6s ease 0s;
}
.option-selector .option-item {
  height: 40px;
  width: 192px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  border-radius: 5px;
  margin-right: 12px;
}
.option-selector .option-item img {
  height: 42px;
}
.option-selector .option-item p {
  margin-top: 10px;
}
.option-selector .optionItemAcitved {
  background-color: #ffffff;
  color: #000000;
}
</style>