<template>
	<div class="items">
		<input type="text" class="item rtl" name="name" placeholder="نام" v-model="form.name">
		<input type="text" class="item rtl" name="family" placeholder="نام خانوادگی" v-model="form.family">
		<input type="text" class="item ltr" name="email" placeholder="ایمیل" v-model="form.email">
		<input type="text" class="item ltr" name="password" placeholder="گذرواژه" v-model="form.password">
		<input type="text" class="item ltr" name="passwordConfirm" placeholder="تکرار گذرواژه" v-model="form.passwordConfirm">
		<button  class="btn " @click="register" v-if="isSubmitted === false">ثبت نام</button>

		<button-spinner v-if="isSubmitted === true"
				class="btn"
				:isLoading="isSubmitted && !isSent"
				:disabled="isSent"
				:status="status">
			<span>.. در حال ارسال</span>
		</button-spinner>
	</div>
</template>

<script>
	import server from '../server'

	import ButtonSpinner
		from 'vue-button-spinner';

	export default {
		name: 'Register',
		props: {
			msg: String
		},
		components: {
			'button-spinner': ButtonSpinner
		},
		data()
		{
			return {
				form:{
				name: "",
				family: "",
				email: "",
				password: "",
				passwordConfirm: "",
			},
				errors: {},
				info: '',
				arman1: '',
				isSubmitted: false,
				isSent: false,
				isValid: null,
				status: ''
			};
		},
		methods:{
			register()
			{
				const vm = this;
				server.post('register', vm.form, {headers: {'Content-Type': 'multipart/form-data'}})

					.then(res =>
						{
							vm.isSent = true;
							vm.status = 'success';
							if (res.data.status === 'OK')
							{
								// vm.$store.state.email = vm.form.email;
								localStorage.setItem('email', vm.form.email);

								vm.$toasted.show('اطلاعات با موفقیت ثبت شد', {
									// fullWidth: true,
									position: 'bottom-right',
									type: 'success',
									// theme: 'bubble',
									closeOnSwipe: true,
									duration: 2000,
									onComplete: function()
									{
										vm.$router.push({
											name: 'confirmRegister',
											// params: {email: vm.email}
										});
									}
								});
							}
						}
					)
					.catch(err =>
					{

						if (err.response.data.errors.email)
						{
							vm.$toasted.show(err.response.data.errors.email[0], {
								position: 'bottom-right',
								type: 'error',
								closeOnSwipe: true,
								duration: 5000,
							});
						}
						if (err.response.data.errors.password)
						{
							vm.$toasted.show(err.response.data.errors.password[0], {
								position: 'bottom-right',
								type: 'error',
								closeOnSwipe: true,
								duration: 5200,
							});
						}
						vm.errors      = err.response.data.errors;
						vm.isSubmitted = false;
						vm.isSent      = false;
						// vm.status = 'error';

					});
				vm.isSubmitted = true;

			},
		}
	};
</script>


<style scoped lang="scss">
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

	.ltr
	{
		text-align: left;
	}

	.rtl
	{
		text-align: right;
	}
</style>
