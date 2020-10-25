<template>
	<div class="body">
		<div class="custom-container">
			<div class="info">
				کد ارسال شده به ایمیل خود را در زیر وارد کنید
			</div>
			<div class="items">
				<input type="text" class="item rtl" name="code" placeholder="کد ارسال شده به ایمیل شما" v-model="form.code">

				<button  class="btn " @click="register" v-if="isSubmitted === false">ثبت نام</button>
				<button-spinner v-if="isSubmitted === true"
						class="btn"
						:isLoading="isSubmitted && !isSent"
						:disabled="isSent"
						:status="status">
					<span>.. در حال ارسال</span>
				</button-spinner>
			</div>


		</div>
	</div>
</template>

<script>
	import ButtonSpinner
		from 'vue-button-spinner';

	import server from '../server'

	export default {
		components: {
			'button-spinner': ButtonSpinner
		},

		data()
		{
			return {
				form: {
					code: '',
					// email: this.$store.state.email
					email: localStorage.getItem('email')
				},
				token: '',
				errors: {},
				info: '',
				arman1: '',
				isSubmitted: false,
				isSent: false,
				isValid: null,
				status: ''
			};
		},
		methods: {


			register()
			{
				const vm = this;
				vm.isSubmitted = true;
				server.post('/confirmRegister', this.form)
					.then(res =>
						{
							if (res.data.status === 'OK')
							{
								localStorage.setItem('token', res.body.token);
								localStorage.removeItem('email');
								vm.$root.user = res.body.user;
								// vm.$store.state.token = res.body.token;
								// res.body.token = setToken;


								vm.$toasted.show('عملیات ثبت نام موفقیت آمیز بود', {
									position: 'bottom-right',
									type: 'success',
									closeOnSwipe: true,
									duration: 1000,
									onComplete: function()
									{
										vm.$router.push({
											name: '',
										});
									}
								});
							}

						}, err =>
						{
							if (err.data.errors.code)
							{
								vm.$toasted.show(err.data.errors.code[0], {
									position: 'bottom-right',
									type: 'error',
									closeOnSwipe: true,
									duration: 5200,
								});
							}
						}

					);
				vm.isSubmitted = false;
			}
		}

	};
</script>

<style scoped lang="scss">

	.body
	{

		padding-top: 80px;
		padding-bottom: 60px;
	}

	.custom-container
	{
		width: 600px;
		margin: auto;
		padding: 20px;


		.info
		{
			background-color: #EEEEEE;
			text-align: right;
			padding: 10px;
		}

	}
	.items
	{
		display: flex;
		flex-direction: column;
		width: 80%;
		margin: auto;
		padding: 30px 0 30px 0;

		.item
		{
			margin: 5px;
			padding: 15px 10px;
			border-radius: 7px;
			border: none;
			z-index: 1000;

			&:hover
			{
				color: #FFFFFF;
				background-color: rgba(182, 91, 91, 0.77);
				box-shadow: 0 1px 6px rgb(251, 255, 231);
			}

			&::placeholder
			{
				text-align: right;
			}
		}

		.btn
		{
			margin-top: 20px;
			width: 150px;
			padding: 5px 10px;
			background-color: rgba(239, 181, 120, 1);
			color: #000000;
			border-radius: 10px 0 10px 0;
			border: 3px solid #FF6154;

			&:hover
			{
				background-color: #FF6154;
				color: #FFFFFF;
			}
		}
	}

</style>
