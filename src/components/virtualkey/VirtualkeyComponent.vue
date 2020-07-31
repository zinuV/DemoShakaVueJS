<template>
	<p>Hello</p>
</template>

<script>
	import axios from 'axios';

	export default{
		name: 'VirtualkeyComponent',
		props: {

		},
		data(){
			return{
				defaultID: 9991,
				listVirtuakey: []
			}
		},
		created(){
			let self = this;
			axios.get('https://api-smarttv.fbox.fpt.vn/smarttv/general/virtualkey/v1/B8FFB303FFE8/0/0/0/0/vi/1001?st=hqWajCcuqSfaTOiCL0qBnw&expires=91957457191&pf=1')
			.then(function(response){
				let rootData = response.data.root;
				self.listVirtuakey = rootData;
				console.log('Data: ', rootData.virtualkeyitem.listvirtualkey);
			})
			.catch(function(error){
				console.log('Error: ', error);
			});
		},
		computed:{

		}
	}
</script>