import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import Toasted from 'vue-toasted';
import server from './server';


Vue.config.productionTip = false;

Vue.use(Toasted);

server.get('user').then(res =>
{
	let user = res.data.user;

	new Vue({
		data: {
			publicURL: server.publicURL,
			user: user,
		},
		router,
		render: h => h(App),
	}).$mount('#app');
});