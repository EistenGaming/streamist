import Vue from 'vue'
import Toasted from 'vue-toasted/'

export default async () => {
	const vue = new Vue()
	Vue.use(Toasted, {
		position: vue.$q.platform.is.mobile ? 'bottom-center' : 'bottom-right',
		duration: 3000,
		action: [
			{
				icon: 'close',
				onClick: (e, toastObject) => {
					toastObject.goAway(0)
				}
			}
		]
	})
}
