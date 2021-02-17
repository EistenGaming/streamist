import ax from 'axios'

export default class Youtube {
	constructor (key) {
		this.axios = ax.create({
			baseURL: 'https://www.googleapis.com/youtube/v3',
			params: {
				part: 'snippet',
				key
			}
		})
	}

	getTopGames () {
		return this.axios.get('/search', {
			params: {
				eventType: 'live',
				type: 'video',
				videoCategoryId: 20,
				regionCode: 'US'
			}
		})
	}
}
