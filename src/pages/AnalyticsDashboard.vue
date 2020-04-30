<template>
      <q-page class="flex flex-start bg-secondary column">
        <q-item-label lines="1" class="q-pa-sm text-body2 text-weight-bold text-uppercase col-1" :style="{ color: localTextColor1 }" >Analytics Dashboard</q-item-label>
        <div style="width:100%" class="q-pa-sm flex items-start" :style="{ color: localTextColor1 }">
          <div class="column">
            <div class="row q-pb-md">
              <q-item-label class="text-red">Twitch only at this time :)</q-item-label>
            </div>
            <div class="row">
              <form autofocus>
                  <div class="row">
                  <div class="column">
                    <q-select
                      v-model="queryTypeSelected"
                      dark
                      dense
                      bg-color="secondary"
                      outlined
                      :options="queryTypeOptions"
                      style="width:200px"
                    />
                  </div>
                  <div v-if="queryTypeSelected === 'User Data'">
                    <div class="column q-ml-md">
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
                  </div>
                  <div v-if="queryTypeSelected === 'Top Streams'">
                    <div class="column q-ml-md">
                      <q-input
                        ref='gameNameField'
                        label='Game Name (optional)'
                        outlined
                        dense
                        dark
                        color="accent"
                        bg-color="secondary"
                        v-model="gameName"
                      />
                    </div>
                  </div>
                  <div v-if="queryTypeSelected === 'Top Streams'">
                    <div class="column q-ml-md">
                      <q-input
                        ref='streamLanguageField'
                        label='Stream Language (optional)'
                        outlined
                        dense
                        dark
                        color="accent"
                        bg-color="secondary"
                        v-model="streamLanguage"
                      />
                    </div>
                  </div>
                  <div v-if="queryTypeSelected === 'Featured Streams'">
                    <div class="column q-ml-md">
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
                  </div>
                  <div v-if="queryTypeSelected === 'Top Games'">
                    <div class="column q-ml-md">
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
                  </div>
                    <div class="column q-ma-xs">
                      <div class="row q-ml-md">
                          <q-btn @click='cancelQueryButtonPressed' type="reset"  color='negative' icon="cancel" size='sm' />
                          <div class="q-ml-sm"/>
                          <q-btn @click='runQueryButtonPressed' type="submit" unelevated color='positive' icon="check_circle" size='sm' />
                      </div>
                    </div>
                  </div>
              </form>
            </div>
            <div class="row">
              <q-list bordered class="rounded-borders" v-bind:class="{'queryDataListStyleDark':(uiEnableDarkMode === true), 'queryDataListStyleLight':(uiEnableDarkMode !== true) }" >
                <q-item-section>
                  <q-item-label :style="{ color: localTextColor1 }"><span v-html="queryResultRaw"></span></q-item-label>
                </q-item-section>
              </q-list>
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
      queryTypeSelected: 'User Data',
      queryTypeOptions: ['User Data', 'Top Streams', 'Featured Streams', 'Top Games'],
      queryResultRaw: '',
      streamerName: '',
      gameName: '',
      streamLanguage: 'en',
      noOfFeaturedStreams: 5,
      noOfTopGames: 25,
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
    // Methods go here
    runQuery: function () {
      var twitch = twLib.connect()
      /** Handle User Data */
      if (this.queryTypeSelected === 'User Data') {
        if (this.$refs.streamerNameField.error === false) {
          twitch.getUser(this.streamerName)
            .then(data => {
              if (data.stream === null) {
                this.queryResultRaw = 'Streamer not live.'
                console.log(data)
              } else {
                // this.queryResultRaw = data
                this.queryResultRaw = 'Channel: ' + data.stream.channel.name + '<br/>' + 'Channel Description: ' + data.stream.channel.description + '<br/>' + 'Game: ' + data.stream.game + '<br/>' + 'Viewers: ' + data.stream.viewers
                console.log(data)
              }
              return data
            })
            .catch(error => {
              this.queryResultRaw = 'Streamer does not seem to exist. No data found.'
              console.error(error)
            })
        }
      } else if (this.queryTypeSelected === 'Top Streams') {
        const optionalParams = { game: this.gameName, language: this.streamLanguage }
        twitch.getTopStreams(optionalParams)
          .then(data => {
            this.queryResultRaw = data
            console.log(data)
          })
          .catch(error => {
            console.error(error)
          })
      } else if (this.queryTypeSelected === 'Featured Streams') {
        twitch.getFeaturedStreams({ limit: this.noOfFeaturedStreams })
          .then(data => {
            this.queryResultRaw = data
            console.log(data)
          })
          .catch(error => {
            console.error(error)
          })
      } else if (this.queryTypeSelected === 'Top Games') {
        const optionalParams = { limit: this.noOfTopGames }
        twitch.getTopGames(optionalParams)
          .then(data => {
            this.queryResultRaw = data
            console.log(data)
          })
          .catch(error => {
            console.error(error)
          })
      }
    },
    cancelQuery: function () {
      if (this.queryTypeSelected === 'User Data') {
        this.streamerName = ''
        this.$nextTick(this.$refs.streamerNameField.focus())
      } else if (this.queryTypeSelected === 'Top Streams') {
        this.gameName = ''
        this.streamLanguage = 'en'
        this.$nextTick(this.$refs.gameNameField.focus())
      } else if (this.queryTypeSelected === 'Featured Streams') {
        this.noOfFeaturedStreams = 5
        this.$nextTick(this.$refs.noOfFeaturedStreamsField.focus())
      } else if (this.queryTypeSelected === 'Top Games') {
        this.noOfFeaturedStreams = 25
        this.$nextTick(this.$refs.noOfTopGamesField.focus())
      }
    },
    cancelQueryButtonPressed: function () {
      this.cancelQuery()
    },
    runQueryButtonPressed: function () {
      this.runQuery()
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
