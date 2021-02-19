export default class GameCard {
	constructor (item, {
		source,
		type
	}) {
		if (source === 'twitch') {
			this.setTwitchResource(item, type)
		}
		if (source === 'youtube') {
			this.setYoutubeResource(item, type)
		}
	}

	setTwitchResource (item, type) {
		this.type = 'twitch'
		if (type === 'top-games') {
			this.id = item.id
			this.name = item.name
			this.image = item.box_art_url.replace('{width}', 0).replace('{height}', 0)
		} else if (type === 'top-streams') {
			this.id = item.id
			this.name = item.game_name
			this.viewer_count = item.viewer_count
			this.image = item.thumbnail_url.replace('{width}', 0).replace('{height}', 0)
		}
	}

	setYoutubeResource (item, type) {
		this.type = 'youtube'
		this.id = item.id.videoId
		this.name = item.snippet.title
		this.image = item.snippet.thumbnails.high.url
	}
}
