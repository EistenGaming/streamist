import ax from 'axios'

export default class Twitch {
	constructor (token) {
		this.token = token
		ax.defaults.baseURL = 'https://api.twitch.tv/helix'
		this.axios = ax.create({
			headers: {
				Authorization: 'Bearer ' + this.token,
				'client-id': process.env.TWITCH_CLIENT_ID
			}
		})
	}

	getTopGames ({ limit }) {
		return this.axios.get('/games/top', { params: { first: limit } })
	}

	getTopStreams ({ limit }) {
		return this.axios.get('/streams', { params: { first: limit } })
	}
}
