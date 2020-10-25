<template>
	<div class="body">
		<img alt="Vue logo" src="./assets/logo.png">
		<HelloWorld msg="Welcome to Your Vue.js App"/>
	</div>
</template>

<script>
	import HelloWorld
		from './components/HelloWorld.vue';

	export default {
		name: 'layout',
		components: {
			HelloWorld
		},
		data()
		{
			return {};
		},

		methods: {},


	};
</script>
<style scoped>

	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		border: 0;
	}

</style>
