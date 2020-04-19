<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
/** Declare the global variables here */
/** TODO: Fix this once global css colors work */
import Vue from 'vue'
/*
* Set the App and NXS versions here, until we find a better (automated) solution
*/
Vue.prototype.$appName = 'NX Client'
Vue.prototype.$nxsVersion = '0.9'
Vue.prototype.$nxsServerVersion = '0.1'
Vue.prototype.$appVersion = '1.0'
Vue.prototype.$copyright = 'Copyright (c) 2019 - 2020 by Blackzendo AG'

/** Define the DARK UI theme colors */
Vue.prototype.$darkPrimary = '#364552'
Vue.prototype.$darkSecondary = '#6A7C89'
Vue.prototype.$darkAccent = '#ad2bc4'
Vue.prototype.$darkPositive = '#21BA45'
Vue.prototype.$darkNegative = '#e84a3f'
Vue.prototype.$darkInfo = '#31CCEC'
Vue.prototype.$darkWarning = '#F2C037'
Vue.prototype.$darkTextColor1 = '#d1dae0'
Vue.prototype.$darkTextColor2 = '#a8b3ba'

/** Define the LIGHT UI theme colors */
Vue.prototype.$lightPrimary = '#e6edf2'
Vue.prototype.$lightSecondary = '#c0c9cf'
Vue.prototype.$lightAccent = '#ad2bc4'
Vue.prototype.$lightPositive = '#21BA45'
Vue.prototype.$lightNegative = '#e84a3f'
Vue.prototype.$lightInfo = '#31CCEC'
Vue.prototype.$lightWarning = '#F2C037'
Vue.prototype.$lightTextColor1 = '#6A7C89'
Vue.prototype.$lightTextColor2 = '#364552'
/** Global vars end */

export default {
  name: 'App',
  mounted () { // This allows you to do stuff 'on page load'
    if (this.$q.localStorage.getItem('uiEnableDarkMode')) {
      Vue.prototype.$textColor1 = Vue.prototype.$darkTextColor1
      Vue.prototype.$textColor2 = Vue.prototype.$darkTextColor2
    } else {
      Vue.prototype.$textColor1 = Vue.prototype.$lightTextColor1
      Vue.prototype.$textColor2 = Vue.prototype.$lightTextColor2
    }
  }
}
</script>
