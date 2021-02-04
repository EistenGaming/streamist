export default {
	methods: {
		showProgressSpinner () {
			this.$store.commit('ui/showProgressSpinner')
		},
		hideProgressSpinner () {
			this.$store.commit('ui/hideProgressSpinner')
		}
	}
}
