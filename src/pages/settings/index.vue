<template>
	<q-page class="flex flex-start full-height site-bg">
		<div class="full-width full-height">
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
							<q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-uppercase">User Settings</q-item-label>
						</div>
						<q-route-tab :to="{name:'settings.accounts'}" icon="account_box" label="Accounts" style="justify-content:initial"/>

						<div class="q-pa-sm">
							<q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-uppercase">App Settings</q-item-label>
						</div>
						<q-route-tab :to="{name:'settings.appearance'}" icon="palette" label="Appearance" style="justify-content:initial"/>
						<q-route-tab :to="{name:'settings.notifications'}" icon="notifications" label="Notifications" style="justify-content:initial"/>
						<q-route-tab :to="{name:'settings.connectivity'}" icon="cast_connected" label="Connectivity" style="justify-content:initial"/>
					</q-tabs>
				</template>
				<template v-slot:after>
					<router-view></router-view>
				</template>
			</q-splitter>
		</div>
	</q-page>
</template>

<script>
// var util = require('src/utils/utility')
export default {
	name: 'Settings',
	data () {
		return {
			selectedTab: 'accounts',
			accountTypeOptions: ['Twitch', 'Facebook', 'Youtube'],
			accountTypeSelected: 'Twitch',
			accountName: '',
			accountClientID: '',
			accountClientSecret: '',
			accounts: [],
			newAccount: null,
			selectedAccountType: '',
			selectedAccount: null,
			isClientSecretVisible: true,
			addAccountState: false,
			loginAtStartup: false,
			uiEnableDeveloperMode: false,
			uiEnableChatMessageBadge: false,
			uiEnableLogEntryBadge: false,
			pwHider: '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'
		}
	},
	mounted () { // This allows you to do stuff 'on page load'
		// Read the locally stored values
		// this.$q.localStorage.remove('accounts')

		this.uiEnableDeveloperMode = this.$q.localStorage.getItem('uiEnableDeveloperMode')
		this.uiEnableLogEntryBadge = this.$q.localStorage.getItem('uiEnableLogEntryBadge')
	},
	watch: {
		loginAtStartup: function () {
			this.$q.localStorage.set('loginAtStartup', this.loginAtStartup)
		},
		nxProxySelected: function () {
			this.$q.localStorage.set('nxProxySelected', this.nxProxySelected)
		},
		uiEnableDeveloperMode: function () {
			this.$q.localStorage.set('uiEnableDeveloperMode', this.uiEnableDeveloperMode)
			if (this.uiEnableDeveloperMode) {
				this.$root.$emit('developerMode', true)
			} else {
				this.$root.$emit('developerMode', false)
			}
		},
		uiEnableChatMessageBadge: function () {
			this.$q.localStorage.set('uiEnableChatMessageBadge', this.uiEnableChatMessageBadge)
			if (this.uiEnableChatMessageBadge) {
				this.$root.$emit('chatMessageBadge', true)
			} else {
				this.$root.$emit('chatMessageBadge', false)
			}
		},
		uiEnableLogEntryBadge: function () {
			this.$q.localStorage.set('uiEnableLogEntryBadge', this.uiEnableLogEntryBadge)
			if (this.uiEnableLogEntryBadge) {
				this.$root.$emit('logEntryBadge', true)
			} else {
				this.$root.$emit('logEntryBadge', false)
			}
		}
	},
	methods: {
		addAccountButtonPressed: function () {
			this.addAccountState = true
			if (this.$refs.accountNameField) {
				this.$nextTick(() => this.$refs.accountNameField.resetValidation())
				this.$nextTick(() => this.$refs.accountNameField.focus())
			} else {
				console.log('accountFieldName reference is broken.')
			}
		},
		cancelAccountDataButtonPressed: function () {
			// Revert changes, if any
			this.addAccountState = false
		},
		saveAccountDataButtonPressed: function () {
			// Do the saving - The validation is done on the field itself
			if (this.accountTypeSelected !== '' && this.$refs.accountNameField.error === false && this.$refs.accountClientIDField.error === false && this.$refs.accountClientSecretField.error === false) {
				this.newAccount = {
					type: this.accountTypeSelected,
					name: this.accountName,
					id: this.accountClientID,
					secret: this.accountClientSecret
				}
				this.addAccount()
			} else {
				console.log('Could not save the account data.')
			}
			// Reset conditional rendering flags
			this.addAccountState = false
		},
		addAccount: function () {
			// add new if type is not existent, overwrite if already there.
			if (this.accounts.findIndex(item => item.type === this.newAccount.type) >= 0) {
				// Entry already exists
				this.removeAccount(this.newAccount)
				this.accounts.push(this.newAccount)
				console.log('account already EXISTS and has been updated')
			} else {
				this.accounts.push(this.newAccount)
				console.log('account did NOT exist alredy and has been added')
			}
			this.newAccount = ''
			this.saveAccounts()
		},
		removeAccount: function () {
			// this.accounts.splice(account, 1)
			this.accounts = this.accounts.filter(item => item.type !== this.selectedAccountType)
			this.saveAccounts()
		},
		saveAccounts: function () {
			const parsed = JSON.stringify(this.accounts)
			this.$q.localStorage.set('accounts', parsed)
			console.log('Accounts: ' + parsed)
		},
		editAccountButtonPressed: function () {
			console.log(this.newAccount)
			this.addAccountState = true
			console.log('Edit account button pressed for platform: ')
		},
		removeAccountButtonPressed: function () {
			/** TODO Implement */
			this.removeAccount()
			// this.accounts = this.accounts.filter(item => item.type !== this.selectedAccountType)
			// this.saveAccounts()
			console.log('Remove account button pressed for platform: ' + this.selectedAccountType)
		} // The avatar should probably be uploadd as part of the profile. Ideally reachable via https.
	},
	computed: {
		isAccountNameValid () {
			if (this.accountName) {
				return this.accountName.length >= 3
			} else {
				return false
			}
		},
		isAccountClientIDValid () {
			if (this.accountClientID) {
				return this.accountClientID.length === 30
			} else {
				return false
			}
		},
		isAccountClientSecretValid () {
			if (this.accountClientSecret) {
				return this.accountClientSecret.length === 30
			} else {
				return false
			}
		},

		darkMode: {
			get () {
				return this.$store.getters['ui/darkMode']
			},
			set (val) {
				this.$q.dark.set(val)
				this.$store.commit('ui/toggleDarkMode')
			}
		}
	}
}
</script>

<style lang="scss">
.addAccountButtonAlignment {
	display: flex;
	flex-direction: column;
	justify-content: right;

}

.avatarAlignment {
	display: flex;
	flex-direction: column;
	justify-content: left;
	text-align: center;
}

.userDataAlignment {
	display: flex;
	flex-direction: column;
	justify-content: left;
	text-align: left;
}

.avatarEditButtonPosition {
	position: absolute;
	top: 27px;
	right: 33px;
	z-index: 2;
}

.avatarEditButtonBGColor {
	background: rgba($color: #aab8be, $alpha: 0.7) //#b0bec5
}

.avatarEditButtonBGColor:hover {
	background: rgba($color: #aab8be, $alpha: 0.9)
}

.fileSelectionField {
	margin-left: 1px
}

.accountListStyleDark {
	background: #2F3136
}

.accountListStyleLight {
	background: #E6EDF2
}

.accountItemStyleLight:hover {
	background: #D4D6D8;
	color: white
}

.accountItemStyleDark:hover {
	background: #36393F;
	color: white
}
</style>
