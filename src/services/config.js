import axios from 'axios';

const defaultDomain = 'https://api-smarttv.fbox.fpt.vn',
	  defaultDevice = 'smarttv',
	  defaultVersion = 'v1',
	  defaultMac = 'B8FFB303FFE8',
	  defaultContract = 'SGH068460',
	  defaultCustomerid = '918964',
	  defaultCustomertype = 1,
	  defaultUserid = defaultCustomerid, 
	  defaultLanguage = 'vi';

const defaultParameter = defaultVersion + '/' + 
						 defaultMac + '/' + 
						 defaultContract + '/' + 
						 defaultCustomerid + '/' + 
						 defaultCustomertype + '/' + 
						 defaultUserid + '/' +
						 defaultLanguage;


// const baseURL = defaultDomain + '/' + defaultDevice + '/vod/getitemlist/' + defaultVersion + '/' + defaultMac + '/' + defaultContract + '/' + defaultCustomerid + '/90/' + defaultUserid + '/' + defaultLanguage + '/1/1/0/0/1/0/70/11?&st=hqWajCcuqSfaTOiCL0qBnw&expires=91957457191&pf=11';
// console.log(baseURL);



// const defaultComponent = 'vod';
// const defaultAttribute = 'getitemdetail';

const ApiService = axios.create({
	baseURL: defaultDomain + '/' + defaultDevice,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		//'Authorization': 'Bearer ' + tokenKey
	},
	timeout: 1000 //request timeout
})

// axios.defaults.headers.common['Authorization'] = 'some token';
// axios.defaults.headers.get['Accept'] = 'application/json';

// const Api = axios.create({
// 	baseURI: process.env.VUE_APP_BASE_URL,
// 	withCredentials: false,
// 	headers: {
// 		'Content-Type': 'application/json',
// 		'Accept': 'application/json',
// 		//'Authorization': 'Bearer ' + tokenKey
// 	},
// 	timeout: 5000 //request timeout
// })

// interceptor.setup(Api)
// interceptor.checkToken(Api)

export default ApiService

// export default{
// 	async getItemDetail() {
// 		let res = axios.get(foxyBaseDomain + '/' + foxyDevice + '/' + foxyComponent + '/' + foxyAttribute + '/' + version + '/' + mac + '/' + contract + '/' + customerid + '/' + customertype + '/' + userid + '/' + language + '/' + '100071977/1/0/21/11?&st=hqWajCcuqSfaTOiCL0qBnw&expires=91957457191&pf=11');
// 		return res.data.root;
// 	}
// }

// function setup(instance){
// 	instance.interceptor.request.use(
// 		function(config){
// 			const token = getToken();
// 			if(token){
// 				config.headers.Authorization = 'Bearer ${token}';
// 			}
// 			return config;
// 		},
// 		function(err){
// 			return Promise.reject(err);
// 		}
// 	)
// }

// function checkToken(instance){
// 	instance.interceptor.response.use(
// 		response => {
// 			if(response.headers['Content-Type'].startsWith('application/json')){
// 				response.data = camelcaseKeys(response.data, {deep: true})
// 			}
// 			return response;
// 		},
// 		error => {
// 			if(error.response.status === 401 && !window.location.pathname.includes('login')){
// 				store.dispatch('auth/clear')
// 				window.location.href = window.location.origin + '/login'
// 			}
// 			return Promise.reject(error)
// 		}
// 	)
// }

// export default{
// 	setup,
// 	checkToken
// }