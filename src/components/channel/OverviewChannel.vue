<template>
  <div class="overview-channel">
    <div v-show="instruction.show  " class="instruction-up">
      <p class="instruction-letter">&#10092;</p>
      <p>{{instruction.up}}</p>
    </div>
    <div v-show="instruction.show " class="instruction-down">
      <p>{{instruction.down}}</p>
      <p class="instruction-letter">&#10092;</p>
    </div>
    <ListItemChannel
      :title="'Danh sách kênh tổng hợp'"
      :listItemChannelProp="synthesisChannel"
      :eventKey="currentPos === 0?eventKey:null"
      :keyCode="currentPos === 0?keyCode:0"
      @changeCurrentPostChannel="changeCurrentPostChannel"
      :class="{component: currentPos === 0 || prePos === 0}"
      :style="{top: componentTop(0)+'px'}"
    />
    <GroupsChannel
      :groupsChannel="groupsChannel"
      :eventKey="currentPos === 1?eventKey:null"
      :keyCode="currentPos === 1?keyCode:0"
      @changeCurrentPostChannel="changeCurrentPostChannel"
      :class="{component: currentPos === 1 || prePos === 1}"
      :style="{top: componentTop(1)+'px'}"
    />

    <ListItemChannel
      :title="'Danh sách kênh cá nhân'"
      :listItemChannelProp="individualChannel"
      :eventKey="currentPos === 2?eventKey:null"
      :keyCode="currentPos === 2?keyCode:0"
      @changeCurrentPostChannel="changeCurrentPostChannel"
      :class="{component: currentPos === 2 || prePos === 2}"
      :style="{top: componentTop(2)+'px'}"
    />
  </div>
</template>

<script>
import GroupsChannel from "./GroupsChannel";
import ListItemChannel from "./ListItemChannel";

export default {
  name: "OverviewChannel",
  data() {
    return {
      currentPos: 1,
      prePos: 0,
      listTitle: [
        "Các gói kênh",
        "Danh sách kênh tổng hợp",
        "Danh sách kênh cá nhân",
      ],
      instruction: {
        up: "Danh sách kênh tổng hợp",
        down: "Danh sách kênh cá nhân",
        show: true,
      },
      groupsChannel: [],
      synthesisChannel: [],
      individualChannel: [],
    };
  },
  components: {
    GroupsChannel,
    ListItemChannel,
  },
  props: {
    overviewChannelAPI: Object,
    keyCode: Number,
    eventKey: Boolean,
  },
  methods: {
    vitrualPos(pos) {
      var max = 3;
      var mid = 1;
      var tmpPos = pos + mid - this.currentPos;
      tmpPos < 0 ? (tmpPos += max) : (tmpPos %= max);
      return tmpPos;
    },
    componentTop(pos) {
      return (this.vitrualPos(pos) - 1) * 720;
    },

    changeCurrentPostChannel(value) {
      this.$emit("setEventKey", null);
      var tmpPos = this.currentPos;
      if (value === 0) {
        tmpPos--;
        if (tmpPos < 0) tmpPos = 2;
      } else if (value === 1) {
        tmpPos++;
        if (tmpPos > 2) tmpPos = 0;
      }
      this.prePos = this.currentPos;
      this.currentPos = tmpPos;
      this.changeIntruction(tmpPos);
      this.instruction.show = false;
      setTimeout(() => {
        this.instruction.show = true;
      }, 300);
    },
    changeIntruction(pos) {
      switch (pos) {
        case 0:
          this.instruction.up = this.listTitle[2];
          this.instruction.down = this.listTitle[0];
          break;
        case 1:
          this.instruction.up = this.listTitle[1];
          this.instruction.down = this.listTitle[2];
          break;
        case 2:
          this.instruction.up = this.listTitle[0];
          this.instruction.down = this.listTitle[1];
          break;
      }
    },
  },
  watch: {
    overviewChannelAPI: function () {
      if (this.overviewChannelAPI != null) {
        this.groupsChannel = this.overviewChannelAPI.root.itemgroup;
        this.synthesisChannel = this.overviewChannelAPI.root.itemlist;
        this.individualChannel = this.overviewChannelAPI.root.itemlist;
      }
    },
  },
};
</script>

<style>
.group-title {
  width: max-content;
  position: absolute;
  top: 90px;
  left: 100px;
}
.group-content {
  height: 496px;
  position: absolute;
  top: 132px;
}
.component {
  transition: all 0.5s ease 0s;
}
.instruction-up,
.instruction-down {
  width: 200px;
  left: 42%;
  position: absolute;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
}
.instruction-up {
  top: 10px;
}

.instruction-up .instruction-letter {
  font-size: 24px;
  font-weight: 900;
  transform: rotate(90deg);
  position: relative;
  top: 5px;
}
.instruction-down {
  bottom: 10px;
}
.instruction-down .instruction-letter {
  font-size: 24px;
  font-weight: 900;
  transform: rotate(270deg);
  position: relative;
  bottom: 5px;
  right: 3px;
}
</style>