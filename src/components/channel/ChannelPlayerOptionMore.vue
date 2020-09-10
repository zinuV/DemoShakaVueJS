<template>
  <div class="option-more"></div>
</template>

<script>
export default {
  name: "ChannelPlayerOptionMore",
  data() {
    return {
      currentPos: 0,
    };
  },
};
</script>

<style>
.option-more {
  height: 100%;
  width: 50%;
  position: absolute;
  top: 0;
  right: 0;
  background: -webkit-gradient(
    linear,
    right top,
    left top,
    color-stop(0.4, #cc0000),
    color-stop(0.6, rgba(0, 0, 0, 0))
  );
}
.option-review,
.option-broadcast-schedule {
  display: flex;
  height: 56px;
  width: 280px;
  position: relative;
  top: 0;
  left: 0;
}
.option-review img {
  width: 16px;
  height: 16px;
}
.option-broadcast-schedule {
}
.option-broadcast-schedule img {
  width: 16px;
  height: 16px;
}
</style>