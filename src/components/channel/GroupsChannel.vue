<template>
  <div class="groups-channel">
    <h5 class="group-title">Các gói kênh</h5>
    <div class="groups-channel-content group-content" :style="{left: leftMove + 'px'}">
      <div
        class="group-channel"
        v-for="(item, index) in groupsChannel"
        :key="index"
        :class="{groupActived: currentPos === index, registedActived: currentPos === registered && currentPos === index}"
      >
        <div class="logo">
          <img :src="item.image" alt />
        </div>
        <h4 class="decription">{{item.description}}</h4>
        <div class="group-decription" v-html="item.group_description"></div>
        <div class="registered" v-if=" registered === index">
          <img src="../../assets/icon-control/registered.png" alt />
          <p>Đã đăng ký</p>
        </div>
        <div class="price-channel">
          <h4 class="price">{{item.feename}}</h4>
          <p class="vat">({{item.vat_message}})</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupChannel",
  data() {
    return {
      currentPos: 0,
      firtViewPos: 0,
      leftMove: 0,
      registered: 2,
    };
  },
  props: {
    groupsChannel: Array,
    keyCode: Number,
    eventKey: Boolean,
  },
  watch: {
    eventKey: function (vNew, vOld) {
      if (vNew != null) {
        var maxGroup = this.groupsChannel.length;
        switch (this.keyCode) {
          case 37:
            //Left key pressed
            if (this.currentPos > 0) {
              this.currentPos--;
              if (this.currentPos < this.firtViewPos) {
                this.firtViewPos--;
                this.leftMove += 391;
              }
            }
            break;
          case 38:
            //Up key pressed
            this.$emit("changeCurrentPostChannel", 0);
            break;
          case 39:
            //Right key pressed
            if (this.currentPos < maxGroup - 1) {
              this.currentPos++;

              if (this.currentPos > this.firtViewPos + 2) {
                this.firtViewPos++;
                this.leftMove -= 391;
              }
            }

            break;
          case 40:
            //Down key pressed
            this.$emit("changeCurrentPostChannel", 1);
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
.groups-channel {
  position: absolute;
}
.groups-channel-content {
  display: flex;
  margin: auto 66px;
  transition: all 0.3s ease 0s;
}
.group-channel {
  width: 367px;
  height: 496px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 0 12px;

  border-radius: 10px;
  text-align: center;
  position: relative;
}
.group-channel .logo {
  height: 98px;
  width: auto;
  margin-top: 40px;
  margin-bottom: 32px;
}
.group-channel .decription {
  margin-bottom: 16px;
}
.group-channel .group-decription {
  margin: auto 40px;
  color: rgba(255, 255, 255, 0.5);
}
.group-channel .group-decription p {
  line-height: 25px;
}
.group-channel .registered {
  display: flex;
  position: absolute;
  bottom: 160px;
  left: 131px;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
}
.group-channel .registered img {
  height: 16px;
  width: 16px;
  margin-right: 12px;
}
.group-channel .price-channel {
  width: 287px;
  height: 104px;
  color: rgba(255, 255, 255, 0.5);
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  position: absolute;
  bottom: 40px;
  left: 40px;
  padding: 24px;
}
.group-channel .price-channel .vat {
  font-size: 14px;
}
.groupActived .price-channel {
  background-color: #ffffff;
  color: #000000;
}
.registedActived .price-channel {
  background-color: rgba(255, 255, 255, 0.3) !important;
}
</style>