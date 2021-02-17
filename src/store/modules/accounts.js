import { LocalStorage } from 'quasar'

export const state = {
	twitch: null,
	youtube: null,
	facebook: null
}
export const getters = {
	twitch: state => state.twitch,
	youtube: state => state.youtube,
	facebook: state => state.facebook,
	all: state => state,
	any: state => {
		return state.twitch || state.youtube || state.facebook
	}
}

export const mutations = {
	initialize (state) {
		const accounts = LocalStorage.getItem('accounts')
		if (!accounts) {
			return
		}
		Object.keys(accounts).forEach(key => {
			if (key === 'twitch') {
				state.twitch = accounts[key]
			}
		})
	},

	set (state, payload) {
		state[payload.type] = payload.value

		LocalStorage.set('accounts', state)
	},

	logout (state, { service }) {
		state[service] = null
		LocalStorage.set('accounts', state)
	}
}

export const actions = {

	set ({ commit }, payload) {
		commit('set', payload)
	},

	logout ({ commit }, payload) {
		commit('logout', payload)
	}
}
