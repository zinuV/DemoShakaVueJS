<template>
  <div class="groups-chanel">
    <h5 class="group-title">Các gói kênh</h5>
    <div class="groups-chanel-content group-content" :style="{left: leftMove + 'px'}">
      <div
        class="group-chanel"
        v-for="(item, index) in groupsChanel"
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
        <div class="price-chanel">
          <h4 class="price">{{item.feename}}</h4>
          <p class="vat">({{item.vat_message}})</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupChanel",
  data() {
    return {
      currentPos: 0,
      firtViewPos: 0,
      leftMove: 0,
      registered: 2,
    };
  },
  props: {
    groupsChanel: Array,
    keyCode: Number,
    eventKey: Boolean,
  },
  watch: {
    eventKey: function (vNew, vOld) {
      if (vNew != null) {
        var maxGroup = this.groupsChanel.length;
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
.groups-chanel {
}
.groups-chanel-content {
  display: flex;
  margin: auto 66px;
  transition: all 0.3s ease 0s;
}
.group-chanel {
  width: 367px;
  height: 496px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 0 12px;

  border-radius: 10px;
  text-align: center;
  position: relative;
}
.group-chanel .logo {
  height: 98px;
  width: auto;
  margin-top: 40px;
  margin-bottom: 32px;
}
.group-chanel .decription {
  margin-bottom: 16px;
}
.group-chanel .group-decription {
  margin: auto 40px;
  color: rgba(255, 255, 255, 0.5);
}
.group-chanel .group-decription p {
  line-height: 25px;
}
.group-chanel .registered {
  display: flex;
  position: absolute;
  bottom: 160px;
  left: 131px;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
}
.group-chanel .registered img {
  height: 16px;
  width: 16px;
  margin-right: 12px;
}
.group-chanel .price-chanel {
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
.group-chanel .price-chanel .vat {
  font-size: 14px;
}
.groupActived .price-chanel {
  background-color: #ffffff;
  color: #000000;
}
.registedActived .price-chanel {
  background-color: rgba(255, 255, 255, 0.5) !important;
}
</style>