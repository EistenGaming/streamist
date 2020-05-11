<template>
      <q-page class="flex flex-start bg-secondary column">
        <q-item-label lines="1" class="q-pa-sm text-h3 text-weight-bold text-uppercase col-1" :style="{ color: localTextColor1 }" >Analytics Dashboard</q-item-label>
        <div style="width:100%" class="q-pa-sm flex items-start" :style="{ color: localTextColor1 }">
          <div style="width:100%" class=" column">
            <div class="row q-pb-md" >
              <q-item-label class="text-red">Twitch only at this time :)</q-item-label>
            </div>
            <div class="row">
                <q-tabs
                  v-model="activeAnalyticsTab"
                  dense
                  align="justify"
                  narrow-indicator
                >
                  <q-tab name="StreamerInfo" label="Streamer Info" />
                  <q-tab name="TopGames" label="Top Games" />
                  <q-tab name="TopStreams" label="Top Streams" />
                  <q-tab name="FeaturedStreams" label="Featured Streams" />
                </q-tabs>
            </div>
            <div class="row">
              <q-tab-panels v-model="activeAnalyticsTab" class=" bg-secondary" animated>
                  <q-tab-panel name="StreamerInfo">
                      <form autofocus>
                          <div class="row">
                              <div class="column ">
                                <q-input
                                  ref='streamerNameField'
                                  label='Streamer Name'
                                  outlined
                                  dense
                                  dark
                                  color="accent"
                                  bg-color="secondary"
                                  v-model="streamerName"
                                  error-message="Please use minimum of 3 characters."
                                  :error="!isStreamerNameValid"
                                />
                              </div>
                              <div class="column q-ma-xs">
                                <div class="row q-ml-md">
                                    <q-btn
                                      @click="runQueryStreamerInfo"
                                      type="submit"
                                      unelevated
                                      color='positive'
                                      icon="check_circle"
                                      size='sm' />
                                </div>
                              </div>
                          </div>
                      </form>
                      <span v-html="streamerInfo"></span>
                  </q-tab-panel>
                  <q-tab-panel name="TopGames">
                    <form autofocus>
                      <div class="row">
                          <div class="column ">
                            <q-input
                              ref='noOfTopGamesField'
                              label='# of Top Games'
                              type="number"
                              outlined
                              dense
                              dark
                              color="accent"
                              bg-color="secondary"
                              v-model="noOfTopGames"
                              style="width:100px"
                              error-message="Please enter a value between 1 and 100."
                              :error="!isNoOfTopGamesValid"
                            />
                          </div>
                          <div class="column q-ma-xs">
                            <div class="row q-ml-md">
                              <q-btn
                                @click="runQueryTopGames"
                                type="submit"
                                unelevated
                                color='positive'
                                icon="check_circle"
                                size='sm'
                                />
                            </div>
                          </div>
                      </div>
                    </form>
                    <div v-for='element in topGames' v-bind:key='element.id' class="col q-ma-sm">
                      <span v-html="element"></span>
                    </div>
                  </q-tab-panel>

                  <q-tab-panel name="TopStreams">
                   <form autofocus>
                      <div class="row">
                          <div class="column ">
                            <q-input
                              ref='noOfTopStreamsField'
                              label='# of Top Streams'
                              type="number"
                              outlined
                              dense
                              dark
                              color="accent"
                              bg-color="secondary"
                              v-model="noOfTopStreams"
                              style="width:100px"
                              error-message="Please enter a value between 1 and 100."
                              :error="!isNoOfTopStreamsValid"
                            />
                          </div>
                          <div class="column row q-ml-md">
                            <q-input
                              ref='gameNameField'
                              label='Game Name (optional)'
                              outlined
                              dense
                              dark
                              color="accent"
                              bg-color="secondary"
                              v-model="topStreamsGameName"
                            />
                          </div>
                          <div class="column row q-ml-md">
                            <q-input
                              ref='topStreamLanguageField'
                              label='Stream Language (optional)'
                              outlined
                              dense
                              dark
                              color="accent"
                              bg-color="secondary"
                              v-model="topStreamsLanguage"
                            />
                          </div>
                          <div class="column q-ma-xs">
                            <div class="row q-ml-md">
                              <q-btn
                                @click="runQueryTopStreams"
                                type="submit"
                                unelevated
                                color='positive'
                                icon="check_circle"
                                size='sm'
                                />
                            </div>
                          </div>
                      </div>
                    </form>
                    <div v-for='element in topStreams' v-bind:key='element.id' class="col q-ma-sm">
                      <span v-html="element"></span>
                    </div>
                  </q-tab-panel>

                  <q-tab-panel name="FeaturedStreams">
                      <form autofocus>
                          <div class="row">
                            <div class="column ">
                              <q-input
                                ref='noOfFeaturedStreamsField'
                                label='# of Streams'
                                type="number"
                                outlined
                                dense
                                dark
                                color="accent"
                                bg-color="secondary"
                                v-model="noOfFeaturedStreams"
                                style="width:100px"
                                error-message="Please enter a value between 1 and 100."
                                :error="!isNoOfFeaturedStreamsValid"
                              />
                            </div>
                            <div class="column q-ma-xs">
                                <div class="row q-ml-md">
                                    <q-btn
                                      @click="runQueryFeaturedStreamsInfo"
                                      type="submit"
                                      unelevated
                                      color='positive'
                                      icon="check_circle"
                                      size='sm' />
                                </div>
                              </div>
                          </div>
                      </form>
                    <div v-for='element in featuredStreams' v-bind:key='element.id' class="col q-ma-sm">
                      <span v-html="element"></span>
                    </div>
                  </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
        </div>
      </q-page>
</template>

<script>
var twLib = require('src/utils/twitch-utils')
export default {
  name: 'AnalyticsDashboard',
  data () {
    return {
      // Vars go here
      accounts: [],
      streamerInfo: '',
      topGames: [],
      topStreams: [],
      featuredStreams: [],
      streamerName: '',
      gameName: '',
      noOfTopGames: 25,
      noOfTopStreams: 25,
      noOfFeaturedStreams: 25,
      topStreamsGameName: '',
      topStreamsLanguage: 'en',
      localTextColor1: '',
      localTextColor2: '',
      uiEnableDarkMode: false,
      activeAnalyticsTab: 'StreamerInfo',
      queryTypeSelected: ''
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
    if (this.$q.localStorage.getItem('accounts')) {
      try {
        this.accounts = JSON.parse(this.$q.localStorage.getItem('accounts'))
      } catch (e) {
        this.$q.localStorage.remove('accounts')
      }
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
    runQueryStreamerInfo: async function () {
      if (this.$refs.streamerNameField.error === false) {
        this.streamerInfo = ''
        try {
          const userData = await twLib.getUserData(this.streamerName)
          if (userData === null) {
            this.$root.$emit('userNotify', 'User Not Live', 'The streamer you were looking for is not currently live.', 'warning')
          } else {
            this.streamerInfo = 'Name: ' + userData.userName + '<br/>' + 'Game: ' + userData.gameName + '<br/>' + 'Viewers: ' + userData.viewers + '<br/>' + 'Description: ' + userData.channelDescription + '<br/>' + 'LogoURL: ' + userData.channelLogoURL + '<br/>' + 'Stream Preview URL: ' + userData.streamPreviewURL
          }
        } catch (error) {
          this.$root.$emit('userNotify', 'No Data Found', 'The streamer you were looking does not seem to exist.', 'error')
        }
      }
      console.log('run query triggered')
    },
    runQueryTopGames: async function () {
      if (this.$refs.noOfTopGamesField.error === false) {
        this.topGames = []
        try {
          this.topGames = await twLib.getTopGamesInfo(this.noOfTopGames)
        } catch (error) {
          this.$root.$emit('userNotify', 'No Data Found', "There don't seem to be any top games.", 'error')
          console.log('error: ' + error)
        }
      }
    },
    runQueryTopStreams: async function () {
      this.topStreams = []
      try {
        this.topStreams = await twLib.getTopStreamsInfo(this.noOfTopStreams, this.topStreamsGameName, this.topStreamsLanguage)
      } catch (error) {
        this.$root.$emit('userNotify', 'No Data Found', "There don't seem to be any top streams.", 'error')
        console.log('error: ' + error)
      }
    },
    runQueryFeaturedStreamsInfo: async function () {
      this.featuredStreams = []
      try {
        this.featuredStreams = await twLib.getFeaturedStreamsInfo(this.noOfFeaturedStreams)
      } catch (error) {
        this.$root.$emit('userNotify', 'No Data Found', "There don't seem to be any featured streams.", 'error')
        console.log('error: ' + error)
      }
    }
  },
  computed: {
    isStreamerNameValid () {
      if (this.streamerName) {
        return this.streamerName.length >= 3
      } else {
        return false
      }
    },
    isNoOfFeaturedStreamsValid () {
      return this.noOfFeaturedStreams >= 1 && this.noOfFeaturedStreams <= 100
    },
    isNoOfTopGamesValid () {
      return this.noOfTopGames >= 1 && this.noOfTopGames <= 100
    },
    isNoOfTopStreamsValid () {
      return this.noOfTopStreams >= 1 && this.noOfTopStreams <= 100
    }
  }
}
</script>
<style lang="scss">
  .queryDataListStyleDark {
    background: #2F3136
  }
  .queryDataListStyleLight {
    background: #E6EDF2
  }
  .queryDataItemStyleLight:hover {
    background: #D4D6D8;
    color: white
  }
  .queryDataItemStyleDark:hover {
    background: #36393F;
    color: white
  }
</style>
