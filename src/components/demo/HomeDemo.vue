<template>
  <div id="home-demo">
    <div class="menu-list">
      <img src="../../assets/images/menu.png" alt="" />
    </div>
    <div class="content" id="app">
      <div class="show-item">
        <p class="name-list">Đề Xuất</p>
        <p class="length-list">1 / 8</p>
        <div
          class="list-item"
          :style="{ right: currentPosition.y === 0 ? rightPercent + '%' : '0' }"
        >
          <div class="item" v-for="(item, index) in items" :key="index">
            <div class="box-item" :class="{ selected: arrSelect[0][index] }">
              <img
                :src="item.image"
                alt=" "
                :class="{ selectedimg: arrSelect[0][index] }"
              />
            </div>
            <p class="nameItem" :class="{ selectedname: arrSelect[0][index] }">
              {{ item.title }}
            </p>
          </div>
        </div>
      </div>
      <div class="show-item list-second">
        <p class="name-list">Xu Hướng</p>
        <p class="length-list">1 / 8</p>
        <div
          class="list-item"
          :style="{ right: currentPosition.y === 1 ? rightPercent + '%' : '0' }"
        >
          <div class="item" v-for="(item, index) in items" :key="index">
            <div class="box-item" :class="{ selected: arrSelect[1][index] }">
              <img
                :src="item.image"
                alt=" "
                :class="{ selectedimg: arrSelect[1][index] }"
              />
            </div>
            <p class="nameItem">{{ item.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeDemo",
  data: function() {
    return {
      rightPercent: 0,
      items: [],
      arrSelect: [],
      currentPosition: { x: 0, y: 0 },
      firstViewPosition: 0,
      api:
        "https://api-smarttv.fbox.fpt.vn/smarttv/vod/getitemlist/v1/B8FFB303FFE8/SGDN00017/1103728/90/1103728/vi/1/1/0/0/1/0/70/11?&st=hqWajCcuqSfaTOiCL0qBnw&expires=91957457191&pf=11",
    };
  },
  created() {
    var app = this;
    fetch(this.api)
      .then((response) => response.json()) // Transform the data into json
      .then(function(data) {
        app.items = data.root.item;
        app.arrSelect = [
          app.items.map((value, index) => {
            return index < 1;
          }),
          app.items.map((index) => {
            return false;
          }),
        ];
      });

    document.onkeydown = function(event) {
      switch (event.keyCode) {
        case 37:
          //console.log('Left key pressed');
          app.left();
          break;
        case 38:
          //console.log('Up key pressed');
          app.up();
          break;
        case 39:
          //console.log('Right key pressed');
          app.right();
          break;
        case 40:
          //console.log('Down key pressed');
          app.down();
          break;
        case 13:
          //console.log('Enter key pressed');
          app.enter();
          break;
      }
    };
  },

  methods: {
    updatePos: function(newPos) {
      let tmpPos = Object.assign({}, this.currentPosition);
      this.$set(this.arrSelect[tmpPos.y], tmpPos.x, false);
      this.currentPosition.x = newPos.x;
      this.currentPosition.y = newPos.y;
      this.$set(this.arrSelect[newPos.y], newPos.x, true);
    },
    up: function() {
      if (this.currentPosition.y > 0) {
        this.updatePos({
          x: 0,
          y: this.currentPosition.y - 1,
        });
        this.$set(this, "rightPercent", 0);
        this.$set(this, "firstViewPosition", 0);
      }
    },
    down: function() {
      if (this.currentPosition.y < this.arrSelect.length - 1) {
        this.updatePos({
          x: 0,
          y: this.currentPosition.y + 1,
        });
        this.$set(this, "rightPercent", 0);
        this.$set(this, "firstViewPosition", 0);
      }
    },
    left: function() {
      if (this.currentPosition.x > 0) {
        this.updatePos({
          x: this.currentPosition.x - 1,
          y: this.currentPosition.y,
        });
        if (
          this.currentPosition.x <= this.firstViewPosition &&
          this.firstViewPosition != 0
        ) {
          this.$set(
            this,
            "rightPercent",
            this.rightPercent - 100 / this.items.length
          );
          this.$set(this, "firstViewPosition", this.firstViewPosition - 1);
        }
      }
    },
    right: function() {
      if (
        this.currentPosition.x <
        this.arrSelect[this.currentPosition.y].length - 1
      ) {
        this.updatePos({
          x: this.currentPosition.x + 1,
          y: this.currentPosition.y,
        });

        if (this.currentPosition.x > this.firstViewPosition + 5) {
          this.$set(
            this,
            "rightPercent",
            this.rightPercent + 100 / this.items.length
          );
          this.$set(this, "firstViewPosition", this.firstViewPosition + 1);
        }
      }
    },
    enter: function() {
      this.$router.push("/movieplayer");
    },
  },
};
</script>

<style>
#home-demo {
  width: 2500px;
  height: 1600px;
  background-color: black;
  color: white;
  overflow: hidden;
  display: inline-flex;
}

.menu-list {
  margin-top: 150px;
  position: absolute;
}

.content {
  margin-left: 8rem;
  margin-top: 9rem;
}

.show-item {
  overflow: hidden;
}

.show-item p {
  margin-left: 30px;
}

.name-list {
  width: 500px;
  font-size: 3rem;
}

.length-list {
  position: relative;
  top: 50px;
  left: 2120px;
  visibility: hidden;
}

.list-item {
  clear: both;
  display: flex;
  position: relative;
  margin: 1rem -15px;
  width: 100%;
  padding-left: 1rem;
  transition: all 0.3s ease 0s;
}

.item {
  cursor: pointer;
  width: 14.28%;
}

.item .box-item {
  height: 35rem;
  width: 20rem;
  margin: 0 15px;
  position: relative;
  border-radius: 0.5rem;
}

.item img {
  height: 30rem;
  width: 20rem;
  margin: auto;
  display: block;
  transition: 0.3s all ease-in-out;
  border-radius: 1rem;
}

.list-second {
  margin-top: -3rem;
}

.item p {
  font-size: 2rem;
  text-align: center;
  margin: 0;
  opacity: 0;
}

.selected::after {
  content: "";
  position: absolute;
  top: -0.5rem;
  left: -0.5rem;
  right: -0.5rem;
  bottom: 45px;
  display: block;
  margin: 0 auto;
  border: 5px solid oldlace;
  border-radius: 1rem;
}

.selectedimg {
  transform: scale(1.05);
}

.selectedlist {
  color: orange !important;
  font-size: 4rem !important;
}

.selectedname {
  opacity: 1 !important;
}
</style>
