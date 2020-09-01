<template>
  <div class="list-item-channel">
    <h5 class="group-title">{{title}}</h5>
    <div class="list-item-channel-content group-content" :style="{left: '-4570px'}">
      <div
        class="col-item-channel"
        v-for="(item, index) in arrayNumColsItemChannel"
        :key="index"
        :style="{left: colItemChannelLeft(index) + 'px',transition: useTransition(index)?'all 0.4s ease 0s':''}"
      >
        <ItemChannel
          v-for="(t_item, t_index) in arrayNumColsItemChannel[index]"
          :key="t_index"
          :itemChannel="t_item"
          :index="index*7+t_index"
          :class="{itemChannelActived: currentPos === index*7+t_index}"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ItemChannel from "./ItemChannel";
export default {
  name: "ListItemChannel",
  data() {
    return {
      colCenter: 1,
      currentPos: 0,
    };
  },
  components: {
    ItemChannel,
  },
  props: {
    title: String,
    listItemChannelProp: Array,
    keyCode: Number,
    eventKey: Boolean,
  },
  computed: {
    dataLength: function () {
      return this.listItemChannelProp.length;
    },
    numColsItemChannel: function () {
      return this.colPos(this.dataLength);
    },
    arrayNumColsItemChannel: function () {
      var tmp = new Array(this.numColsItemChannel).fill(0);
      for (var index = 0; index < this.numColsItemChannel; index++) {
        tmp[index] = this.listItemChannelProp.slice(index * 7, index * 7 + 7);
      }
      return tmp;
    },
  },
  methods: {
    vitrualColPos(colPos) {
      var max = this.numColsItemChannel;
      var mid = Math.floor(max / 2) - 1;
      var pos = mid + colPos - this.colCenter;
      pos < 0 ? (pos += max) : (pos %= max);
      return pos;
    },
    colItemChannelLeft(index) {
      return this.vitrualColPos(index) * 386;
    },
    useTransition(index) {
      var pos = this.vitrualColPos(index);
      var mid = Math.floor(this.numColsItemChannel / 2) - 1;
      if (pos > mid - 4 && pos < mid + 4) return true;
      else return false;
    },
    colPos(currentPos) {
      return Math.ceil((currentPos + 1) / 7);
    },
  },
  watch: {
    eventKey: function (vNew, vOld) {
      if (vNew != null) {
        switch (this.keyCode) {
          case 37:
            //Left key pressed
            this.currentPos -= 7;
            if (this.currentPos < 0) {
              var tmp = this.currentPos + 7;
              if (tmp > (this.dataLength % 7) - 1)
                this.currentPos = this.dataLength - 1;
              else this.currentPos = this.dataLength + tmp - 5;
            }
            if (
              this.vitrualColPos(this.colPos(this.currentPos)) <
              Math.floor(this.numColsItemChannel / 2) - 1
            )
              this.colCenter--;
            this.colCenter < 0
              ? (this.colCenter += this.numColsItemChannel)
              : 0;
            break;
          case 38:
            //Up key pressed

            if (this.currentPos % 7 > 0) this.currentPos--;
            else {
              this.$emit("changeCurrentPostChannel", 0);
              setTimeout(() => {
                this.currentPos = 0;
                this.colCenter = 1;
              }, 400);
            }
            break;
          case 39:
            //Right key pressed
            this.currentPos += 7;
            if (this.currentPos >= this.dataLength) {
              if (this.colPos(this.currentPos) > this.numColsItemChannel) {
                this.currentPos %= 7;
              } else {
                this.currentPos = this.dataLength - 1;
              }
            }

            if (
              this.vitrualColPos(this.colPos(this.currentPos)) >
              Math.floor(this.numColsItemChannel / 2) + 1
            )
              this.colCenter++;
            this.colCenter >= this.numColsItemChannel
              ? (this.colCenter %= this.numColsItemChannel)
              : 0;
            break;
          case 40:
            //Down key pressed
            if (
              this.currentPos % 7 < 6 &&
              this.currentPos < this.dataLength - 1
            )
              this.currentPos++;
            else {
              this.$emit("changeCurrentPostChannel", 1);
              setTimeout(() => {
                this.currentPos = 0;
                this.colCenter = 1;
              }, 400);
            }
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
.list-item-channel {
  position: absolute;
}
.list-item-channel-content {
  display: flex;
  position: relative;
}
.col-item-channel {
  margin: 0 4px;
  position: absolute;
}
</style>