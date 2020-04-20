<template>
  <q-layout view="hHh Lpr fFf" >
    <q-header elevated>
      <q-bar class="q-electron-drag">
        <img alt="App Logo" src="~assets/icon.png" style="width:24px"/>
        <div>{{$appName}} v{{$appVersion}}</div>
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
          :style="{ color: localTextColor1 }"
          icon="menu"
          aria-label="Menu"
        />

        <q-space/>

        <div :style="{ color: localTextColor1 }">
        <q-btn
          @click="registerButtonPressed"
          flat
          size="10px"
          color="localTextColor1"
          label="Register"
        />
        <q-toggle
          v-model="loginToggleState"
          class="text-caption toggleCustomSize"
          checked-icon="check"
          color="accent"
          :label="loginToggleMessage"
          left-label
          unchecked-icon="clear"
        />
        </div>
        <q-chip
          :color="loginStateBgColor"
          :text-color="loginStateTextColor"
          :label='loginStateMessage'
          square
          size='10px'
        />
      </q-toolbar>
    </q-header>
    <div v-if="this.progressValue > 0 && this.progressValue < 1" class="progressBarPosition">
      <q-linear-progress stripe style=" height: 15px" :value="this.progressValue" color="accent" />
    </div>
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
        <q-item to="/home" exact clickable v-ripple>
          <q-item-section side >
            <q-avatar :style="{ color: localTextColor1 }" icon="home" size="48px" />
             <q-tooltip content-class="bg-black text-blue-grey-3" anchor="center right" self="center left" :offset="[10, 10]">
               <div style="font-size:medium">Home</div>
             </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/analyticsDashboard" exact clickable v-ripple>
          <q-item-section side>
            <q-avatar :style="{ color: localTextColor1 }" icon="insert_chart" size="48px" />
            <q-tooltip content-class="bg-black text-blue-grey-3" anchor="center right" self="center left" :offset="[10, 10]">
               <div style="font-size:medium">Analytics Dashboard</div>
             </q-tooltip>
          </q-item-section>
        </q-item>
        <div v-if="uiEnableDeveloperMode === true">
        <q-item to="/devtools" exact clickable v-ripple>
          <q-item-section side>
            <q-avatar :style="{ color: localTextColor1 }" icon="developer_mode" size="48px">
              <div v-if="uiEnableLogEntryBadge === true && uiUnresolvedLogEntryCount > 0">
                  <q-badge class="badgePosition" color="accent" text-color="white" floating transparent>{{uiUnresolvedLogEntryCount}}</q-badge>
              </div>
            </q-avatar>
            <q-tooltip content-class="bg-black text-blue-grey-3" anchor="center right" self="center left" :offset="[10, 10]">
               <div style="font-size:medium">Developer Tools</div>
             </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label text-color="blue-grey-1">Developer Mode</q-item-label>
          </q-item-section>
        </q-item>
        </div>
        <q-item to="/about" exact clickable v-ripple>
          <q-item-section side>
            <q-avatar :style="{ color: localTextColor1 }" icon="info_outline" size="48px" />
            <q-tooltip content-class="bg-black text-blue-grey-3" anchor="center right" self="center left" :offset="[10, 10]">
               <div style="font-size:medium">About</div>
             </q-tooltip>
          </q-item-section>
        </q-item>
        <q-item to="/settings" exact clickable v-ripple>
          <q-item-section side>
            <q-avatar :style="{ color: localTextColor1 }" icon="settings" size="48px" />
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
      <!-- *** User Alert Dialog *** -->
      <q-dialog v-model="userAlertDialog" position="top">
        <q-card style="width: 450px">
          <q-card-section class="row items-center justify-center no-wrap">
            <q-btn
              flat
              round
              size="24px"
              :icon="this.userAlertIcon"
              :style="{color: this.userAlertIconColor}"
            />
            <div>
              <div class="text-weight-bold">{{this.userAlertTitle}}</div>
              <div class="text-grey">{{this.userAlertText}}</div>
            </div>
          </q-card-section>
        </q-card>
        </q-dialog>
      <!-- *** END User Message Dialog *** -->
      <!-- *** Register Dialog *** -->
        <div v-if="registerAccount === true">
              <q-dialog v-model="registerAccount" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <q-avatar icon="person_add" :text-color="localTextColor2" font-size="36px" />
                  <span class="q-ml-sm">Create a new account</span>
                </q-card-section>
                <q-card-section>
                  <div class="q-pt-xs"/>
                  <q-item-label class='text-caption q-pr-xs' :style="{color: localTextColor2}" lines="1">USERNAME</q-item-label>
                  <q-input
                    ref='newUsernameField'
                    outlined
                    dense
                    dark
                    color="accent"
                    bg-color="secondary"
                    v-model="newUsername"
                    error-message="Please use minimum of 3 characters."
                    :error="!isUsernameValid"
                  />
                </q-card-section>
                <q-card-section>
                  <q-item-label class='text-caption q-pr-xs' :style="{color: localTextColor2}" lines="1">EMAIL</q-item-label>
                  <q-input
                    ref='newUseremailField'
                    outlined
                    dense
                    dark
                    color="accent"
                    bg-color="secondary"
                    v-model="newUseremail"
                    error-message="Please enter a valid email address."
                    :error="!isUseremailValid"
                  />
                </q-card-section>
                <q-card-section>
                  <div class="q-pt-xs"/>
                  <q-item-label class='text-caption q-pr-xs' :style="{color: localTextColor2}" lines="1">PASSWORD</q-item-label>
                  <q-input
                    outlined
                    dense
                    dark
                    bottom-slots
                    ref = "newPasswordField"
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
                  <q-item-label class='text-caption q-pr-xs' :style="{color: localTextColor2}" lines="1">CONFIRM PASSWORD</q-item-label>
                  <q-input
                    outlined
                    dense
                    dark
                    bottom-slots
                    ref = "newPasswordFieldConfirm"
                    color="accent"
                    bg-color="secondary"
                    :type=" isNewPwdVisible ? 'password' : 'text' "
                    v-model="newPasswordConfirmed"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isNewPwdVisible ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isNewPwdVisible = !isNewPwdVisible"
                      />
                    </template>
                  </q-input>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn @click='registerAccountCancelButtonPressed' flat label="Cancel" color="negative" v-close-popup />
                  <q-btn @click='registerAccountConfirmButtonPressed' flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
        </div>
      <!-- *** END Register Dialog *** -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
var util = require('src/utils/utility')
import { colors } from 'quasar'
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      loginToggleState: false,
      loginStateMessage: 'OFFLINE',
      loginStateTextColor: 'blue-grey-3',
      loginStateBgColor: 'blue-grey-7',
      loginButtonTextColor: 'blue-grey-3',
      loginButtonBgColor: 'accent',
      loginToggleMessage: 'LOGIN',
      userAlertDialog: false,
      userAlertTitle: '',
      userAlertText: '',
      userAlertIcon: '',
      userAlertIconColor: '',
      userAlertSeverity: ['info', 'warning', 'error', 'fatal'
      ],
      registerAccount: false,
      newUsername: '',
      newUseremail: '',
      newPassword: '',
      newPasswordConfirmed: '',
      isNewPwdVisible: true,
      localTextColor1: '',
      localTextColor2: '',
      progressValue: 0,
      uiEnableDeveloperMode: false,
      uiEnableLogEntryBadge: false,
      uiUnreadChatMessageCount: 0,
      uiUnresolvedLogEntryCount: 0
    }
  },
  mounted () { // This allows you to do stuff 'on page load'
    // DEBUG
    util.websocketHelloWorld()
    // END DEBUG
    this.$root.$on('userAlert', this.showUserAlert)
    this.$root.$on('userNotify', this.showUserNotify)
    this.$root.$on('themeChange', this.changeTheme)
    this.$root.$on('showProgress', this.showProgress)
    this.$root.$on('developerMode', this.enableDevMode)
    this.$root.$on('iveLogEntryBadge', this.enableLogEntryBadge)
    this.$root.$on('unresolvedLogEntries', this.setUnresolvedLogEntryCount)
    this.uiEnableLogEntryBadge = this.$q.localStorage.getItem('uiEnableLogEntryBadge')
    document.addEventListener('keydown', this.keyListener)
    if (this.$q.localStorage.getItem('uiEnableDarkMode')) {
      this.changeTheme('dark')
    } else {
      this.changeTheme('light')
    }
    if (this.$q.localStorage.getItem('uiEnableDeveloperMode')) {
      this.uiEnableDeveloperMode = true
    } else {
      this.uiEnableDeveloperMode = false
    }
    var debugLog = this.$q.localStorage.getItem('debugLog')
    if (debugLog !== null) {
      this.uiUnresolvedLogEntryCount = debugLog.length
    } else {
      this.uiUnresolvedLogEntryCount = 0
    }
  },
  watch: {
    loginToggleState: function () {
      this.loginToggleState ? this.loginToggleMessage = 'LOGOUT' : this.loginToggleMessage = 'LOGIN'
      this.loginToggleState ? this.loginStateMessage = 'ONLINE' : this.loginStateMessage = 'OFFLINE'
      this.loginToggleState ? this.loginStateTextColor = 'white' : this.loginStateTextColor = 'blue-grey-3'
      this.loginToggleState ? this.loginStateBgColor = 'accent' : this.loginStateBgColor = 'blue-grey-7'
    }
  },
  computed: {
    isUsernameValid () {
      if (this.newUsername) {
        return this.newUsername.length >= 3
      } else {
        return false
      }
    },
    isUseremailValid () {
      return util.validateEmail(this.useremail)
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
    },
    keyListener: function (e) {
      // DEBUG: This is for debugging purposes only
      if (e.key === '1' && (e.ctrlKey || e.metaKey)) {
        this.$root.$emit('userAlert', 'fatal', 'A message from the president', 'Obey the president!')
      } else if (e.key === '2' && (e.ctrlKey || e.metaKey)) {
        this.$root.$emit('userNotify', 'Here\'s a new notification', '5 min ago.', 'notifications_active')
      } else if (e.key === '3' && (e.ctrlKey || e.metaKey)) {
        this.$root.$emit('showProgress', 0.35)
      } else if (e.key === '4' && (e.ctrlKey || e.metaKey)) {
        this.$root.$emit('showProgress', 0.70)
      } else if (e.key === '5' && (e.ctrlKey || e.metaKey)) {
        this.$root.$emit('showProgress', 1.00)
      } else if (e.key === '6' && (e.ctrlKey || e.metaKey)) {
        util.graphQLHelloWorld()
      } else if (e.key === '7' && (e.ctrlKey || e.metaKey)) {
        // console.log('Electron Version: ' + this.$q.electron.remote.process.versions.electron)
      }
    },
    showUserAlert: function (severity, title, message) {
      this.userAlertSeverity = severity
      this.userAlertTitle = title
      this.userAlertText = message
      if (severity === 'warning') {
        this.userAlertIcon = 'warning'
        this.userAlertIconColor = getComputedStyle(document.documentElement).getPropertyValue('--q-color-warning')
      } else if (severity === 'error') {
        this.userAlertIcon = 'error_outline'
        this.userAlertIconColor = getComputedStyle(document.documentElement).getPropertyValue('--q-color-negative')
      } else if (severity === 'fatal') {
        this.userAlertIcon = 'error'
        this.userAlertIconColor = getComputedStyle(document.documentElement).getPropertyValue('--q-color-negative')
      } else {
        this.userAlertIcon = 'info'
        this.userAlertIconColor = getComputedStyle(document.documentElement).getPropertyValue('--q-color-info')
      }
      this.userAlertDialog = true
    },
    showUserNotify: function (text, caption, icon) {
      this.$q.notify({
        message: text,
        caption: caption,
        icon: icon,
        color: 'notifyBg',
        textColor: 'blue-grey-10'
      })
    },
    showProgress: function (progress) {
      this.progressValue = progress
    },
    registerButtonPressed: function () {
      // Do the user registration
      this.registerAccount = true
      // console.log('User registration triggered.')
    },
    registerAccountCancelButtonPressed: function () {
      // User registration cancelled
      // console.log('User registration cancelled.')
    },
    registerAccountConfirmButtonPressed: function () {
      // User registration confirmed
      // console.log('User registration confirmed.')
    },
    setDarkModeColors: function () {
      // Set dark mode brand colors
      colors.setBrand('primary', this.$darkPrimary)
      colors.setBrand('secondary', this.$darkSecondary)
      colors.setBrand('accent', this.$darkAccent)
      colors.setBrand('positive', this.$darkPositive)
      colors.setBrand('negative', this.$darkNegative)
      colors.setBrand('info', this.$darkInfo)
      colors.setBrand('warning', this.$darkWarning)
      this.localTextColor1 = this.$darkTextColor1
      this.localTextColor2 = this.$darkTextColor2
    },
    setLightModeColors: function () {
      // Set light mode brand colors
      colors.setBrand('primary', this.$lightPrimary)
      colors.setBrand('secondary', this.$lightSecondary)
      colors.setBrand('accent', this.$lightAccent)
      colors.setBrand('positive', this.$lightPositive)
      colors.setBrand('negative', this.$lightNegative)
      colors.setBrand('info', this.$lightInfo)
      colors.setBrand('warning', this.$lightWarning)
      this.localTextColor1 = this.$lightTextColor1
      this.localTextColor2 = this.$lightTextColor2
    },
    changeTheme: function (theme) {
      if (theme === 'dark') {
        this.setDarkModeColors()
      } else {
        this.setLightModeColors()
      }
    },
    enableDevMode: function (devMode) {
      if (devMode) {
        this.uiEnableDeveloperMode = true
      } else {
        this.uiEnableDeveloperMode = false
      }
    },
    enableChatMessageBadge: function (showBadge) {
      if (showBadge) {
        this.uiEenableChatMessageBadge = true
      } else {
        this.uiEenableChatMessageBadge = false
      }
    },
    enableLogEntryBadge: function (showBadge) {
      if (showBadge) {
        this.uiEnableLogEntryBadge = true
      } else {
        this.uiEnableLogEntryBadge = false
      }
    },
    setUnreadMessageCount: function (noOfMessages) {
      // TODO: Implement
      this.uiUnreadChatMessageCount = noOfMessages
    },
    setUnresolvedLogEntryCount: function (noOfReports) {
      // TODO: Implement
      this.uiUnresolvedLogEntryCount = noOfReports
    },
    getCurrentRoute: function () {
      // console.log('ROUTE: ' + this.$router.currentRoute.path)
      return this.$router.currentRoute.path
    }
  }

}
</script>

<style lang="scss">
  .q-drawer {
    .q-router-link--exact-active {
      color: white !important;
    }
  }
  .toggleCustomSize {
    transform: scale(0.85, 0.85);
  }
  .progressBarPosition {
  position: absolute;
  top: 10%;
  width: 100%;
  z-index: 2;
}
.bg-notifyBg {
  background: #ffffff99;
}
.badgePosition {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 2;
}
</style>
