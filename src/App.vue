<template>
  <div id="q-app">
    <component :is="layouts[layout]" :component="layouts[layout]"></component>
  </div>
</template>

<script>
/** Declare the global variables here */
/** TODO: Fix this once global css colors work */
import Vue from 'vue'
import VueGoogleCharts from 'vue-google-charts'

const requireContext = require.context('layouts', false, /.*\.vue$/)

import { mapState } from 'vuex'

Vue.use(VueGoogleCharts)
/*
* Set the App and NXS versions here, until we find a better (automated) solution
*/
Vue.prototype.$appName = 'eg.streamist'
Vue.prototype.$appVersion = '0.6.0'
Vue.prototype.$copyright = 'Copyright (c) 2021 by Michael "Zen" Boeni'

/** Define the DARK UI theme colors */
Vue.prototype.$darkPrimary = '#2F3136'
/** '#364552' */
Vue.prototype.$darkSecondary = '#36393F'
/** '#6A7C89' */
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
	created () {
		this.getLayouts()
	},
	mounted () { // This allows you to do stuff 'on page load'
		if (this.$q.localStorage.getItem('uiEnableDarkMode')) {
			Vue.prototype.$textColor1 = Vue.prototype.$darkTextColor1
			Vue.prototype.$textColor2 = Vue.prototype.$darkTextColor2
		} else {
			Vue.prototype.$textColor1 = Vue.prototype.$lightTextColor1
			Vue.prototype.$textColor2 = Vue.prototype.$lightTextColor2
		}
	},
	data () {
		return {
			layouts: []
		}
	},
	computed: {
		...mapState({
			layout: state => state.ui.layout
		})
	},
	methods: {
		getLayouts () {
			this.layouts = requireContext.keys()
				.map(file =>
					[file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)]
				)
				.reduce((components, [name, component]) => {
					components[name] = component.default
					return components
				}, {})
		}
	}
}
</script>
