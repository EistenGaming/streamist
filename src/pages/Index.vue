<template>
	<q-page padding>
		<div class="q-px-md" v-if="hasConnectedAnyAccount">
			<h3 class="">Top Games</h3>
			<div class="row q-col-gutter-lg">
				<div
					class="col-12 col-sm-6 col-md-2"
					v-for='(gameCard,index) in api.games.top'
					:key='index'>
					<q-card
						class="bg-transparent shadow-10 game-card full-height"
					>
						<q-card-section class="q-pa-none bg-transparent">
							<div class="game-card-image-wrapper bg-transparent">
								<q-img class="game-card-image bg-transparent" :src="gameCard.image"></q-img>
								<h4 class="q-px-sm q-py-sm">{{ gameCard.name }}</h4>

							</div>
						</q-card-section>
					</q-card>
				</div>
			</div>
			<q-separator class="q-my-lg"></q-separator>
			<h3 class="">Top Streams</h3>
			<div class="row q-col-gutter-lg">
				<div
					class="col-12 col-sm-6 col-md-3"
					v-for='(gameCard,index) in api.streams.top'
					:key='index'>
					<q-card
						class="bg-transparent shadow-10 game-card full-height"
					>
						<q-card-section class="q-pa-none bg-transparent">
							<div class="game-card-image-wrapper bg-transparent">
								<q-img class="game-card-image bg-transparent" :src="gameCard.image"></q-img>
								<h4 class="q-px-sm q-my-xs">{{ gameCard.name }}</h4>
								<div class="q-px-sm q-py-sm">
									<span>
										<q-icon name="mdi-eye"></q-icon>
										{{ gameCard.viewer_count }}
									</span>

									<q-icon name="fab fa-twitch" color="accent" size="lg"></q-icon>
								</div>

							</div>
						</q-card-section>
					</q-card>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="text-center full-height flex justify-center">
				<h4>No account attached</h4>
			</div>
		</div>
	</q-page>
</template>

<script>
import Twitch from 'src/app/api/twitch'
import GameCard from 'src/app/models/GameCard'
import Youtube from 'src/app/api/youtube'

export default {
	name: 'PageIndex',
	data () {
		return {
			youtube: null,
			api: {
				games: {
					top: []
				},
				streams: {
					top: []
				}
			}
		}
	},
	computed: {
		hasConnectedAnyAccount () {
			return this.$store.getters['accounts/any']
		}
	},
	mounted () {
		this.initTwitch()
		// this.initYT()
		const youtube = new Youtube(process.env.YOUTUBE_API_KEY)
		youtube.getTopGames().then(response => {
			const responseData = response.data.items
			responseData.forEach(item => {
				this.api.streams.top.push(new GameCard(item, {
					source: 'youtube'
				}))
			})
		})
		// youtube.get('/videoCategories', { id: 20 }).then((response) => {
		// 	const id = response.data.items[0].snippet.channelId
		// 	youtube.get('/channels', { id })
		// })
	},
	methods: {
		initTwitch () {
			const account = this.$store.getters['accounts/twitch']
			const twitch = new Twitch(account.token)
			twitch.getTopGames({ limit: 6 })
				.then((response) => {
					const responseData = response.data.data
					responseData.forEach(item => {
						this.api.games.top.push(new GameCard(item, {
							source: 'twitch',
							type: 'top-games'
						}))
					})
				})

			twitch.getTopStreams({ limit: 8 })
				.then((response) => {
					const responseData = response.data.data
					responseData.forEach(item => {
						this.api.streams.top.push(new GameCard(item, {
							source: 'twitch',
							type: 'top-streams'
						}))
					})
				})
		},
		initYT () {

		}
	}
}
</script>
<style lang="scss">
.game-card {
	transition: all 0.1s;
	box-sizing: border-box;

	&:hover {
		transform: scale(1.1);
	}
}
</style>
