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
        <div v-if="uiEnableDeveloperMode === true">
          <q-item :to="{name:'devtools.debug-log'}" exact clickable v-ripple>
            <q-item-section side>
              <q-avatar icon="developer_mode" size="48px">
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
var util = require('src/utils/utility')

export default {
  name: 'MainLayout',
  created () {
    this.$store.commit('accounts/initialize')
  },

  data () {
    return {
      leftDrawerOpen: false,
      userAlertDialog: false,
      progressValue: 0,
      uiEnableDeveloperMode: false,
      uiEnableLogEntryBadge: false,
      uiUnreadChatMessageCount: 0,
      uiUnresolvedLogEntryCount: 0
    }
  },
  mounted () {
    // This allows you to do stuff 'on page load'
    this.$root.$on('showProgress', this.showProgress)
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
    shouldShowProgressSpinner () {
      return this.$store.getters['ui/progressSpinner']
    },
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
    keyListener (e) {
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
      }
    },
    showProgress (progress) {
      this.progressValue = progress
    },
    toggleIndeterminateProgress: function (val) {
      console.log({ val })
      if (val) {
        this.showProgressSpinner()
      } else {
        this.hideProgressSpinner()
      }
    },

    enableDevMode (devMode) {
      this.uiEnableDeveloperMode = !!devMode
    },
    enableChatMessageBadge (showBadge) {
      this.uiEenableChatMessageBadge = !!showBadge
    },
    enableLogEntryBadge (showBadge) {
      this.uiEnableLogEntryBadge = !!showBadge
    },
    setUnreadMessageCount (noOfMessages) {
      // TODO: Implement
      this.uiUnreadChatMessageCount = noOfMessages
    },
    setUnresolvedLogEntryCount (noOfReports) {
      // TODO: Implement
      this.uiUnresolvedLogEntryCount = noOfReports
    },
    getCurrentRoute () {
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
