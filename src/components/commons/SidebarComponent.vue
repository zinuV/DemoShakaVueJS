<template>
	<!-- Start Sidebar Area -->
	<nav class="sidebar-area">
		<ul>
			<li class="nav-item" v-for="(item, index) in listMenu">
				<span class="nav-thumb" :class="item.class_name"></span>
				<span>{{item.title}}</span>
			</li>
		</ul>
	</nav>
	<!-- End Sidebar Area -->
</template>

<script>
	import json from '../../services/data_json.json';

	export default{
		data(){
			return{
				listMenu: json
			}
		}
	}
</script>