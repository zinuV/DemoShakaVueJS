import Vue from 'Vue';
import App from './App';
import VueRouter  from 'vue-router';
import routes from './router';
import '../node_modules/slick-carousel/slick/slick.css';
// import shaka from 'shaka-player'

Vue.use(VueRouter);

const router = new VueRouter(
	{
		mode: 'history',
		routes: routes
	}
);

new Vue({
	el: '#app',
	router,
  	render: h => h(App)
});
