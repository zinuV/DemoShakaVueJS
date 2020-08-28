<template>
  <div class="chanel">
    <div class="chanel-background"></div>
    <GroupsChanel
      :groupsChanel="groupsChanel"
      :eventKey="currentPos === 0?keyCode.eventKey:null"
      :keyCode="currentPos === 0?keyCode.value:0"
    />
  </div>
</template>

<script>
import GroupsChanel from "./GroupsChanel";
export default {
  name: "Chanel",
  data() {
    return {
      currentPos: 0,
      keyCode: { value: null, eventKey: false },
      api:
        "https://api.fbox.fpt.vn/fboxapi/iptv/getchannel/v1/404A030430C1/SGDN00017/2704564/90/2704564/en/VDSL/0/0/1?st=hqWajCcuqSfaTOiCL0qBnw&expires=91957457191&pf=1",
      groupsChanel: [],
      synthesisChanel: [],
      individualChannel: [],
    };
  },
  components: {
    GroupsChanel,
  },
  created() {
    var app = this;
    fetch(app.api)
      .then((response) => response.json())
      .then(function (data) {
        app.groupsChanel = data.root.itemgroup;
        app.synthesisChanel = data.root.itemlist;
        app.individualChannel = data.root.itemlist;
      });
  },
  mounted() {
    var self = this;
    document.onkeydown = function (event) {
      self.keyCode.value = event.keyCode;
      self.keyCode.eventKey = !self.keyCode.eventKey;
    };
  },
};
</script>

<style>
.chanel {
  width: 1280px;
  height: 720px;
  color: #ffffff;

  position: relative;
  margin: auto;
  overflow: hidden;
  background-image: url("https://cdn.zeplin.io/5ecf377c5c37522964539dbc/assets/cd1040d4-4169-4aeb-b69c-993dc53a2139.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
.chanel-background {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}
.group-title {
  position: absolute;
  top: 90px;
  left: 100px;
}
.group-content {
  height: 496px;
  position: absolute;
  top: 132px;
}
</style>