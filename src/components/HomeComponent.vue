<template>
	<div class="bg-gradient">
		<div class="section-body">
			<sidebar-component></sidebar-component>

			<div class="section-content">
				<!-- Start Header Area -->
				<div class="section-header">
					<div class="header-title">
						<h1 class="meta-title"></h1>
					</div>
					<nav class="meta-info">
						<ul>
							<li>Hành động</li>
							<li>Mỹ</li>
							<li>2019</li>
							<li>16+</li>
						</ul>
					</nav>
					<nav class="view-row">
						<ul>
							<li class="view-now">Xem ngay</li>
							<li class="view-detail">Xem chi tiết</li>
						</ul>
					</nav>
				</div>
				<!-- End Header Area -->

				<div class="section-categories">
					<!-- Start Category Area -->
					<div class="categories-row">
						<!-- Start Category Title Area -->
						<div class="categories-title">
							<h2 class="meta-title"></h2>
						</div>
						<!-- End Category Title Area -->

						<!-- Start Category Row Area -->
						<div class="categories-item">
							<div class="single-item">
							</div>
						</div>
						<!-- End Category Row Area -->
					</div>
					<!-- End Category Area -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ApiService from '../services/config';
	import SidebarComponent from './commons/SidebarComponent';
	
   	export default {
   		name: 'HomeComponent',
   		props:{
   			//item: Object
   		},
   		components: {
            SidebarComponent
        },
   		data() {
		    return {
		    	// activeIndex: 0,
		     //  	listFeaturedApplications: [],
		     //  	listOrtherApplications: [],
		     //  	listFilm: [],
		    };
	  	},
	  	created(){
	  		// let self = this;
	  		// axios.get('https://api-smarttv.fbox.fpt.vn/smarttv/general/recommendmenu/v1/B8FFB303FFE8/SGDN00017/1103728/90/1103728/vi/None/0/0/11?st=hqWajCcuqSfaTOiCL0qBnw&expires=91957457191&pf=1')
	  		// .then(function(response){
	  		// 	let rootData = response.data.root;
	  		// 	self.listFilm = rootData.item;
	  		// 	console.log('Data: ', rootData.item);
	  		// })
	  		// .catch(function(error){
	  		// 	console.log('Error: ', error);
	  		// });

	  		// axios.get('https://api-smarttv.fbox.fpt.vn/smarttv/customers/login/v1/B8FFB303FFE8/0/0/0/0/vi?st=hqWajCcuqSfaTOiCL0qBnw&expires=91957457191&pf=1')
	  		// .then(function(response){
	  		// 	let rootData = response.data.root.listmenuhome;
	  		// 	self.listFeaturedApplications = rootData[0].listapp;
	  		// 	self.listOrtherApplications = rootData[1].listapp;
	  		// 	console.log('Data: ', rootData[0].listapp);
	  		// })
	  		// .catch(function(error){
	  		// 	console.log('Error: ', error);
	  		// });

	  		ApiService.get('vod/getitemlist/v1/B8FFB303FFE8/SGDN00017/1103728/90/1103728/vi/1/1/0/0/1/0/70/11?&st=hqWajCcuqSfaTOiCL0qBnw&expires=91957457191&pf=11')
	  		.then(function(response){
  				console.log(response);
	  		})
	  		.catch(function(error){
	  			console.log('Error: ', error);
	  		});
	  	},
	  	methods: {
	  	// 	classActive(index){
  		// 		return {
  		// 			active: this.activeIndex === index
  		// 		}
  		// 	},
  		// 	prevActive: function(){
  		// 		let currentIndex = 0;
  		// 		if(this.activeIndex > 0){
  		// 			this.activeIndex--;
  		// 			console.log('<==', currentIndex);
  		// 		}
  		// 		else{
  		// 			this.activeIndex = 0;
  		// 		}
  		// 	},
  		// 	nextActive(){
				// let maxIndex = this.listFeaturedApplications.length - 1;
				// let currentIndex = 0;
				// let menuId = this.listFeaturedApplications[this.activeIndex].menuid;
				// if(this.activeIndex < maxIndex){
				// 	this.activeIndex++;
				// 	currentIndex = this.activeIndex;
				// 	console.log('==>', currentIndex, maxIndex, menuId);
				// }
  		// 	},
  		// 	handleLive(){
  		// 		let appId = this.listFilm.find(item => item['appid']);
  		// 		if(appId === 13){
  		// 			return appId;
  		// 		}
  		// 	},
  		// 	handleMoreChange(){
  		// 		let menuId = this.listFeaturedApplications[this.activeIndex].menuid;
  		// 		let appId = this.listFilm.find(item => item['appid']);
  		// 		if(appId === menuId){
  		// 			return appId;
  		// 		}
  		// 	}
	  	},
  	 	mounted() {
  	 		// let self = this;
		    // window.addEventListener('keyup', function(event) {
		    // 	switch (event.keyCode) {
		    // 		case 37: //Left
		    // 			self.prevActive();
		    // 			self.handleLive();
		    // 			self.handleMoreChange();
		    // 			break;
	    	// 		case 38: //Up
		    // 			console.log('Up !');
		    // 			break;
		    // 		case 39: //Right
		    // 			self.nextActive();
		    // 			self.handleLive();
		    // 			self.handleMoreChange();
		    // 			break;
	    	// 		case 40: //Down
		    // 			console.log('Down !');
		    // 			break;
		    // 		case 8:
		    // 			console.log('Back !');
		    // 			break;
		    // 		case 13:
		    // 			console.log('Enter !');
		    // 			break;
		    // 	}
		    // });
  		},
  		computed: {
  			// getFilm(){
  			// 	let index = this.activeIndex;
  			// 	return this.listFeaturedApplications[index];
  			// },
  			// currentListFilm(){
  			// 	let menuId = this.listFeaturedApplications.find(item => item['menuid']);
  			// 	let appId = this.listFilm.find(item => item['appid']);
  			// }
  		}
   	};
</script>