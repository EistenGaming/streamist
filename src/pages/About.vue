<template>
  <q-page class="site-bg">
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
        image: 'https://pbs.twimg.com/profile_banners/1228420911734366211/1588544940/600x200',
        aboutText: '',
        changelog: '<p style="color: #EEEEFF"><strong>MIT License</strong></p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software  and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p> <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>'
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
