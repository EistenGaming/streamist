<template>
	<q-layout view="hHh Lpr fFf">
		<q-header elevated>
			<q-bar class="q-electron-drag">
				<img alt="App Logo" src="~assets/icon.png" style="width:24px"/>
				<div>{{ $appName }} v{{ $appVersion }}</div>
				<q-space/>
				<q-btn dense flat icon="minimize" @click="minimize"/>
				<q-btn dense flat icon="crop_square" @click="maximize"/>
				<q-btn dense flat icon="close" @click="closeApp"/>
			</q-bar>
			<q-toolbar class="primary">
				<q-btn
					flat
					dense
					round
					@click="leftDrawerOpen = !leftDrawerOpen"
					icon="menu"
					aria-label="Menu"
				/>

				<q-space/>
				<div v-if="shouldShowProgressSpinner">
					<q-circular-progress
						indeterminate
						size='30px'
						center-color="secondary"
						:thickness="0.6"
					/>
				</div>
				<q-chip
					:color="isTwitchConnected ? 'accent' : 'blue-grey-8'"
					:text-color="isTwitchConnected ? 'white' : 'white'"
					label='Twitch'
					:title="isTwitchConnected ? 'Twitch is connected' : 'Click here to connect Twitch'"
					square
					size='10px'
				/>
				<q-chip
					:color="isFacebookConnected ? 'accent' : 'blue-grey-8'"
					:text-color="isFacebookConnected ? 'white' : 'white'"
					label='Facebook Gaming'
					:title="isFacebookConnected ? 'Facebook is connected' : 'Click here to connect Facebook'"
					square
					size='10px'
				/>
				<q-chip
					:color="isYoutubeConnected ? 'accent' : 'blue-grey-8'"
					:text-color="isYoutubeConnected ? 'white' : 'white'"
					label='Youtube'
					:title="isYoutubeConnected ? 'Youtube is connected' : 'Click here to connect Youtube'"
					square
					size='10px'
				/>
			</q-toolbar>
		</q-header>
		<q-drawer
			v-model="leftDrawerOpen"
			mini
			show-if-above
			bordered
			content-class="bg-primary"
			:breakpoint="500"
			:width="250"
		>
			<q-list>
				<q-item to="/" exact clickable v-ripple>
					<q-item-section side>
						<q-avatar icon="home" size="48px"/>
						<q-tooltip content-class="bg-black text-blue-grey-3" anchor="center right" self="center left" :offset="[10, 10]">
							<div style="font-size:medium">Home</div>
						</q-tooltip>
					</q-item-section>
					<q-item-section>
						<q-item-label>Home</q-item-label>
					</q-item-section>
				</q-item>
				<q-item :to="{name:'analytics.index'}" exact clickable v-ripple>
					<q-item-section side>
						<q-avatar icon="insert_chart" size="48px"/>
						<q-tooltip content-class="bg-black text-blue-grey-3" anchor="center right" self="center left" :offset="[10, 10]">
							<div style="font-size:medium">Analytics Dashboard</div>
						</q-tooltip>
					</q-item-section>
				</q-item>
				<q-item :to="{name:'planning.content-topics.index'}" clickable v-ripple>
					<q-item-section side>
						<q-avatar icon="trending_up" size="48px"/>
						<q-tooltip content-class="bg-black text-blue-grey-3" anchor="center right" self="center left" :offset="[10, 10]">
							<div style="font-size:medium">Planning</div>
						</q-tooltip>
					</q-item-section>
				</q-item>
				<q-item :to="{name:'about'}" exact clickable v-ripple>
					<q-item-section side>
						<q-avatar icon="info_outline" size="48px"/>
						<q-tooltip content-class="bg-black text-blue-grey-3" anchor="center right" self="center left" :offset="[10, 10]">
							<div style="font-size:medium">About</div>
						</q-tooltip>
					</q-item-section>
				</q-item>
				<q-item :to="{name:'settings.accounts'}" clickable v-ripple>
					<q-item-section side>
						<q-avatar icon="settings" size="48px"/>
						<q-tooltip content-class="bg-black text-blue-grey-3" anchor="center right" self="center left" :offset="[10, 10]">
							<div style="font-size:medium">Settings</div>
						</q-tooltip>
					</q-item-section>
					<q-item-section>
						<q-item-label text-color="blue-grey-1">Settings</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-drawer>
		<q-page-container>
			<router-view/>
		</q-page-container>
	</q-layout>
</template>

<script>

export default {
	name: 'MainLayout',
	created () {
		this.$store.commit('accounts/initialize')
	},

	data () {
		return {
			leftDrawerOpen: false,
			progressValue: 0
		}
	},
	mounted () {
	},
	computed: {
		shouldShowProgressSpinner () {
			return this.$store.getters['ui/progressSpinner']
		},

		accounts () {
			return this.$store.getters['accounts/all']
		},

		isTwitchConnected () {
			return this.accounts && this.accounts.twitch !== null
		},

		isFacebookConnected () {
			return this.accounts && this.accounts.facebook !== null
		},

		isYoutubeConnected () {
			return this.accounts && this.accounts.youtube !== null
		}
	},
	methods: {
		minimize () {
			if (process.env.MODE === 'electron') {
				this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
			}
		},
		maximize () {
			if (process.env.MODE === 'electron') {
				const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()

				if (win.isMaximized()) {
					win.unmaximize()
				} else {
					win.maximize()
				}
			}
		},
		closeApp () {
			if (process.env.MODE === 'electron') {
				this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
			}
		}
	}
}
</script>
