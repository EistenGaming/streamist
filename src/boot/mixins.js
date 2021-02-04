import Vue from 'vue'
import globalMixin from 'src/mixins/global'

// "async" is optional
export default async () => {
	Vue.mixin(globalMixin)
}
