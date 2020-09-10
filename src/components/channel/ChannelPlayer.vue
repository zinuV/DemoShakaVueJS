<template>
  <div class="channel-player">
    <video poster="https://static1.srcdn.com/wordpress/wp-content/uploads/2020/04/Inception-1.jpg"></video>
    <div v-show="currentPos<4 &&currentPos>=0" class="option">
      <div class="next-channel" :class="{optionActived: currentPos ===0 }">
        <p class="next-channel-character">&#8249;</p>
        <p>Kênh sau</p>
      </div>
      <div class="pre-channel" :class="{optionActived: currentPos ===2 }">
        <p>Kênh trước</p>
        <p class="pre-channel-character">&#8249;</p>
      </div>

      <div class="category" :class="{optionActived: currentPos ===3 }">
        <p class="category-character">&#8249;</p>
        <p>Danh mục</p>
      </div>
      <div class="more" :class="{optionActived: currentPos ===1 }">
        <p>Mở rộng</p>
        <p class="more-character">&#8249;</p>
      </div>
    </div>
    <ChannelPlayerOptionMore />
  </div>
</template>
<script>
import ChannelPlayerOptionMore from "./ChannelPlayerOptionMore";
export default {
  name: "ChannelPlayer",
  data() {
    return {
      currentPos: -1,
    };
  },
  props: {
    keyCode: Number,
    eventKey: Boolean,
  },
  components: { ChannelPlayerOptionMore },
  watch: {
    eventKey: function (vNew, vOld) {
      if (vNew != null) {
        switch (this.keyCode) {
          case 37:
            //Left key pressed
            this.currentPos = 3;
            break;
          case 38:
            //Up key pressed
            this.currentPos = 0;
            break;
          case 39:
            //Right key pressed
            this.currentPos = 1;
            break;
          case 40:
            //Down key pressed
            this.currentPos = 2;
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