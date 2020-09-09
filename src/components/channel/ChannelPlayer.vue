<template>
  <div class="channel-player">
    <video poster="https://static1.srcdn.com/wordpress/wp-content/uploads/2020/04/Inception-1.jpg"></video>
    <div class="option">
      <div class="pre-channel">
        <p>&#8249;</p>
        <p>Kênh trước</p>
      </div>
      <div class="next-channel"></div>
      <div class="category"></div>
      <div class="more"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChannelPlayer",
  data() {
    return {};
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
</style>