<template>
	<q-page class="flex flex-start bg-secondary">
		<div style="width:100%">
			<q-splitter
				:value="160"
				disable
				unit="px"
			>
				<template v-slot:before>
					<q-tabs
						v-model="selectedTab"
						vertical
						dense
						inline-label
					>
						<div class="q-pa-sm">
							<q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-uppercase" :style="{ color: localTextColor1 }">DEV TOOLS</q-item-label>
						</div>
						<q-route-tab
							name="log"
							icon="library_books"
							label="Log"
							style="justify-content:initial"
							:style="{ color: localTextColor2 }"
							to="/devtools/DebugLog"
							exact
						/>
					</q-tabs>
				</template>
				<template v-slot:after>
					<router-view/>
				</template>
			</q-splitter>
		</div>
	</q-page>
</template>

<script>
export default {
	name: 'DevTools',
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
