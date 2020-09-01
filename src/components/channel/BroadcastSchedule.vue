<template>
  <div class="broadcast-schedule">
    <div
      class="bs-title"
    >VTV1 - Lịch phát sóng ngày {{today.getDate()}}/{{today.getMonth()+1}}/{{today.getFullYear()}}</div>

    <div class="bs-time">
      <div class="bs-time-character">
        <p :style="{height: true? '100%':0}">&#10092;</p>
        <p :style="{height: true? '100%':0}">&#10093;</p>
      </div>
      <div class="bs-time-name">
        <p>Hôm qua</p>
        <p>Hôm nay</p>
        <p>Ngày mai</p>
      </div>
    </div>
    <div class="bs-content">
      <div class="bs-show-content">
        <div class="bs-content-item" v-for="(item, index) in  broadcastSchedule" :key="index">
          <p class="bs-content-item-time">{{item.time}}</p>
          <img class="icon-play-back" src="../../assets/icon-control/play-back.png" alt />
          <div class></div>
          <p class="bs-content-item-name">{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BroadcastSchedule",
  data() {
    return {
      today: new Date(),
      broadcastSchedule: [
        { time: "00:00", name: "Câu truyện lúc nửa đêm" },
        { time: "01:45", name: "Phim điện ảnh | Ám ảnh kinh hoàng" },
        { time: "03:10", name: "Hành trình phá án - Kẻ sát nhân hàng loạt" },
        { time: "04:00", name: "Giải mã Thiên Linh Cái" },
        { time: "05:15", name: "Thể dục buổi sáng" },
        { time: "06:00", name: "Cà phê sáng" },
        { time: "06:45", name: "chào ngày mới" },
        { time: "07:15", name: "Thời sự 7h" },
        { time: "08:00", name: "Phim truyện | Cô dâu trăm tuổi - Tập 1001" },
        { time: "09:10", name: "Truy tìm tượng phật" },
        { time: "10:00", name: "Phim hoạt hình | Lavar - Tập 1" },
        { time: "10:45", name: "Sinh ra từ rừng" },
        { time: "11:15", name: "Vô gian đạo" },
        { time: "12:00", name: "Thời sự trưa" },
        { time: "12:40", name: "Phim truyện | Gia đình là số 1 - Tập cuối" },
        { time: "13:30", name: "Trái đất xanh" },
        { time: "14:10", name: "Sống mới" },
        {
          time: "15:10",
          name: "Doanh nghiệp - Doanh nhân | Doanh nghiệp gỗ phần 2",
        },
        { time: "16:00", name: "Thời sự 16h" },
        { time: "16:15", name: "Nhân đạo" },
        { time: "16:30", name: "Sự kiện và bình luận" },
        { time: "17:00", name: "Chuyển động 24h" },
        { time: "17:45", name: "Hoạt hình | Tom & Jery" },
        { time: "18:10", name: "Phim truyện | Vịnh Xuân Quyền - Tập mới" },
        { time: "19:00", name: "Thời sự" },
        { time: "19:45", name: "Thể thao 24/7" },
        { time: "20:00", name: "Ai là triệu phú" },
        { time: "21:00", name: "Phim truyện | Bỗng dưng muốn cười - Tập 69" },
        { time: "21:50", name: "Sống cũ" },
        { time: "22h00", name: "Thách bé ngủ ngon" },
        { time: "22h30", name: "Ẩm thực 3 miền" },
        { time: "23h00", name: "Món ngon mỗi ngày" },
        { time: "23h30", name: "Ngủ đi má" },
      ],
    };
  },
};
</script>

<style>
.broadcast-schedule {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
}
.bs-title {
  font-size: 38px;
  position: relative;
  top: 20px;
}
.bs-time {
  width: 642px;
  height: 64px;
  position: relative;
  left: 335px;
  top: 35px;
  font-size: 22px;
}
.bs-time .bs-time-character {
  display: flex;
  justify-content: center;
  font-size: 26px;
}
.bs-time .bs-time-character p {
  margin: 0 67px;
}
.bs-time .bs-time-name {
  display: flex;
  justify-content: center;
  position: relative;
  bottom: 29px;
}
.bs-time .bs-time-name p {
  margin: 0 27px;
}
.bs-content {
  width: 642px;
  position: relative;
  left: 335px;
  top: 40px;
  font-size: 20px;
}
.bs-content .bs-show-content .bs-content-item {
  width: 100%;
  height: 64px;
  display: flex;
}
.bs-content .bs-show-content .bs-content-item p {
  margin: 20px 0;
  position: absolute;
}
.bs-content .bs-show-content .bs-content-item .bs-content-item-time {
  left: 32px;
}
.bs-content .bs-show-content .bs-content-item .bs-content-item-name {
  left: 131px;
}
.bs-content .bs-show-content .bs-content-item .icon-play-back {
  width: 16px;
  height: 16px;
  margin: 23px 0;
  position: absolute;
  left: 100px;
}
</style>