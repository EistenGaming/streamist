<template>
  <q-page class="flex items-center justify-center bg-secondary">
<!--   <div class="logoPosition" v-if="this.$q.localStorage.getItem('uiEnableDarkMode')">
      <img alt="NX logo" src="~assets/nexus-logo-neg.png" >
    </div>
    <div class="logoPosition" v-else>
      <img alt="NX logo" src="~assets/nexus-logo-pos.png">
  </div> -->
    <q-scroll-area
      :thumb-style='thumbStyle'
      :content-style='contentStyle'
      :content-active-style='contentActiveStyle'
      style="width: 100%;"
      class="fill-window">
     <div class="q-pt-sm flex items-center justify-center" :style="{ color: localTextColor1 }">
        <div class="row">
            <q-card
            v-for='infoBlock in infoBlocks' v-bind:key='infoBlock.id'
            class="col q-ma-sm tileBGColor"
            style="border-radius: 7px; height: 500px; width: 300px; min-width: 300px; max-width: 300px">
            <div v-if="infoBlock.title.length > 3">
                <q-img
                  :src='infoBlock.image'
                  basic
                >
                </q-img>
              <q-card-section class="q-pa-xs q-pl-md">
                <div class="text-h6">
                  {{infoBlock.title}}
                </div>
                <span v-html="infoBlock.text"></span>
              </q-card-section>
            </div>
            </q-card>
        </div>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script>
var twLib = require('src/utils/twitch-utils')
export default {
  name: 'PageIndex',
  data () {
    return {
      thumbStyle: { right: '4px', borderRadius: '5px', background: 'white', width: '7px', opacity: 0.7 },
      contentStyle: { background: 'sedondary' }, // used when cursor is NOT over chat area
      contentActiveStyle: { background: 'secondary' }, // used when cursor IS over chat area
      localTextColor1: '',
      localTextColor2: '',
      topGameInfo: '',
      infoBlocks: [
        { id: this.createUUID(), image: '', title: '', text: '' },
        { id: this.createUUID(), image: '', title: '', text: '' },
        { id: this.createUUID(), image: '', title: '', text: '' }
      ]
    }
  },
  async mounted () { // This allows you to do stuff 'on page load'
    /** Populte the news items */
    this.topGameInfo = await twLib.getTopGameInfo()
    this.infoBlocks[0] = ({
      id: this.createUUID(),
      image: this.topGameInfo.imgURL,
      title: 'Top Game: ' + this.topGameInfo.name,
      text: 'Number of viewers: ' + '&emsp;' + this.topGameInfo.viewers + '<br/>' + 'Number of channels: ' + '&emsp;' + this.topGameInfo.channels
    })

    if (this.$q.localStorage.getItem('uiEnableDarkMode')) {
      this.localTextColor1 = this.$darkTextColor1
      this.localTextColor2 = this.$darkTextColor2
    } else {
      this.localTextColor1 = this.$lightTextColor1
      this.localTextColor2 = this.$lightTextColor2
    }
  },
  methods: {
    createUUID: function () {
      var util = require('src/utils/utility')
      return util.createUUIDv4()
    }
  }
}
</script>
<style lang="scss">
  .fill-window {
    height: calc(100vh - 100px);
  }
  .tileBGColor {
    background-color:(var(--q-color-primary))
  }
  .logoPosition {
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  z-index: 0;
}
</style>
