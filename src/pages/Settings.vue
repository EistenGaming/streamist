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
          <div class="q-pa-sm" >
            <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-uppercase" :style="{ color: localTextColor1 }" >USER SETTINGS</q-item-label>
          </div>
          <q-tab name="accounts" icon="account_box" label="Accounts" style="justify-content:initial" :style="{ color: localTextColor2 }"/>

          <div class="q-pa-sm">
          <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-uppercase" :style="{ color: localTextColor1 }">APP SETTINGS</q-item-label>
          </div>
          <q-tab name="appearance" icon="palette" label="Appearance" style="justify-content:initial" :style="{ color: localTextColor2 }"/>
          <q-tab name="notifications" icon="notifications" label="Notifications" style="justify-content:initial" :style="{ color: localTextColor2 }"/>
          <q-tab name="connectivity" icon="cast_connected" label="Connectivity" style="justify-content:initial"  :style="{ color: localTextColor2 }"/>
        </q-tabs>
      </template>
      <template v-slot:after>
        <q-tab-panels
          v-model="selectedTab"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
          class="bg-secondary"
        >
          <q-tab-panel name="accounts" style="min-width:500px">
            <div class="q-pa-md text-h5 q-mb-md" :style="{ color: localTextColor2 }">ACCOUNTS</div>
            <form autofocus @submit.prevent='saveAccountDataButtonPressed' @reset.prevent='cancelAccountDataButtonPressed'>
              <div v-if="addAccount !== true">
                <div>
                  <q-btn @click='addAccountButtonPressed' unelevated :text-color='buttonTextColor'  color='blue-grey-7' label='Add New' size='sm' />
                </div>
              </div>
              <div v-if="addAccount === true">
                <div class="row">
                <div class="column">
                  <q-select
                    v-model="accountTypeSelected"
                    dark
                    dense
                    bg-color="secondary"
                    outlined
                    :options="accountTypeOptions"
                    style="width:100px"/>
                </div>
                  <div class="column q-ml-md">
                    <q-input
                      ref='accountNameField'
                      label='Account Name'
                      outlined
                      dense
                      dark
                      color="accent"
                      bg-color="secondary"
                      v-model="accountName"
                      error-message="Please use minimum of 3 characters."
                      :error="!isAccountNameValid"
                    />
                  </div>
                  <div class="column q-ml-md">
                    <q-input
                      ref='accountClientIDField'
                      label='Account Client ID'
                      outlined
                      dense
                      dark
                      color="accent"
                      bg-color="secondary"
                      v-model="accountClientID"
                      error-message="Please enter a valid client ID."
                      :error="!isAccountClientIDValid"
                    />
                  </div>
                  <div class="column q-ml-md">
                    <q-input
                      ref='accountClientSecretField'
                      label='Account Client Secret'
                      outlined
                      dense
                      dark
                      bottom-slots
                      color="accent"
                      bg-color="secondary"
                      :type=" isClientSecretVisible ? 'password' : 'text' "
                      v-model="accountClientSecret"
                      error-message="Please enter a valid client secret."
                      :error="!isAccountClientSecretValid"
                      >
                        <template v-slot:append>
                          <q-icon
                            :name="isClientSecretVisible ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isClientSecretVisible = !isClientSecretVisible"
                          />
                        </template>
                    </q-input>
                  </div>
                  <div class="column q-ma-xs">
                    <div class="row q-ml-md">
                        <q-btn @click='cancelAccountDataButtonPressed' type="reset" unelevated outline color='negative' icon="cancel" size='sm' />
                        <div class="q-ml-sm"/>
                        <q-btn @click='saveAccountDataButtonPressed' type="submit" unelevated color='positive' icon="check_circle" size='sm' />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </q-tab-panel>

          <q-tab-panel name="appearance">
            <div class="text-h5 q-mb-md" :style="{ color: localTextColor2 }">APPEARANCE</div>
            <div class="q-pt-sm text-caption q-mb-md" :style="{ color: localTextColor2 }">THEME</div>
              <div class="bg-primary">
                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label :style="{ color: localTextColor1 }">Enable Dark Mode</q-item-label>
                    <q-item-label caption  :style="{ color: localTextColor2 }">Change the UI theme to light or dark mode.</q-item-label>
                  </q-item-section>
                  <q-item-section avatar>
                    <q-toggle color="accent" v-model="uiEnableDarkMode" />
                  </q-item-section>
                </q-item>
            </div>
            <div class="q-pt-md text-caption q-mb-md" :style="{ color: localTextColor2 }">ADVANCED</div>
              <div class="bg-primary">
                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label :style="{ color: localTextColor1 }">Developer Mode</q-item-label>
                    <q-item-label caption  :style="{ color: localTextColor2 }">Developer mode exposes functionality helpful for debugging and extending the app.</q-item-label>
                  </q-item-section>
                  <q-item-section avatar>
                    <q-toggle color="accent" v-model="uiEnableDeveloperMode" />
                  </q-item-section>
                </q-item>
            </div>
          </q-tab-panel>

          <q-tab-panel name="notifications">
            <div class="text-h5 q-mb-md" :style="{ color: localTextColor2 }">NOTIFICATIONS</div>
             <div class="q-pt-md text-caption q-mb-md" :style="{ color: localTextColor2 }">DEV MODE</div>
              <div class="bg-primary">
                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label :style="{ color: localTextColor1 }">Show badges for new log entries</q-item-label>
                    <q-item-label caption  :style="{ color: localTextColor2 }">Shows a badge when there is a new log entry.</q-item-label>
                  </q-item-section>
                  <q-item-section avatar>
                    <q-toggle color="accent" v-model="uiEnableLogEntryBadge" />
                  </q-item-section>
                </q-item>
            </div>
          </q-tab-panel>

          <q-tab-panel name="connectivity">
            <div class="q-pa-md text-h5 q-mb-md" :style="{ color: localTextColor2 }">CONNECTIVITY</div>
            <div class="bg-primary">
              <q-item tag="label" v-ripple>
                <q-item-section>
                  <q-item-label :style="{ color: localTextColor1 }">Login automatically</q-item-label>
                  <q-item-label caption :style="{ color: localTextColor2 }">If you have provided your authentication credentials in the 'MY ACCOUNT' section of the settings, you will be automatically logged in when the application starts.</q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-toggle color="accent" v-model="loginAtStartup" />
                </q-item-section>
              </q-item>
            </div>
          </q-tab-panel>
        </q-tab-panels>

      </template>
    </q-splitter>
  </div>
  </q-page>
</template>

<script>
var util = require('src/utils/utility')
export default {
  name: 'Settings',
  data () {
    return {
      selectedTab: 'accounts',
      accountTypeOptions: ['Twitch', 'Mixer', 'Youtube'],
      accountTypeSelected: 'Twitch',
      accountName: '',
      accountClientID: '',
      accountClientSecret: '',
      isClientSecretVisible: true,
      addAccount: false,
      loginAtStartup: false,
      uiEnableDarkMode: false,
      uiEnableDeveloperMode: false,
      uiEnableChatMessageBadge: false,
      uiEnableLogEntryBadge: false,
      localTextColor1: '',
      localTextColor2: '',
      buttonTextColor: 'blue-grey-3',
      buttonBgColor: 'blue-grey-7'
    }
  },
  mounted () { // This allows you to do stuff 'on page load'
    // Read the locally stored values
    this.username = this.$q.localStorage.getItem('username')
    this.useremail = this.$q.localStorage.getItem('useremail')
    this.customAvatarPath = this.$q.localStorage.getItem('customAvatarPath')
    this.loginAtStartup = this.$q.localStorage.getItem('loginAtStartup')
    this.nxProxySelected = this.$q.localStorage.getItem('nxProxySelected')
    this.uiEnableDarkMode = this.$q.localStorage.getItem('uiEnableDarkMode')
    this.uiEnableDeveloperMode = this.$q.localStorage.getItem('uiEnableDeveloperMode')
    this.uiEnableLogEntryBadge = this.$q.localStorage.getItem('uiEnableLogEntryBadge')
    if (this.uiEnableDarkMode) {
      this.localTextColor1 = this.$darkTextColor1
      this.localTextColor2 = this.$darkTextColor2
    } else {
      this.localTextColor1 = this.$lightTextColor1
      this.localTextColor2 = this.$lightTextColor2
    }
  },
  watch: {
    loginAtStartup: function () {
      this.$q.localStorage.set('loginAtStartup', this.loginAtStartup)
    },
    nxProxySelected: function () {
      this.$q.localStorage.set('nxProxySelected', this.nxProxySelected)
    },
    uiEnableDarkMode: function () {
      this.$q.localStorage.set('uiEnableDarkMode', this.uiEnableDarkMode)
      if (this.uiEnableDarkMode) {
        this.localTextColor1 = this.$darkTextColor1
        this.localTextColor2 = this.$darkTextColor2
        this.$root.$emit('themeChange', 'dark')
      } else {
        this.localTextColor1 = this.$lightTextColor1
        this.localTextColor2 = this.$lightTextColor2
        this.$root.$emit('themeChange', 'light')
      }
      // I think we need to make more use of the default brand color set
      // and define a light and dark set of colors instead of usin
      // the dark mode plugin
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
      this.addAccount = true
      if (this.$refs.accountNameField) {
        this.$nextTick(() => this.$refs.accountNameField.resetValidation())
        this.$nextTick(() => this.$refs.accountNameField.focus())
      } else {
        console.log('accountFieldName reference is broken.')
      }
    },
    cancelAccountDataButtonPressed: function () {
      // Revert changes, if any
      this.username = this.usernamePrevious
      this.useremail = this.useremailPrevious
      // Set edit mode to false
      this.changePassword = false
      this.addAccount = false
      this.currentPassword = ''
      this.newPassword = ''
      this.newPasswordRepeat = ''
    },
    saveAccountDataButtonPressed: function () {
      // Do the saving - The validation is done on the field itself

      if (this.$refs.usernameField.error === false) {
        this.$q.localStorage.set('username', this.username)
      } else {
        // Log or display an error ?
      }
      if (this.$refs.useremailField.error === false) {
        this.$q.localStorage.set('useremail', this.useremail)
      }
      // Do proper avatar handling
      // Do proper password handling (hashing?)
      if (this.currentPassword.length > 0) {
        this.currentPasswordHash = util.hashSHA512(this.currentPassword)
        this.$q.localStorage.set('currentPasswordHash', this.currentPasswordHash)
        this.currentPassword = ''
      }
      // Do the password change checking

      // Reset conditional rendering flags
      this.addAccount = false
    },
    deleteAccountButtonPressed: function () {
      // Ask for confirmation
      this.userDeleteAccount = true
      // Do the account deletion
    },
    accountDeleteCancelButtonPressed: function () {
      // Todo cancel the action
      this.userDeleteAccount = false
      this.userDeleteAccountConfirm = false
    },
    accountDeleteConfirmButtonPressed: function () {
      // Todo DO the deletion
      // Reset settings
      this.userDeleteAccount = false
      this.userDeleteAccountConfirm = false
    },
    changePasswordButtonPressed: function () {
      this.changePassword = true
      this.$nextTick(() => this.$refs.currentPasswordField.focus())
    },
    changeAvatarButtonPressed: function () {
      // this.$refs.avatarFileInput.$el.click() // this is the 'web-ready' version
      const remote = require('electron').remote
      const result = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
        properties: ['openFile'],
        filters: [
          { name: 'Images', extensions: ['jpg', 'png', 'gif'] }]
      })
      var newAvatarPath = 'file://' + result
      if (result !== undefined && newAvatarPath.length > 8) {
        this.$q.localStorage.set('customAvatarPath', newAvatarPath)
        this.customAvatarPath = newAvatarPath
      }
    }
    // The avatar should probably be uploadd as part of the profile. Ideally reachable via https.
    // So it will be available on all platforms and could be made
    // visible to another user.
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
  .avatarAlignment{
    display: flex;
    flex-direction: column;
    justify-content: left;
    text-align: center;
  }
    .userDataAlignment{
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
  background:rgba($color: #aab8be, $alpha: 0.7) //#b0bec5
}
  .avatarEditButtonBGColor:hover {
  background:rgba($color: #aab8be, $alpha: 0.9)
}
  .linkStyle {
  color: (var(localTextColor2));
  // class='text-subtitle text-weight-bold text-blue-grey-2'
}
  .linkStyle:hover {
  color: (var(localTextColor1));
  text-decoration: underline;
  // class='text-subtitle text-weight-bold text-blue-grey-2'
}
  .fileSelectionField {
    margin-left: 1px
}
</style>
