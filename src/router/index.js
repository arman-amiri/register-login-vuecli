import Vue from 'vue';
import VueRouter from 'vue-router';

import layout from '../layout';
import Login from '../components/Login';
import Register from '../components/Register';
import Exit from '../components/Exit';
import ConfimPassword from '../components/ConfimPassword';


Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: '',
		component: layout,
		children: [

			{
				path: 'register',
				name: 'register',
				component: Register,
			},
			{
				path: 'login',
				name: 'login',
				component: Login,
			},
			{
				path: 'exit',
				name: 'exit',
				component: Exit,
			},
			{
				path: 'confirmRegister',
				name: 'confirmRegister',
				component: ConfimPassword,
			},
		]
	}
];


const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL || "/",
	routes
});

export default router;
