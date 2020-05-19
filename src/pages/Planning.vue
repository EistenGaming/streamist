<template>
      <q-page class="flex flex-start bg-secondary column">
        <q-item-label lines="1" class="q-pa-sm text-h3 text-weight-bold text-uppercase col-1" :style="{ color: localTextColor1 }" >Planning</q-item-label>
        <div style="width:100%" class="q-pa-sm flex items-start" :style="{ color: localTextColor1 }">
          <div style="width:100%" class=" column">
            <div class="row">
              TBD
            </div>
          </div>
        </div>
      </q-page>
</template>

<script>
// var twLib = require('src/utils/twitch-utils')
export default {
  name: 'Planning',
  data () {
    return {
      // Add vars
      localTextColor1: '',
      localTextColor2: ''
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
    // Methods
  },
  computed: {
    // Computed methods
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
