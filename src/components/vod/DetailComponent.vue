<template>
	<div class="container-fluid">
        <div class="vod-detail-frames">
            <div class="vod-detail-left">
                <div class="vod-detail-poster">
                    <!-- <img :src="infoDetails[0].details.image" :alt="infoDetails[0].details.title"> -->
                </div>
                <button type="button" class="btn btn-warning btn-lg btn3d"><span class="glyphicon glyphicon-warning-sign"></span> Warning</button>
            </div>
            <div class="vod-detail-right">
                <div class="vod-detail-content">
                    <div class="vod-tv-description">
                        <!-- <p>{{infoDetails[0].details.lead}}</p> -->
                    </div>
                    <!-- <table class="table table-striped table-dark">
                        <tbody>
                            <tr>
                                <td>Đạo diễn</td>
                                <td colspan="3">{{infoDetails[0].details.directors}}</td>
                            </tr>
                            <tr>
                                <td>Diễn viên</td>
                                <td colspan="3">{{infoDetails[0].details.actors}}</td>
                            </tr>
                            <tr>
                                <td>Quốc gia</td>
                                <td colspan="3">{{infoDetails[0].details.countries}}</td>
                            </tr>
                            <tr>
                                <td>Thời lượng</td>
                                <td>{{infoDetails[0].details.runningtime}}</td>
                                <td>Âm thanh</td>
                            	<td>{{infoDetails[0].details.dub}}</td>
                            </tr>
                            <tr>
                                <td>Năm sản xuất</td>
                                <td>{{infoDetails[0].details.release}}</td>
                                <td>Phụ đề</td>
                            	<td>{{infoDetails[0].details.sub}}</td>
                            </tr>
                        </tbody>
                    </table> -->
                    <!-- <div class="vod-list bg-gray"> -->
                        <slick 
                            ref="slick" 
                            :options="slickOptions">
                            <div 
                            	class="vod-list-item"
                                :class="classActive(index)"
                            	v-for="(item, index) in relateFilms"
                            	:key="index"
                            >
                                <div class="vod-list-item-thumbnail">
                                    <img :src="item.image" :alt="item.title">
                                </div>
                                <div class="vod-list-item-title">
                                    <h4>{{item.title}}</h4>
                                </div>
                            </div>
                        </slick>
                    <!-- </div> -->
            	</div>
        	</div>
        </div>
    </div>
</template>

<script>
	import axios from 'axios';
    import Slick from 'vue-slick';

	export default{
		name: 'DetailComponent',
        components: {
            'slick': Slick,
        },
		props:{
		},
		data(){
			return{
                activeIndex: 0,
				infoDetails: [],
                relateFilms: [],
                slickOptions: {
                    infinite: true,
                    slidesToShow: 7,
                    slidesToScroll: 1,
                    autoplaySpeed: 5e3
                },
			};
		},
		created(){
			let self = this;
			axios.get('https://api-smarttv.fbox.fpt.vn/smarttv/vod/getitemdetail/v1/B8FFB303FFE8/SGDN00017/1103728/90/1103728/vi/100071977/1/0/21/11?&st=hqWajCcuqSfaTOiCL0qBnw&expires=91957457191&pf=11')
			.then(function(response){
				let rootData = response.data.root;
				self.infoDetails = rootData.item;
				console.log('Data: ', rootData.item);
			})
			.catch(function(error){
				console.log('Error: ', error);
			});

			axios.get('https://api-smarttv.fbox.fpt.vn/smarttv/general/related/v1/B8FFB303FFE8/SGDN00017/1103728/90/1103728/vi/100071977/0/0/21/0/0/11?&st=hqWajCcuqSfaTOiCL0qBnw&expires=91957457191&pf=11')
			.then(function(response){
				let rootData = response.data.root;
				self.relateFilms = rootData.item;
                self.$refs.slick.reSlick ();
				console.log('Data: ', rootData.item);
			})
			.catch(function(error){
				console.log('Error: ', error);
			});

            this.slickOptions;
		},
        computed: {
            
        },
        methods: {
            classActive(index){
                return {
                    active: this.activeIndex === index
                }
            },

            prev: function(){
                this.$refs.slick.prev();
            },

            next(){
                this.$refs.slick.next();
            },
            updated() {
                this.reInit();
            },
            reInit () {
                // Helpful if you have to deal with v-for to update dynamic lists
                this.$nextTick(() => {
                    this.$refs.slick.reSlick();
                });
            },
        },
        mounted() {
            let self = this;
            window.addEventListener('keyup', function(event) {
                switch (event.keyCode) {
                    case 37: //Left
                       
                        break;
                    case 38: //Up
                        console.log('Up !');
                        break;
                    case 39: //Right
                        //nextActive();
                        break;
                    case 40: //Down
                        console.log('Down !');
                        break;
                    case 8:
                        console.log('Back !');
                        break;
                    case 13:
                        console.log('Enter !');
                        break;
                }
            });
        },
	}
	
</script>