<template>
	<div class="body">
		<div class="header">
			<div class="nav">
				<router-link to="/register">ثبت نام</router-link>
				<router-link to="/login">ورود</router-link>
				<router-link to="/exit">خروج</router-link>
			</div>
			<div class="logo"></div>
		</div>
		<div class="container">
			<router-view :key="$route.path"/>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'layout',
		data()
		{
			return {};
		},

		methods: {},


	};
</script>
<style scoped lang="scss">

	*
	{
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		border: 0;
	}

	.header
	{
		display: flex;
		justify-content: space-around;
		flex-direction: row-reverse;
		align-items: center;
		z-index: 1000;

		.nav
		{
			a
			{
				font-size: 1.3rem;
				color: #142C4A;
				margin: auto 15px;
				text-decoration: none;
			}
			.active{
				border: 3px solid #FF6154;
			}
		}

		.logo
		{

			width: 184px;
			height: 119px;
			background-image: url("../public/logo.png");
			background-position: -10px -42px;
			background-repeat: no-repeat;
		}
	}

	.container
	{
		max-width: 800px;
		margin: auto;
		margin-top: 50px;
		background-color: #e9967a29;
		z-index: 1000;
		border-radius: 20px 0 20px 0;
	}

</style>
