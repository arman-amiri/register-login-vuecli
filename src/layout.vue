<template>
	<div class="body">
		<div class="header">
			<div class="nav">
				<router-link to="/register" v-if="$root.user === null">ثبت نام</router-link>
				<router-link to="/login" v-if="$root.user === null">ورود</router-link>
				<router-link to="/exit" v-if="$root.user">
					<span @click="exit">خروج</span>
				</router-link>
			</div>
			<div v-if="$root.user !== null">
				{{$root.user.name ? $root.user.name : 'کاربر گرامی'}}
				خوش آمدی
			</div>
			<router-link to="/">
			<div class="logo"></div>
			</router-link>
		</div>
		<div class="container">
			<router-view :key="$route.path"/>

		</div>
	</div>
</template>

<script>
	import server
		from './server';


	export default {
		name: 'layout',
		data()
		{
			return {};
		},

		methods: {
			exit()
			{
				let vm = this;
				server.get('exit')
					.then(res =>
					{
						vm.$root.user = null;
						localStorage.removeItem('token');
						if (res)
						{
							vm.$router.push({
								path: '/register',
							});
						}

					})
					.catch(err =>
					{
						if (err)
						{
							alert('خطایی رخ  داده است');
						}
					});
			}
		},


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

			.active
			{
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
		background-color: #E9967A29;
		z-index: 1000!important;
		border-radius: 20px 0 20px 0;
	}

</style>
