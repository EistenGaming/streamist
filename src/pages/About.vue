<template>
  <q-page class="bg-secondary">
    <div style="width:100%" class="q-pa-sm flex items-center justify-center" :style="{ color: localTextColor1 }">
        <q-card
        class="col q-ma-sm bg-grey-10"
        style="border-radius: 7px; height: 600px; width: 500px; min-width: 500px; max-width: 500px">
            <q-img
            :src='aboutInfo.image'
            basic
            :ratio="3"
            >
            </q-img>
            <q-card-section class="text-light-blue-4">
                <div class="text-h6 q-gutter-sm q-ml-xs">About</div>
                <div class="text-caption q-gutter-sm q-ml-xs">{{$appName}} {{$appVersion}}</div>
            </q-card-section>
            <q-separator class="bg-secondary"/>
            <q-card-section class="q-mt-xs flex justify-center">
            {{$copyright}}
            </q-card-section>
            <q-separator class="bg-secondary"/>
            <q-card-section class="q-mt-xs">
                <div v-html="aboutInfo.aboutText"/>
            </q-card-section>
            <q-separator class="bg-secondary"/>
            <q-scroll-area
                :thumb-style='thumbStyle'
                :content-style='contentStyle'
                :content-active-style='contentActiveStyle'
                style='height: 240px;'
            >
                <q-card-section class="q-mt-xs">
                <div v-html="aboutInfo.changelog"/>
                </q-card-section>
            </q-scroll-area>
        </q-card>
    </div>
  </q-page>
</template>

<script>
var util = require('src/utils/utility')
export default {
  name: 'DevTools',
  data () {
    return {
      // Vars go here
      localTextColor1: '',
      localTextColor2: '',
      uiEnableDarkMode: false,
      aboutInfo: {
        id: util.createUUIDv4(),
        image: 'https://nxs.blackzendo.com/wp-content/uploads/2019/12/iStock-162685822-scaled.jpg',
        aboutText: 'PLACEHOLDER: This is the ABOUT part of the info',
        changelog: '<p style="color: #76FF03"><strong>NEW FEATURES</strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p style="color: #FF7043"><strong>FIXES</strong></p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      thumbStyle: { right: '4px', borderRadius: '5px', background: 'white', width: '7px', opacity: 0.7 },
      contentStyle: { background: 'sedondary' }, // used when cursor is NOT over chat area
      contentActiveStyle: { background: 'secondary' } // used when cursor IS over chat area

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
  }
}
</script>
<style lang="scss">
</style>
