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
          :style="{ color: localTextColor1 }"
          icon="menu"
          aria-label="Menu"
        />

        <q-space/>
        <div v-if="showIndeterminateProgress === true">
          <q-circular-progress
            indeterminate
            size='30px'
            color='localTextColor1'
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
    <div v-if="this.progressValue > 0 && this.progressValue < 1" class="progressBarPosition">
      <q-linear-progress
        stripe
        style=" height: 15px"
        :value="this.progressValue"
        color="accent"/>
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
          <q-item-section side>
            <q-avatar :style="{ color: localTextColor1 }" icon="home" size="48px"/>
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
            <q-avatar :style="{ color: localTextColor1 }" icon="insert_chart" size="48px"/>
            <q-tooltip content-class="bg-black text-blue-grey-3" anchor="center right" self="center left" :offset="[10, 10]">
              <div style="font-size:medium">Analytics Dashboard</div>
            </q-tooltip>
          </q-item-section>
        </q-item>
        <q-item to="/planning" exact clickable v-ripple>
          <q-item-section side>
            <q-avatar :style="{ color: localTextColor1 }" icon="trending_up" size="48px"/>
            <q-tooltip content-class="bg-black text-blue-grey-3" anchor="center right" self="center left" :offset="[10, 10]">
              <div style="font-size:medium">Planning</div>
            </q-tooltip>
          </q-item-section>
        </q-item>
        <div v-if="uiEnableDeveloperMode === true">
          <q-item to="/devtools" exact clickable v-ripple>
            <q-item-section side>
              <q-avatar :style="{ color: localTextColor1 }" icon="developer_mode" size="48px">
                <div v-if="uiEnableLogEntryBadge === true && uiUnresolvedLogEntryCount > 0">
                  <q-badge class="badgePosition" color="accent" text-color="white" floating transparent>{{ uiUnresolvedLogEntryCount }}</q-badge>
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
            <q-avatar :style="{ color: localTextColor1 }" icon="info_outline" size="48px"/>
            <q-tooltip content-class="bg-black text-blue-grey-3" anchor="center right" self="center left" :offset="[10, 10]">
              <div style="font-size:medium">About</div>
            </q-tooltip>
          </q-item-section>
        </q-item>
        <q-item to="/settings" exact clickable v-ripple>
          <q-item-section side>
            <q-avatar :style="{ color: localTextColor1 }" icon="settings" size="48px"/>
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
            <div class="text-weight-bold">{{ this.userAlertTitle }}</div>
            <div class="text-grey">{{ this.userAlertText }}</div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- *** END User Message Dialog *** -->
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
var util = require('src/utils/utility')

export default {
  name: 'MainLayout',
  created () {
    this.$store.commit('accounts/initialize')
  },

  data () {
    return {
      leftDrawerOpen: false,
      twitchToggleState: false,
      facebookToggleState: false,
      youtubeToggleState: false,
      twitchStateTextColor: 'blue-grey-9',
      twitchStateBgColor: 'secondary',
      facebookStateTextColor: 'blue-grey-3',
      facebookStateBgColor: 'secondary',
      youtubeStateTextColor: 'blue-grey-3',
      youtubeStateBgColor: 'secondary',
      userAlertDialog: false,
      userAlertTitle: '',
      userAlertText: '',
      userAlertIcon: '',
      userAlertIconColor: '',
      userAlertSeverity: ['info', 'warning', 'error', 'fatal'
      ],
      localTextColor1: '',
      localTextColor2: '',
      progressValue: 0,
      uiEnableDeveloperMode: false,
      uiEnableLogEntryBadge: false,
      uiUnreadChatMessageCount: 0,
      uiUnresolvedLogEntryCount: 0,
      showIndeterminateProgress: false
    }
  },
  mounted () { // This allows you to do stuff 'on page load'
    this.$root.$on('userAlert', this.showUserAlert)
    this.$root.$on('userNotify', this.showUserNotify)
    this.$root.$on('themeChange', this.changeTheme)
    this.$root.$on('showProgress', this.showProgress)
    this.$root.$on('showIndeterminateProgress', this.toggleIndeterminateProgress)
    this.$root.$on('developerMode', this.enableDevMode)
    this.$root.$on('unresolvedLogEntries', this.setUnresolvedLogEntryCount)
    this.uiEnableLogEntryBadge = this.$q.localStorage.getItem('uiEnableLogEntryBadge')
    this.uiEnableDeveloperMode = !!this.$q.localStorage.getItem('uiEnableDeveloperMode')
    const debugLog = this.$q.localStorage.getItem('debugLog')
    if (debugLog !== null) {
      this.uiUnresolvedLogEntryCount = debugLog.length
    } else {
      this.uiUnresolvedLogEntryCount = 0
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
        this.$root.$emit('showIndeterminateProgress')
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
        textColor: 'black'
      })
    },
    showProgress: function (progress) {
      this.progressValue = progress
    },
    toggleIndeterminateProgress: function (val) {
      this.showIndeterminateProgress = val
      console.log('indeterminate indicator: ' + this.showIndeterminateProgress)
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
