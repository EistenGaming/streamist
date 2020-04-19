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
          <q-tab name="myAccount" icon="account_box" label="My Account" style="justify-content:initial" :style="{ color: localTextColor2 }"/>

          <div class="q-pa-sm">
          <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-uppercase" :style="{ color: localTextColor1 }">APP SETTINGS</q-item-label>
          </div>
          <q-tab name="appearance" icon="palette" label="Appearance" style="justify-content:initial" :style="{ color: localTextColor2 }"/>
          <q-tab name="notifications" icon="notifications" label="Notifications" style="justify-content:initial" :style="{ color: localTextColor2 }"/>
          <q-tab name="connectivity" icon="cast_connected" label="Connectivity" style="justify-content:initial"  :style="{ color: localTextColor2 }"/>
          <q-tab name="ive" icon="visibility" label="IVES" style="justify-content:initial"  :style="{ color: localTextColor2 }"/>
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
          <q-tab-panel name="myAccount" style="min-width:500px">
            <div class="q-pa-md text-h5 q-mb-md" :style="{ color: localTextColor2 }">MY ACCOUNT</div>
            <form autofocus @submit.prevent='saveAccountDataButtonPressed' @reset.prevent='cancelAccountDataButtonPressed'>
            <div class="bg-primary" :style="{ color: localTextColor2 }" style="min-width:500px; max-width:500px">
            <div class="row q-pa-sm" >
              <div class="col-auto q-pt-md avatarAlignment">
                  <q-item class='bg-primary' :style="{ color: localTextColor2 }">
                    <q-item-section avatar class="q-pa-xs">
                        <q-avatar size='100px'>
                          <img :src="customAvatarPath">
                        </q-avatar>
                        <div v-if="userDataEdit === true">
                          <q-btn @click='changeAvatarButtonPressed' class="avatarEditButtonPosition avatarEditButtonBGColor" round text-color="blue-grey-8" icon="image_search" size="xl"/>
                        </div>
                    </q-item-section>
                  </q-item>
                </div>
                <div class="q-pa-md col userDataAlignment" >
                  <q-item>
                    <q-item-section>
                        <q-item-label class='text-caption' :style="{ color: localTextColor2 }" lines="1">USERNAME</q-item-label>
                          <div v-if="userDataEdit === true">
                            <div class="q-pt-xs"/>
                              <q-input
                                ref='usernameField'
                                outlined
                                dense
                                dark
                                color="accent"
                                bg-color="secondary"
                                v-model="username"
                                error-message="Please use minimum of 3 characters."
                                :error="!isUsernameValid"
                              />
                          </div>
                          <div v-else>
                            <div class="q-pt-xs"/>
                            <q-item-label class='text-subtitle' :style="{ color: localTextColor1 }" lines="1">{{username}}</q-item-label>
                          </div>
                        <div class="q-pa-md"/>
                        <q-item-label class='text-caption' :style="{ color: localTextColor2 }" lines="1">EMAIL</q-item-label>
                          <div v-if="userDataEdit === true">
                            <div class="q-pt-xs"/>
                            <q-input
                            ref='useremailField'
                               outlined
                               dense
                               dark
                               color="accent"
                               bg-color="secondary"
                               v-model="useremail"
                               error-message="Please enter a valid email address."
                               :error="!isUseremailValid"
                            />
                          </div>
                          <div v-else>
                            <div class="q-pt-xs"/>
                            <q-item-label class='text-subtitle' :style="{ color: localTextColor1 }" lines="1">{{useremail}}</q-item-label>
                          </div>
                        <div class="q-pa-md"/>
                          <div v-if="userDataEdit === true">
                          <q-item-label class='text-caption' :style="{ color: localTextColor2 }" lines="1">CURRENT PASSWORD</q-item-label>
                            <div class="q-pt-xs"/>
                            <q-input
                              outlined
                              dense
                              dark
                              bottom-slots
                              ref = "currentPasswordField"
                              color="accent"
                              bg-color="secondary"
                              :type=" isPwdVisible ? 'password' : 'text' "
                              v-model="currentPassword"
                            >
                              <template v-slot:append>
                                <q-icon
                                  :name="isPwdVisible ? 'visibility_off' : 'visibility'"
                                  class="cursor-pointer"
                                  @click="isPwdVisible = !isPwdVisible"
                                />
                              </template>
                            </q-input>
                            <q-item-label @click='changePasswordButtonPressed' class="linkStyle" lines="1">
                              <span class="cursor-pointer">Change Password?</span>
                            </q-item-label>
                          </div>
                        <div class="q-pa-md"/>
                        <div v-if="userDataEdit === true && changePassword === true">
                          <q-item-label class='text-caption' :style="{ color: localTextColor2 }" lines="1">NEW PASSWORD</q-item-label>
                            <div class="q-pt-xs"/>
                            <q-input
                              outlined
                              dense
                              dark
                              color="accent"
                              bg-color="secondary"
                              :type=" isNewPwdVisible ? 'password' : 'text' "
                              v-model="newPassword"
                            >
                              <template v-slot:append>
                                <q-icon
                                  :name="isNewPwdVisible ? 'visibility_off' : 'visibility'"
                                  class="cursor-pointer"
                                  @click="isNewPwdVisible = !isNewPwdVisible"
                                />
                              </template>
                            </q-input>
                            <div class="q-pt-xs"/>
                            <q-item-label class='text-caption' :style="{ color: localTextColor2 }" lines="1">NEW PASSWORD (REPEAT)</q-item-label>
                            <div class="q-pt-xs"/>
                            <q-input
                              outlined
                              dense
                              dark
                              color="accent"
                              bg-color="secondary"
                              :type=" isNewPwdVisible ? 'password' : 'text' "
                              v-model="newPasswordRepeat"
                            >
                              <template v-slot:append>
                                <q-icon
                                  :name="isNewPwdVisible ? 'visibility_off' : 'visibility'"
                                  class="cursor-pointer"
                                  @click="isNewPwdVisible = !isNewPwdVisible"
                                />
                              </template>
                            </q-input>
                        </div>
                    </q-item-section>
                  </q-item>
                </div>
                  <div v-if="userDataEdit !== true">
                    <div class="col-auto editButtonAlignment">
                      <q-btn @click='editAccountDataButtonPressed' unelevated :text-color="localTextColor2"  color='secondary' label='edit' size='sm' />
                    </div>
                  </div>
            </div>
            <div v-if="userDataEdit === true">
              <div class="row justify-end q-pa-sm">
                <q-btn @click='deleteAccountButtonPressed' unelevated outline color='negative' label='delete account' size='sm' />
                <div class="q-pr-xl"/><div class="q-pr-xl"/><div class="q-pr-xl"/><div class="q-pr-xl"/>
                <q-btn @click='cancelAccountDataButtonPressed' type="reset" unelevated outline :text-color="localTextColor2"  color='secondary' label='cancel' size='sm' />
                <div class="q-pr-md"/>
                <q-btn @click='saveAccountDataButtonPressed' type="submit" unelevated color='positive' label='save' size='sm' />
              </div>
            </div>
            <div v-if="userDeleteAccount === true">
                  <q-dialog v-model="userDeleteAccount" persistent>
                  <q-card>
                    <q-card-section class="row items-center">
                      <q-avatar icon="warning" text-color="negative" font-size="36px" />
                      <span class="q-ml-sm">This will permanently delete your account. Are you sure?</span>
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn @click='accountDeleteCancelButtonPressed' flat label="Cancel" color="primary" v-close-popup />
                      <q-btn @click='accountDeleteConfirmButtonPressed' flat label="Delete" color="negative" v-close-popup />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
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
            <div class="q-pt-sm text-caption q-mb-md" :style="{ color: localTextColor2 }">CHAT</div>
              <div class="bg-primary">
                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label :style="{ color: localTextColor1 }">Enable Unread Message Badge</q-item-label>
                    <q-item-label caption  :style="{ color: localTextColor2 }">Shows a badge when you have unread chat messages.</q-item-label>
                  </q-item-section>
                  <q-item-section avatar>
                    <q-toggle color="accent" v-model="uiEnableChatMessageBadge" />
                  </q-item-section>
                </q-item>
            </div>
            <div class="q-pt-md text-caption q-mb-md" :style="{ color: localTextColor2 }">DEV MODE</div>
              <div class="bg-primary">
                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label :style="{ color: localTextColor1 }">Show IVE Feedback Report Badges</q-item-label>
                    <q-item-label caption  :style="{ color: localTextColor2 }">Shows a badge when there are unresolved IVE feedback reports.</q-item-label>
                  </q-item-section>
                  <q-item-section avatar>
                    <q-toggle color="accent" v-model="uiEnableIVEReportBadge" />
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
              <q-item tag="label" v-ripple>
                <q-item-section>
                  <q-item-label :style="{ color: localTextColor1 }">NX Proxy Server</q-item-label>
                  <q-item-label caption :style="{ color: localTextColor2 }">Select the NX proxy server to connect to. It is recommended to choose one in or close to your region.</q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <div :style="{ color: localTextColor1 }">
                    <q-select v-model="nxProxySelected" dense bg-color="secondary" outlined :options="nxProxyOptions" label="Select NX Proxy" style="width:150px"/>
                  </div>
                </q-item-section>
              </q-item>
            </div>
          </q-tab-panel>

          <q-tab-panel name="ive">
            <div class="q-pa-md text-h5 q-mb-md" :style="{ color: localTextColor2 }">Intelligent Virtual Entities</div>
            <div class="bg-primary">
              <q-item tag="label" v-ripple>
                <q-item-section>
                  <q-item-label :style="{ color: localTextColor1 }">Select IVE</q-item-label>
                  <q-item-label caption :style="{ color: localTextColor2 }">Select the Intelligent Virtual Entity you want to connect to. The list shows all the IVEs you have access to.</q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-select v-model="iveSelected" dense bg-color="secondary" outlined :options="iveOptions" label="Select IVE" style="width:150px"/>
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
      selectedTab: 'myAccount',
      username: '',
      usernamePrevious: '',
      useremail: '',
      useremailPrevious: '',
      currentPassword: '',
      currentPasswordHash: '',
      newPassword: '',
      newPasswordRepeat: '',
      userDeleteAccount: false,
      userDeleteAccountConfirm: false,
      isPwdVisible: true,
      isNewPwdVisible: true,
      userDataEdit: false,
      changePassword: false,
      customAvatarPath: '',
      loginAtStartup: false,
      uiEnableDarkMode: false,
      uiEnableDeveloperMode: false,
      uiEnableChatMessageBadge: false,
      uiEnableIVEReportBadge: false,
      localTextColor1: '',
      localTextColor2: '',
      nxProxySelected: 'eu-central',
      nxProxyOptions: ['eu-central'
      ],
      iveSelected: 'Lena',
      iveOptions: ['Lena', 'Derek', 'Galatea'
      ]
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
    this.uiEnableChatMessageBadge = this.$q.localStorage.getItem('uiEnableChatMessageBadge')
    this.uiEnableIVEReportBadge = this.$q.localStorage.getItem('uiEnableIVEReportBadge')
    if (this.uiEnableDarkMode) {
      this.localTextColor1 = this.$darkTextColor1
      this.localTextColor2 = this.$darkTextColor2
    } else {
      this.localTextColor1 = this.$lightTextColor1
      this.localTextColor2 = this.$lightTextColor2
    }
    // console.log('SETTINGS - show report badge: ' + this.uiEnableIVEReportBadge)
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
    uiEnableIVEReportBadge: function () {
      this.$q.localStorage.set('uiEnableIVEReportBadge', this.uiEnableIVEReportBadge)
      if (this.uiEnableIVEReportBadge) {
        this.$root.$emit('iveReportBadge', true)
      } else {
        this.$root.$emit('iveReportBadge', false)
      }
    }
  },
  methods: {
    editAccountDataButtonPressed: function () {
      this.usernamePrevious = this.username
      this.useremailPrevious = this.useremail
      this.userDataEdit = true
      if (this.$refs.usernameField) {
        this.$nextTick(() => this.$refs.usernameField.resetValidation())
        this.$nextTick(() => this.$refs.usernameField.focus())
      }
    },
    cancelAccountDataButtonPressed: function () {
      // Revert changes, if any
      this.username = this.usernamePrevious
      this.useremail = this.useremailPrevious
      // Set edit mode to false
      this.changePassword = false
      this.userDataEdit = false
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
      this.userDataEdit = false
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
    isUsernameValid () {
      if (this.username) {
        return this.username.length >= 3
      } else {
        return false
      }
    },
    isUseremailValid () {
      return util.validateEmail(this.useremail)
    }
  }
}
</script>

<style lang="scss">
  .editButtonAlignment {
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
