<template>
  <div class="channel">
    <div class="channel-background"></div>
    <BroadcastSchedule
      v-show="currentPos === 1"
      :today="today"
      :broadcastScheduleAPI="broadcastSchedule"
      :eventKey="currentPos === 1?keyCode.eventKey:null"
      :keyCode="currentPos === 1?keyCode.value:0"
    />
  </div>
</template>

<script>
import "regenerator-runtime/runtime";
import OverviewChannel from "./OverviewChannel";
import BroadcastSchedule from "./BroadcastSchedule";
export default {
  name: "Channel",
  data() {
    return {
      currentPos: 1,
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
    };
  },
  components: {
    OverviewChannel,
    BroadcastSchedule,
  },
  methods: {
    getAPI: async function (url, postJson, option) {
      var postJsonString = JSON.stringify(postJson);
      var result = await fetch(url, {
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
      return result;
    },
  },
  created() {
    var self = this;
    var GetAPI = async function () {
      // Get Broadcast schedule api
      var jsonYesterday = {
        channelid: "1",
        date: "2020/08/06",
      };
      var jsonToday = {
        channelid: "1",
        date: "2020/08/07",
      };
      var jsonTomorrow = {
        channelid: "1",
        date: "2020/08/08",
      };
      var getYesterdayAPI = await self.getAPI(
        self.api.apiBroadcastSchedule,
        jsonYesterday,
        "POST"
      );
      var getTodayAPI = await self.getAPI(
        self.api.apiBroadcastSchedule,
        jsonToday,
        "POST"
      );
      var getTomorrowAPI = await self.getAPI(
        self.api.apiBroadcastSchedule,
        jsonTomorrow,
        "POST"
      );

      self.broadcastSchedule = [
        getYesterdayAPI.items,
        getTodayAPI.items,
        getTomorrowAPI.items,
      ];
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