<template>
	<div class="q-pa-md bg-shade">
		<div class="q-pa-md text-h5 q-mb-md">ACCOUNTS</div>
		<div class="row q-col-gutter-lg">
			<div class="col-12 col-sm-4">
				<div class="flex column justify-between items-center" style="min-height:300px;">
					<div class="width-50 mx-auto col-grow flex justify-center items-center">
						<img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Twitch_logo.svg" style="width:250px;">
					</div>
					<div class="text-center">
						<q-btn
							type="a"
							color="accent"
							icon="fab fa-twitch"
							:href="twitchLoginLink"
							v-if="!accounts.twitch"
						>Login with Twitch</q-btn>

						<q-btn
							@click="logout('twitch')"
							color="primary"
							v-else
						>Logout</q-btn>
					</div>
				</div>
			</div>

			<div class="col-12 col-sm-4">
				<div class="flex column justify-between items-center full-height" style="min-height:300px;">
					<div class="width-50 mx-auto col-grow flex justify-center items-center">
						<img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" style="width:250px;">
					</div>
					<div class="text-center">
						<q-btn
							color="red-14"
							icon="fab fa-youtube"
							v-if="!accounts.youtube"
						>Login with youtube</q-btn>
						<q-badge
							class="q-px-md q-py-xs"
							color="positive"
							v-else
						>Logged in</q-badge>
					</div>
				</div>
			</div>

			<div class="col-12 col-sm-4">
				<div class="flex column justify-between items-center full-height" style="min-height:300px;">
					<div class="width-50 mx-auto col-grow flex justify-center items-center">
						<img src="https://logodownload.org/wp-content/uploads/2019/07/facebook-gaming.png" style="width:100px;">
					</div>
					<div class="text-center">
						<q-btn
							color="blue-8"
							icon="fab fa-facebook-f"
							v-if="!accounts.facebook"
						>Login with Facebook</q-btn>
						<q-badge
							class="q-px-md q-py-xs"
							color="positive"
							v-else
						>Logged in</q-badge>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Accounts',

	mounted () {
	},

	data () {
		return {
			pwHider: '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'
		}
	},
	computed: {
		accounts () {
			return this.$store.getters['accounts/all']
		},
		twitchLoginLink () {
			return new URL('https://id.twitch.tv/oauth2/authorize?client_id=6711fdxwftf762teq2xgn891ah22lp&redirect_uri=http://localhost:8080/oauth/success&response_type=token').href
		}
	},
	methods: {
		logout (service) {
			this.$store.dispatch('accounts/logout', { service })
				.then(() => {
					this.$toasted.success('Logged out successfully')
				})
		}
	}
}
</script>

<style lang="scss">
.q-btn .q-icon {
	margin-right: 8px;
}
</style>
