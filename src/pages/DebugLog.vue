<template>
	<q-page class="flex flex-start bg-secondary">
		<div style="width:100%" class="q-pa-sm" :style="{ color: localTextColor1 }">
			The log goes here :)
		</div>
	</q-page>
</template>

<script>
export default {
	name: 'Debug',
	data () {
		return {
			// Vars go here
			selectedTab: 'log',
			localTextColor1: '',
			localTextColor2: '',
			uiEnableDarkMode: false
		}
	},
	mounted () { // This allows you to do stuff 'on page load'
		this.uiEnableDarkMode = this.$q.localStorage.getItem('uiEnableDarkMode')
		if (this.uiEnableDarkMode) {
			this.localTextColor1 = this.$darkTextColor1
			this.localTextColor2 = this.$darkTextColor2
		} else {
			this.localTextColor1 = this.$lightTextColor1
			this.localTextColor2 = this.$lightTextColor2
		}
	},
	watch: {
		uiEnableDarkMode: function () {
			if (this.uiEnableDarkMode) {
				this.localTextColor1 = this.$darkTextColor1
				this.localTextColor2 = this.$darkTextColor2
			} else {
				this.localTextColor1 = this.$lightTextColor1
				this.localTextColor2 = this.$lightTextColor2
			}
		}
	},
	methods: {
		// Methods go here
	}
}
</script>
<style lang="scss">
</style>
