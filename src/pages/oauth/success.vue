<template>
	<div></div>
</template>

<script>
export default {
	name: 'OAuthSuccess',

	created () {
		this.getTwitchToken()
	},
	data () {
		return {}
	},
	methods: {
		getTwitchToken () {
			let token = this.$route.hash
			token = token.substring(1).split('&')[0].split('=')[1]

			const payload = {
				type: 'twitch',
				value: {
					token
				}
			}

			this.$store.dispatch('accounts/set', payload)
			console.log({ token })
		}
	}
}
</script>

<style scoped>

</style>
