<template>
  <div class="item-channel">
    <div class="item-channel-logo">
      <img :src="itemChannel.logourl" alt />
    </div>
    <p>{{index}}</p>
    <p class="separator">|</p>
    <p>{{nameChannel(itemChannel.channelname)}}</p>
  </div>
</template>

<script>
export default {
  name: "ItemChannel",
  props: {
    itemChannel: Object,
    index: Number,
  },
  methods: {
    nameChannel(name) {
      if (name.length > 17) return name.slice(0, 16) + "...";
      return name;
    },
  },
};
</script>

<style>
.item-channel {
  width: 378px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  position: relative;
  margin: 8px auto;
}
.item-channel-logo {
  width: 80px;
  height: auto;
  margin: auto 16px;
}
.item-channel-logo img {
  width: 100%;
  height: 100%;
}
.item-channel p {
  width: max-content;
  margin: auto 8px;
  font-size: 16px;
}
.item-channel .separator {
  color: rgba(255, 255, 255, 0.5);
}
.itemChannelActived {
  background-color: #ffffff;
  color: #000000;
  transform: scale(1.05);
  transition: all 0.2s ease 0s;
}
.itemChannelActived .separator {
  color: rgba(0, 0, 0, 0.5);
  transition: none;
}
</style>