<template>
  <q-page class="flex items-center justify-center">
    <!--   <div class="logoPosition" v-if="this.$q.localStorage.getItem('uiEnableDarkMode')">
          <img alt="NX logo" src="~assets/nexus-logo-neg.png" >
        </div>
        <div class="logoPosition" v-else>
          <img alt="NX logo" src="~assets/nexus-logo-pos.png">
      </div> -->
    <q-scroll-area class="full-width fill-window" >
      <div class="q-pt-sm flex items-center justify-center" v-if="hasConnectedAnyAccount">
        <div class="row">
          <q-card
            v-for='infoBlock in infoBlocks'
            :key='infoBlock.id'
            class="col q-ma-sm bg-blue-grey-8 text-white"
            style="border-radius: 7px; height: 600px; width: 300px; min-width: 300px; max-width: 300px">
            <div v-if="infoBlock.title.length > 3">
              <q-card-section>
                <div class="text-h6">
                  {{ infoBlock.title }}
                </div>
              </q-card-section>
              <div v-if="infoBlock.channelUrl !== '' ">
                <q-card-section class="q-ma-xs cursor-pointer infoBlock">
                  <q-img
                    :src='infoBlock.image'
                    basic
                    @click='imgClicked(infoBlock.channelUrl)'
                  >
                  </q-img>
                </q-card-section>
              </div>
              <div v-else>
                <q-card-section class="q-ma-xs">
                  <q-img
                    :src='infoBlock.image'
                    basic
                    @click='imgClicked(infoBlock.channelUrl)'
                  >
                  </q-img>
                </q-card-section>
              </div>
              <q-card-section class="q-pa-xs q-pl-md">
                <div class="text-h6">
                  {{ infoBlock.subTitle }}
                </div>
                <span v-html="infoBlock.text"></span>
              </q-card-section>
            </div>
          </q-card>
        </div>
      </div>
      <div v-else>
        <div class="text-center full-height flex justify-center">
          <h4>No account attached</h4>
        </div>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script>
var twLib = require('src/utils/twitch-utils')
import { openURL } from 'quasar'

export default {
  name: 'PageIndex',
  data () {
    return {
      topGamesInfo: [],
      topStreamsInfo: [],
      featuredStreamsInfo: [],
      infoBlocks: []
    }
  },
  computed: {
    hasConnectedAnyAccount () {
      return this.$store.getters['accounts/any']
    }
  },
  async mounted () { // This allows you to do stuff 'on page load'
    if (this.hasConnectedAnyAccount) {
      this.showProgressSpinner()
      /** Populte the news items */
      this.topGamesInfo = await twLib.getTopGamesInfo(5)
      for (let index = 0; index < this.topGamesInfo.length; index++) {
        this.infoBlocks.push({
          id: this.createUUID(),
          title: 'Top Game #' + (index + 1),
          subTitle: this.topGamesInfo[index].name,
          image: this.topGamesInfo[index].imgURL,
          channelUrl: '',
          text: '<table><tr><td>Live Channels:</td><td>' + this.topGamesInfo[index].channels + '</td></tr><tr><td>Viewers:</td><td>' + this.topGamesInfo[index].viewers + '</td><td</tr></table>'
        })
      }
      // Start progress indicator
      this.topStreamsInfo = await twLib.getTopStreamsInfo(5)
      for (let index = 0; index < this.topStreamsInfo.length; index++) {
        this.infoBlocks.push({
          id: this.createUUID(),
          title: 'Top Stream #' + (index + 1),
          subTitle: this.topStreamsInfo[index].channelName,
          image: this.topStreamsInfo[index].imgURL,
          channelUrl: this.topStreamsInfo[index].channelUrl,
          text: '<table><tr><td>Game:</td><td>' + this.topStreamsInfo[index].name + '</td></tr><tr><td>Viewers:</td><td>' + this.topStreamsInfo[index].viewers + '</td><td</tr></table'
        })
      }
      this.featuredStreamsInfo = await twLib.getFeaturedStreamsInfo(5)
      for (let index = 0; index < this.featuredStreamsInfo.length; index++) {
        this.infoBlocks.push({
          id: this.createUUID(),
          title: 'Featured Stream #' + (index + 1),
          subTitle: this.featuredStreamsInfo[index].channelName,
          image: this.featuredStreamsInfo[index].imgURL,
          channelUrl: this.featuredStreamsInfo[index].channelUrl,
          text: '<table><tr><td>Game:</td><td>' + this.featuredStreamsInfo[index].name + '</td></tr><tr><td>Viewers:</td><td>' + this.featuredStreamsInfo[index].viewers + '</td><td</tr></table'
        })
      }
    }
    // End progress indicator
    this.hideProgressSpinner()
  },
  methods: {
    createUUID: function () {
      var util = require('src/utils/utility')
      return util.createUUIDv4()
    },
    imgClicked: function (url) {
      if (url !== '') {
        openURL(url)
      }
    }
  }
}
</script>
<style lang="scss">
.fill-window {
  height: calc(100vh - 100px);
}

.logoPosition {
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  z-index: 0;
}

.infoBlock:hover {
  background-color: (var(--q-color-accent))
}

/** The css code below would highlight the image itself */
/* .infoBlock {
    background-color:(var(--q-color-primary))
    &:hover {
      background:rgba($color: #ad2bc4, $alpha: 0.4)
    }
} */
</style>
