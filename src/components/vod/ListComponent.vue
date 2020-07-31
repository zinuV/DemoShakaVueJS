<template>
	<div class="clearfix">
		<div class="sidebar-wrapper">
			<ul class="sidebar-left">
				<li 
					class="sidebar-item" 
					:class="classActive(index)"
					v-for="(item, index) in listTopics" 
					:key="index">
					<p>{{item.title}}</p>
				</li>
			</ul>
		</div>
		<div class="list-wrapper">
			<div class="vod-list bg-gray">
                <div 
                	class="vod-list-item"
                	:class="classActive(index)"
                	v-for="(item, index) in itemFilms"
                	:key="index"
                >
                    <div class="vod-list-item-thumbnail">
                        <img :src="item.image" :alt="item.title">
                    </div>
                    <div class="vod-list-item-title">
                        <h4>{{item.title}}</h4>
                    </div>
                </div>
            </div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';

	export default{
		name: 'ListComponent',
		data(){
			return{
				activeItem: 0,
				listTopics: [],
				itemFilms: []
			}
		},
		created(){
			let self = this;
			axios.get('https://api-smarttv.fbox.fpt.vn/smarttv/vod/getmenu/v1/B8FFB303FFE8/SGDN00017/1103728/90/1103728/vi/1/0/0/1?&st=hqWajCcuqSfaTOiCL0qBnw&expires=91957457191&pf=1')
			.then(function(response){
				let rootData = response.data;
				self.listTopics = rootData.root.item;
				console.log('Data: ', self.listTopics);
			})
			.catch(function(error){
				console.log('Data: ', error);
			});

			axios.get('https://api-smarttv.fbox.fpt.vn/smarttv/vod/getitemlist/v1/B8FFB303FFE8/SGDN00017/1103728/90/1103728/vi/1/1/0/0/1/0/70/11?&st=hqWajCcuqSfaTOiCL0qBnw&expires=91957457191&pf=11')
			.then(function(response){
				let rootData = response.data;
				self.itemFilms = rootData.root.item;
				console.log('Data: ', self.itemFilms);
			})
			.catch(function(error){
				console.log('Data: ', error);
			});
		},
		methods:{
			classActive(index){
				return{
					active: this.activeItem === index
				}
			}
		},
		mounted(){
			let self = this;
			window.addEventListener('keyup', function(event){
				switch (event.keyCode) {
					case 38: //Up
		    			break;
					case 40: //Down
						break;
					default:
						break;
				}
			});
		}
	}
	
</script>