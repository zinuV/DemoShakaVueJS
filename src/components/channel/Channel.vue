<template>
  <div class="channel">
    <div class="channel-background"></div>
    <OverviewChannel
      v-show="currentPos === 0"
      :overviewChannelAPI="overviewChannel"
      :eventKey="currentPos === 0?keyCode.eventKey:null"
      :keyCode="currentPos === 0?keyCode.value:0"
      :openOverviewFromPlayer="openOverviewFromPlayer"
      @setEventKey="setEventKey"
      @openBroadcastSchedule="openBroadcastSchedule"
      @changeCurrentPos="changeCurrentPos"
    />
    <BroadcastSchedule
      v-show="currentPos === 1"
      :showBs="currentPos === 1?true:false"
      :title="broadcastScheduleTitle"
      :today="today"
      :broadcastScheduleAPI="broadcastSchedule"
      :eventKey="currentPos === 1?keyCode.eventKey:null"
      :keyCode="currentPos === 1?keyCode.value:0"
      :openBroadcastScheduleFromPlayer="openBroadcastScheduleFromPlayer"
      @changeCurrentPos="changeCurrentPos"
      @openChannelPlayer="openChannelPlayer"
      @openOverviewChannel="openOverviewChannel"
    />
    <ChannelPlayer
      :eventKey="currentPos === 2?keyCode.eventKey:null"
      :keyCode="currentPos === 2?keyCode.value:0"
      :infor="channelPlaying"
      @changeCurrentPos="changeCurrentPos"
    />
  </div>
</template>

<script>
import "regenerator-runtime/runtime";
import OverviewChannel from "./OverviewChannel";
import BroadcastSchedule from "./BroadcastSchedule";
import ChannelPlayer from "./ChannelPlayer";
export default {
  name: "Channel",
  data() {
    return {
      currentPos: 0,
      keyCode: { value: null, eventKey: false },
      today: new Date(),
      api: {
        apiChannel:
          "https://api.fbox.fpt.vn/fboxapi/iptv/getchannel/v1/404A030430C1/SGDN00017/2704564/90/2704564/en/VDSL/0/0/1?st=hqWajCcuqSfaTOiCL0qBnw&expires=91957457191&pf=1",
        apiBroadcastSchedule:
          "https://dev-api.fbox.fpt.vn/foxytv/iptv/broadcast_schedule/v1/vi/40490FBEC378/SGH068486/600529/600529/91/0?pf=0&fw=3.3.3&chipset=tizen",
      },
      overviewChannel: {},
      broadcastSchedule: [],
      broadcastScheduleOpen: -1,
      broadcastScheduleTitle: "",
      openOverviewFromPlayer: false,
      openBroadcastScheduleFromPlayer: false,
      channelPlaying: {},
    };
  },
  components: {
    OverviewChannel,
    BroadcastSchedule,
    ChannelPlayer,
  },
  methods: {
    getAPI: async function (url, postJson, option) {
      var result;
      if (option == "GET" || option == "get") {
        result = await fetch(url)
          .then((response) => response.json())
          .then((json) => {
            return json;
          })
          .catch((error) =>
            console.log("Authorization failed : " + error.message)
          );
      } else if (option == "POST" || option == "post") {
        var postJsonString = JSON.stringify(postJson);
        result = await fetch(url, {
          method: option,
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          timeout: 5000, //request timeout,
          body: postJsonString,
        })
          .then((response) => response.json())
          .then((json) => {
            return json;
          })
          .catch((error) =>
            console.log("Authorization failed : " + error.message)
          );
      }

      return result;
    },
    setEventKey: function (value) {
      this.keyCode.value = value;
    },
    openBroadcastSchedule: function (value) {
      var self = this;
      self.currentPos = 1;
      self.keyCode.value = null;
      if (value == null) value = self.broadcastScheduleOpen;
      if (self.broadcastScheduleOpen != value) {
        self.broadcastScheduleOpen = value;
        self.broadcastScheduleTitle =
          self.overviewChannel.root.itemlist[
            self.broadcastScheduleOpen
          ].channelname;
        var GetAPI = async function () {
          self.broadcastSchedule = [];
          // Get Broadcast schedule api
          var jsonObject = {
            channelid: "1",
          };

          var getData = await self.getAPI(
            self.api.apiBroadcastSchedule,
            jsonObject,
            "POST"
          );

          self.broadcastSchedule = [
            getData.items[0].schedule,
            getData.items[1].schedule,
            getData.items[2].schedule,
          ];
        };
        GetAPI();
      }
    },
    openOverviewChannel: function () {
      this.currentPos = 0;
      this.keyCode.value = null;
    },
    openChannelPlayer(value) {
      this.currentPos = 2;
      this.keyCode.value = null;
      this.channelPlaying = value;
    },
    changeCurrentPos: function (value) {
      this.currentPos = value;
      this.keyCode.value = null;
      if (value === 0) this.openOverviewFromPlayer = true;
      if (value === 1) this.openBroadcastScheduleFromPlayer = true;
    },
  },
  watch: {
    broadcastScheduleOpen: function (vNew, vOld) {
      this.broadcastScheduleTitle = this.overviewChannel.root.itemlist[
        vNew
      ].channelname;
    },
  },
  created() {
    var self = this;
    var GetAPI = async function () {
      // Get Overview Channel api
      self.overviewChannel = await self.getAPI(self.api.apiChannel, {}, "GET");
    };
    GetAPI();
  },

  mounted() {
    var self = this;
    document.onkeydown = function (event) {
      self.keyCode.value = event.keyCode;
      self.keyCode.eventKey = !self.keyCode.eventKey;
    };

    var setRealTime = setInterval(() => {
      var tmp = new Date();
      this.$set(self, "today", tmp);
    }, 500);
  },
};
</script>

<style>
.channel {
  width: 1280px;
  height: 720px;
  color: #ffffff;
  text-align: center;
  position: relative;
  margin: auto;
  overflow: hidden;
  background-image: url("https://cdn.zeplin.io/5ecf377c5c37522964539dbc/assets/cd1040d4-4169-4aeb-b69c-993dc53a2139.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
.channel-background {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}
</style>