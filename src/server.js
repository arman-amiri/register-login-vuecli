import axios from 'axios';
import router from './router';


// let serverURL = 'http://localhost/laravel-api-register-login/public/';
let serverURL = 'http://delara.qlake.ir/public/';

const instance = axios.create({

	baseURL: serverURL + 'api/v1/front/',
	// baseURL: serverURL ,

	// baseURL: 'http://qlake.ir/kanoon-back/public/api/',
	// baseURL: 'http://kokerpanel.ir/back/public/api/',
	//timeout: 1000,
	//headers: {'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'}

});


instance.interceptors.request.use(function(config)
{
	// Do something before request is sent
	//np.start();
	config.headers = {
		"X-Requested-With": "XMLHttpRequest",
		'Authorization': 'Bearer ' + localStorage.getItem('token'),
		'sss': 'sss',

	};
	//config.crossdomain= true

	window.app.errors = {};

	return config;
}, function(error)
{
	// Do something with request error
	return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function(response)
{
	// Do something with response data
	//np.done();
	return response;
}, function(error)
{
	// Do something with response error
	if (error.response.status === 401)
	{
		//console.log(window.app)
		localStorage.removeItem('token');
		router.push({path: '/Login'});
	}

	// if (error.response.status === 422)
	// {
	// 	window.app.errors = error.response.data.errors;
	// }

	//np.done();
	return Promise.reject(error);
});

instance.publicURL = serverURL;

export default instance;