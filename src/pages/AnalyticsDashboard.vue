<template>
      <q-page class="flex flex-start bg-secondary column">
        <q-item-label lines="1" class="q-pa-sm text-body2 text-weight-bold text-uppercase col-1" :style="{ color: localTextColor1 }" >Analytics Dashboard</q-item-label>
        <div style="width:100%" class="q-pa-sm flex items-start" :style="{ color: localTextColor1 }">
          The analytics dashboard goes here :)
        </div>
      </q-page>
</template>

<script>
export default {
  name: 'AnalyticsDashboard',
  data () {
    return {
      // Vars go here
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
