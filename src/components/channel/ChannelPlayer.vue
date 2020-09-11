<template>
  <div class="channel-player">
    <video poster="https://static1.srcdn.com/wordpress/wp-content/uploads/2020/04/Inception-1.jpg"></video>
    <ChannelPlayerOption
      v-show="currentPos === 1"
      :eventKey="currentPos === 1?eventKey:null"
      :keyCode="currentPos === 1?keyCode:0"
      :infor="infor"
      @changeCurrentPos="changeCurrentPos"
    />
  </div>
</template>
<script>
import ChannelPlayerOption from "./ChannelPlayerOption";
export default {
  name: "ChannelPlayer",
  data() {
    return {
      currentPos: 1,
    };
  },
  props: {
    keyCode: Number,
    eventKey: Boolean,
    infor: Object,
  },
  components: { ChannelPlayerOption },
  methods: {
    changeCurrentPos(value) {
      this.$emit("changeCurrentPos", value);
    },
  },
  watch: {
    eventKey: function (vNew, vOld) {
      if (vNew != null) {
        switch (this.keyCode) {
          case 37:
            //Left key pressed

            break;
          case 38:
            //Up key pressed

            break;
          case 39:
            //Right key pressed

            break;
          case 40:
            //Down key pressed

            break;
          case 13:
            //Enter key pressed

            break;
        }
      }
    },
  },
};
</script>

<style>
.channel-player {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  z-index: 0;
}
.channel-player video {
  width: 100%;
  height: 100%;
}
.option {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;

  z-index: 100;
  font-size: 24px;
  text-align: center;
}
.option .next-channel {
  position: absolute;
  top: 10px;
  left: 48%;
}
.option .next-channel .next-channel-character {
  transform: rotate(90deg);
  font-size: 55px;
  position: relative;
  top: 10px;
}
.option .pre-channel {
  position: absolute;
  bottom: 10px;
  left: 46.5%;
}
.option .pre-channel .pre-channel-character {
  transform: rotate(-90deg);
  font-size: 55px;
  position: relative;
  bottom: 10px;
}

.option .category {
  position: absolute;
  display: flex;
  top: 50%;
  left: 70px;
}
.option .category .category-character {
  font-size: 55px;
  position: relative;
  right: 7px;
  bottom: 23px;
}
.option .more {
  position: absolute;
  display: flex;
  top: 49.5%;
  right: 70px;
}
.option .more .more-character {
  transform: rotate(180deg);
  font-size: 55px;
  position: relative;
  left: 7px;
  bottom: 10px;
}
.optionActived {
  color: darkgoldenrod;
}
</style>