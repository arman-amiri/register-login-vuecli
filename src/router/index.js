import Vue from 'vue';
import VueRouter from 'vue-router';

import layout from '../layout';


Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: '',
		component: layout
	}
];


const router = new VueRouter({
	mode: 'history',
	// base: process.env.BASE_URL,
	routes
});

export default router;
