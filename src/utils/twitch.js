import ax from 'axios'

export default class Twitch {
	constructor (token) {
		ax.defaults.baseURL = 'https://api.twitch.tv/helix'
		this.token = token
		this.axios = ax
	}

	getChannels () {
		return this.axios.get('/games/top', {
			headers: {
				Authorization: 'Bearer ' + this.token,
				'client-id': process.env.TWITCH_CLIENT_ID
			}
		})
	}
}
