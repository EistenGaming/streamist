<template>
      <q-page class="flex flex-start bg-secondary column">
        <q-item-label lines="1" class="q-pa-sm text-h3 text-weight-bold text-uppercase col-1" :style="{ color: localTextColor1 }" >Analytics Dashboard</q-item-label>
        <div style="width:100%" class="q-pa-sm flex items-start" :style="{ color: localTextColor1 }">
          <div style="width:100%" class=" column">
            <div class="row">
                <q-tabs
                  v-model="activeAnalyticsTab"
                  dense
                  align="justify"
                  narrow-indicator
                >
                  <q-tab name="TopGames" label="Top Games" />
                  <q-tab name="TopStreams" label="Top Streams" />
                  <q-tab name="FeaturedStreams" label="Featured Streams" />
                  <q-tab name="StreamerInfo" label="Streamer Info" />
                  <q-tab name="GraphTests" label="Graph Tests" />
                </q-tabs>
            </div>
            <div class="row">
              <q-tab-panels v-model="activeAnalyticsTab" class=" bg-secondary" animated>
                  <q-tab-panel name="StreamerInfo">
                      <form @submit.prevent='runQueryStreamerInfo'>
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
                                      type="submit"
                                      unelevated
                                      color='positive'
                                      icon="check_circle"
                                      size='sm' />
                                </div>
                              </div>
                          </div>
                      </form>
                      <div style="width:100%">
                        <div class="row">
                            <div class="column">
                              <q-img
                                :src='streamerInfo.channelLogoURL'
                                style="min-width: 100px; max-width: 100px"
                              />
                            </div>
                            <div class="column">
                              <q-item-label
                              class="q-pa-sm text-h4 text-weight-bold text-uppercase"
                              :style="{ color: localTextColor1 }"
                              >{{streamerInfo.userName}}</q-item-label>
                              <q-item-label
                              class="q-pa-sm text-caption text-weight-bold text-uppercase"
                              :style="{ color: localTextColor1 }"
                              >{{streamerInfo.channelDescription}}</q-item-label>
                            </div>
                            <div class="column">
                            </div>
                        </div>
                        <div class="row">
                          <div class="column q-mt-md">
                            <q-item-label
                              class="q-pa-sm text-h6 text-weight-bold text-uppercase"
                              :style="{ color: localTextColor2 }"
                              >Game: </q-item-label>
                              <q-item-label
                              class="q-pa-sm text-h6 text-weight-bold text-uppercase"
                              :style="{ color: localTextColor2 }"
                              >Viewers: </q-item-label>
                          </div>
                          <div class="column q-mt-md">
                            <q-item-label
                              class="q-pa-sm text-h6 text-weight-bold text-uppercase"
                              :style="{ color: localTextColor1 }"
                            >{{streamerInfo.gameName}}</q-item-label>
                            <q-item-label
                              class="q-pa-sm text-h6 text-weight-bold text-uppercase"
                              :style="{ color: localTextColor1 }"
                            >{{streamerInfo.viewers}}</q-item-label>
                          </div>
                        </div>
                        <div class="row">
                          <q-img class="q-mt-md" :src='streamerInfo.streamPreviewURL' style="min-width: 600px; max-width: 600px"/>
                        </div>
                      </div>
                  </q-tab-panel>
                  <q-tab-panel name="TopGames">
                    <form  @submit.prevent='runQueryTopGames'>
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
                                type="submit"
                                unelevated
                                color='positive'
                                icon="refresh"
                                size='sm'
                                />
                            </div>
                          </div>
                      </div>
                    </form>
                    <div class="row">
                      <div class="column">
                        <q-btn
                          @click="topGamesTalbleView"
                          unelevated
                          color='secondary'
                          icon="list"
                          size='md'
                        />
                      </div>
                      <div class="column q-pl-sm">
                        <q-btn
                          @click="topGamesGridView"
                          unelevated
                          color='secondary'
                          icon="view_comfy"
                          size='md'
                        />
                      </div>
                    </div>
                      <div class="column q-pa-md">

                        <div v-if="topGamesGridMode === false">
                          <q-table
                            dark
                            bordered
                            color="accent"
                            card-class="bg-primary"
                            :style="{ color: localTextColor1 }"
                            title="Top Games"
                            :data="topGames"
                            :columns="topGamesColumns"
                            :pagination.sync="topGamesPagination"
                            row-key="id"
                          >
                            <template v-slot:body-cell-boxShot="boxShot">
                              <q-td :props="boxShot">
                                <div>
                                  <q-img :src='boxShot.value' basic />
                                </div>
                              </q-td>
                            </template>
                          </q-table>
                        </div>
                        <div v-else>
                          <q-table
                            grid
                            dark
                            bordered
                            color="accent"
                            card-class="bg-primary"
                            :style="{ color: localTextColor1 }"
                            title="Top Games"
                            :data="topGames"
                            :columns="topGamesColumns"
                            :pagination.sync="topGamesPaginationGrid"
                            row-key="id"
                          >
                            <template v-slot:item="props">
                              <q-card bordered dark class="q-ma-sm tileBGColor" style="max-width: 300px; min-width: 300px">
                                <div class="q-ma-sm" v-for="col in props.cols" :key="col.id">
                                  <div v-if="col.label === 'Box Shot'">
                                    <q-img :src='col.value' basic />
                                  </div>
                                  <div v-if="col.label === '#'">
                                    <div class="text-h6">
                                      #{{col.value}}
                                    </div>
                                  </div>
                                  <div v-if="col.label === 'Game Name'">
                                    <div class="text-h6">
                                      {{col.value}}
                                    </div>
                                  </div>
                                  <div v-if="col.label === '# of Viewers'">
                                    <div class="row text-h8">
                                      <div class="column col-4">Viewers:</div>
                                      <div class="column">{{col.value}}</div>
                                    </div>
                                  </div>
                                  <div v-if="col.label === '# of Channels'">
                                    <div class="row text-h8">
                                      <div class="column col-4">Channels:</div>
                                      <div class="column">{{col.value}}</div>
                                    </div>
                                  </div>
                                </div>
                              </q-card>
                            </template>
                          </q-table>
                        </div>
                      </div>
                  </q-tab-panel>

                  <q-tab-panel name="TopStreams">
                   <form @submit.prevent='runQueryTopStreams'>
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
                                type="submit"
                                unelevated
                                color='positive'
                                icon="refresh"
                                size='sm'
                                />
                            </div>
                          </div>
                      </div>
                    </form>
                      <div class="column q-pa-md">
                        <q-table
                          dark
                          bordered
                          color="accent"
                          card-class="bg-primary"
                          :style="{ color: localTextColor1 }"
                          title="Top Streams"
                          :data="topStreams"
                          :columns="topStreamsColumns"
                          :pagination.sync="topStreamsPagination"
                          row-key="id"
                          @row-click="topStreamsOnRowClick"
                        >
                          <template v-slot:body-cell-boxShot="boxShot">
                            <q-td :props="boxShot">
                              <div>
                                <q-img
                                  :src='boxShot.value'
                                  basic
                                />
                              </div>
                            </q-td>
                          </template>
                        </q-table>
                      </div>
                  </q-tab-panel>

                  <q-tab-panel name="FeaturedStreams">
                      <form @submit.prevent='runQueryFeaturedStreamsInfo'>
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
                                      type="submit"
                                      unelevated
                                      color='positive'
                                      icon="refresh"
                                      size='sm' />
                                </div>
                              </div>
                          </div>
                      </form>
                      <div class="column q-pa-md">
                        <q-table
                          dark
                          bordered
                          color="accent"
                          card-class="bg-primary"
                          :style="{ color: localTextColor1 }"
                          title="Featured Streams"
                          :data="featuredStreams"
                          :columns="featuredStreamsColumns"
                          :pagination.sync="featuredStreamsPagination"
                          row-key="id"
                          @row-click="featuredStreamsOnRowClick"
                        >
                          <template v-slot:body-cell-streamLogo="streamLogo">
                            <q-td :props="streamLogo">
                              <div>
                                <q-img :src='streamLogo.value' basic />
                              </div>
                            </q-td>
                          </template>
                        </q-table>
                      </div>
                  </q-tab-panel>

                  <q-tab-panel name="GraphTests">
                    <div class="small">
                      <GChart
                        type="ColumnChart"
                        :data="chartData"
                        :options="chartOptions"
                      />
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
import { openURL } from 'quasar'
export default {
  name: 'AnalyticsDashboard',
  data () {
    return {
      chartData: [
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2014', 1000, 400, 200],
        ['2015', 1170, 460, 250],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350]
      ],
      chartOptions: {
        titleTextStyle: { color: '#FFF' },
        width: 600,
        title: 'Hop?',
        subtitle: 'Bof!',
        backgroundColor: { fill: 'transparent' },
        colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
        vAxis: {
          textStyle: { color: '#FFF' },
          titleTextStyle: { color: '#FFF' },
          gridlines: { color: '#787878' }
        },
        hAxis: {
          textStyle: { color: '#FFF' },
          titleTextStyle: { color: '#FFF' }
        },
        legend: {
          textStyle: { color: '#FFF' },
          position: 'bottom'
        }

      },
      topGamesColumns: [
        {
          name: 'index',
          label: '#',
          field: 'index',
          sortable: true
        },
        {
          name: 'boxShot',
          align: 'left',
          label: 'Box Shot',
          field: 'imgURL',
          sortable: false
        },
        { name: 'gameName', align: 'left', label: 'Game Name', field: 'name', sortable: true },
        { name: 'viewers', align: 'right', label: '# of Viewers', field: 'viewers', sortable: true },
        { name: 'channels', aligh: 'right', label: '# of Channels', field: 'channels', sortable: true }
      ],
      topStreamsColumns: [
        {
          name: 'index',
          label: '#',
          field: 'index',
          sortable: true
        },
        {
          name: 'boxShot',
          align: 'left',
          label: 'Box Shot',
          field: 'imgURL',
          sortable: false
        },
        { name: 'channelName', align: 'left', label: 'Channel Name', field: 'channelName', sortable: true },
        { name: 'gameName', align: 'left', label: 'Game Name', field: 'name', sortable: true },
        { name: 'viewers', align: 'right', label: '# of Viewers', field: 'viewers', sortable: true }
      ],
      featuredStreamsColumns: [
        {
          name: 'index',
          label: '#',
          field: 'index',
          sortable: true
        },
        {
          name: 'streamLogo',
          align: 'left',
          label: 'streamLogo',
          field: 'imgURL',
          sortable: false
        },
        { name: 'channelName', align: 'left', label: 'Channel Name', field: 'channelName', sortable: true },
        { name: 'gameName', align: 'left', label: 'Game Name', field: 'name', sortable: true },
        { name: 'viewers', align: 'right', label: '# of Viewers', field: 'viewers', sortable: true }
      ],
      topGamesPagination: {
        sortBy: 'index',
        descending: false,
        page: 1,
        rowsPerPage: 10
      },
      topGamesPaginationGrid: {
        sortBy: 'index',
        descending: false,
        page: 1,
        rowsPerPage: 0
      },
      topStreamsPagination: {
        sortBy: 'index',
        descending: false,
        page: 1,
        rowsPerPage: 10
      },
      featuredStreamsPagination: {
        sortBy: 'index',
        descending: false,
        page: 1,
        rowsPerPage: 10
      },
      accounts: [],
      streamerInfo: '',
      topGames: [],
      topStreams: [],
      featuredStreams: [],
      streamerName: '',
      gameName: '',
      noOfTopGames: 10,
      noOfTopStreams: 10,
      noOfFeaturedStreams: 10,
      topStreamsGameName: '',
      topStreamsLanguage: 'en',
      localTextColor1: '',
      localTextColor2: '',
      uiEnableDarkMode: false,
      activeAnalyticsTab: 'TopGames',
      queryTypeSelected: '',
      topGamesGridMode: true
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
    // Start progress indicator
    this.$root.$emit('showIndeterminateProgress')
    // Run the querys on page load
    this.runQueryTopGames()
    this.runQueryTopStreams()
    this.runQueryFeaturedStreamsInfo()
    // End progress indicator
    this.$root.$emit('showIndeterminateProgress')
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
            this.streamerInfo = userData
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
    },
    topStreamsOnRowClick: function (evt, row) {
      if (row.channelUrl !== '') {
        openURL(row.channelUrl)
      }
    },
    featuredStreamsOnRowClick: function (evt, row) {
      if (row.channelUrl !== '') {
        openURL(row.channelUrl)
      }
    },
    topGamesTalbleView: function () {
      this.topGamesGridMode = false
    },
    topGamesGridView: function () {
      this.topGamesGridMode = true
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
  .tileBGColor {
    background-color:(var(--q-color-primary))
  }
</style>
