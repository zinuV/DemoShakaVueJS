<template>
  <div class="episode-menu">
    <div class="episode-menu-content">
      <p class="episode-title">Tập phim</p>
      <div class="episode-range">
        <div class="episode-range-character">
          <p :style="{height: epRangeActived === 0? 0: '100%'}">&#60;</p>
          <p :style="{height: epRangeActived === arrayEpRangeNumber.length - 1? 0: '100%'}">&#62;</p>
        </div>
        <div class="episode-range-number" :style="{ left:  epRangeNumberLeft + 'px' }">
          <div
            v-for="(key, index) in arrayEpRangeNumber"
            :key="index"
            :class="{epRangeActived: epRangeActived === index }"
          >
            <p>{{index === 0? '01':index*30+1}} - {{index === arrayEpRangeNumber.length - 1 ? epLength:index*30+30}}</p>
          </div>
        </div>
        <div class="episode-range-shadow"></div>
      </div>
      <div class="episode-list">
        <div class="epsode-list-selector" :style="{bottom: epSelectorBottom + 'px'}">
          <div
            class="episode-selector"
            v-for="(item, index) in rangeListEpisode[epRangeActived]"
            :key="index"
            :class="{episodeSelectorActived: index === currentPos}"
          >
            <img :src="item.poster" alt />
            <p>{{item.title}} - Tập {{item.id}}</p>
            <div class="timeline-watched" :style="{width: item.timeWatched/item.time*113 +'px'}"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EpisodeMenu",
  data() {
    return {
      currentPos: 0,
      epLength: 321,
      epRangeActived: 0,
      epRangeNumberLeft: 112,
      epSelectorBottom: 0,
    };
  },
  props: {
    keyCode: Number,
    eventKey: Boolean,
  },
  computed: {
    arrayEpRangeNumber: function () {
      return new Array(Math.ceil(this.epLength / 30)).fill(0);
    },
    listEpisode: function () {
      var array = new Array(this.epLength).fill(0);
      return array.map((value, index) => {
        return {
          id: index + 1,
          title: "Phim hay nhất thế kỷ",
          poster:
            "https://vtimes.com.au/up/images/08-20/3482800-sau-mot-thap-ky-inception-0.jpg",
          time: 60,
          timeWatched: 57,
        };
      });
    },
    rangeListEpisode: function () {
      return this.arrayEpRangeNumber.map((value, index) => {
        return this.listEpisode.filter((t_value, t_index) => {
          return t_index < (index + 1) * 30 && t_index >= index * 30;
        });
      });
    },
  },
  watch: {
    eventKey: function (vNew, vOld) {
      if (vNew != null) {
        var maxList = this.rangeListEpisode[this.epRangeActived].length;
        switch (this.keyCode) {
          case 37:
            //Left key pressed
            if (this.epRangeActived > 0) {
              this.epRangeActived--;
              this.epRangeNumberLeft += 138;
              this.currentPos = 0;
              this.epSelectorBottom = 0;
            }
            break;
          case 38:
            //Up key pressed
            if (this.currentPos > 0) {
              this.currentPos--;
              if (this.currentPos > 2 && this.currentPos < maxList - 4)
                this.epSelectorBottom -= 74;
            }
            break;
          case 39:
            //Right key pressed
            if (this.epRangeActived < this.arrayEpRangeNumber.length - 1) {
              this.epRangeActived++;
              this.epRangeNumberLeft -= 138;
              this.currentPos = 0;
              this.epSelectorBottom = 0;
            }
            break;
          case 40:
            //Down key pressed
            if (this.currentPos < maxList - 1) {
              this.currentPos++;
              if (this.currentPos > 3 && this.currentPos < maxList - 3)
                this.epSelectorBottom += 74;
            }
            break;
          case 13:
            //Enter key pressed
            this.$emit("openNewEpisodeDemo");
            break;
          case 8:
            //BackSpace key pess

            this.$emit("openMoviePlayerControl");
            break;
        }
      }
    },
  },
  mounted() {},
};
</script>

<style>
.episode-menu {
  position: absolute;
  top: 0;
  width: 1280px;
  height: 720px;
  background-color: rgba(0, 0, 0, 0.6);
}
.episode-menu .episode-menu-content {
  height: 100%;
  width: 490px;
  background-color: #000000;
  position: absolute;
  top: 0;
  right: 0;
  color: #ffffff;
  padding: 46px 64px;
  text-align: center;
}
.episode-menu-content .episode-title {
  font-size: 28px;
  margin-bottom: 40px;
}
.episode-menu-content .episode-range {
  text-align: center;
  position: relative;
  overflow: hidden;
}
.episode-menu-content .episode-range .episode-range-character {
  display: inline-flex;
  font-size: 42px;
  position: relative;
  bottom: 11px;
}
.episode-menu-content .episode-range .episode-range-character p {
  font-size: 38px;
  font-family: monospace;
  margin: 0 60px;
  overflow: hidden;
}
.episode-menu-content .episode-range .episode-range-number {
  display: flex;
  position: absolute;
  top: 0;
  transition: all 0.2s ease 0s;
}
.episode-menu-content .episode-range .episode-range-number div {
  width: 130px;
  margin: 4px;
  text-align: center;
}
.episode-menu-content .episode-range .episode-range-number div p {
  font-size: 20px;
  margin: auto 0;
  color: rgba(255, 255, 255, 0.5);
}
.epRangeActived {
  position: relative;
  bottom: 4px;
}
.epRangeActived P {
  font-size: 25px !important;
  color: #ffffff !important;
}
.episode-menu-content .episode-range .episode-range-shadow {
  display: block;
  height: 37px;
  width: 490px;
  background: -webkit-radial-gradient(
    center center,
    circle farthest-corner,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 0, 0, 0.85) 100%
  );
  z-index: 1000;
  position: relative;
  bottom: 50px;
  right: 60px;
}
.episode-menu-content .episode-list {
  height: 525px;
  overflow: hidden;
  position: relative;
  bottom: 36px;
}
.episode-menu-content .episode-list .epsode-list-selector {
  position: relative;
  transition: all 0.2s ease 0s;
}
.episode-menu-content .episode-list .epsode-list-selector .episode-selector {
  display: flex;
  margin: 10px 0;
  position: relative;
  font-family: sans-serif-medium;
}

.episode-list .epsode-list-selector .episode-selector img {
  width: 113px;
  height: 64px;
  margin-right: 16px;
}
.episode-list .epsode-list-selector .episode-selector p {
  margin: auto 5px;
  width: max-content;
}

.episode-list .epsode-list-selector .episode-selector .timeline-watched {
  height: 3px;
  background-color: gold;
  position: absolute;
  left: 0;
  bottom: 0;
}
.episodeSelectorActived {
  background-color: #ffffff;
  color: #000;
  border-radius: 6px;
}

.episode-menu > p {
  font-size: 22px;
  margin: 27px 0;
  text-align: left;
}
.menu-selecter {
  width: 100%;
  height: 44px;
  display: flex;
  padding: 11px 0;
  margin: 10px 0;
}
.menu-selecter img {
  width: 20px;
  height: 15px;
  margin: 3px 24px;
  position: absolute;
}
.menu-selecter p {
  font-size: 20px;
  position: static;
  margin: 0 auto;
  left: 132px;
}
.menuActived {
  background-color: #ffffff;
  color: #000000;
  border-radius: 7px;
}
</style>