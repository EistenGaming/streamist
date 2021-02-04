<template>
	<q-page class="flex items-center justify-center">
		<q-scroll-area class="full-width fill-window">
			<div class="q-px-md" v-if="hasConnectedAnyAccount">
				<h1 class="text-center">Twitch Helix API works !!</h1>
				<div class="row q-col-gutter-md">
					<div
						class="col-12 col-sm-6 col-md-3"
						v-for='( infoBlock, index ) in infoBlocks'
						:key='index'>
						<q-card

							class="bg-blue-grey-8 shadow-5 text-white"
						>
							<div class="" v-if="infoBlock.title.length > 3">
								<q-card-section>
									<div class="text-h6">
										{{ infoBlock.title }}
									</div>
								</q-card-section>
								<div v-if="infoBlock.channelUrl !== '' ">
									<q-card-section class="q-ma-xs cursor-pointer infoBlock">
										<q-img
											:src='infoBlock.image'
											basic
											@click='imgClicked(infoBlock.channelUrl)'
										>
										</q-img>
									</q-card-section>
								</div>
								<div v-else>
									<q-card-section class="q-ma-xs">
										<q-img
											:src='infoBlock.image'
											basic
											@click='imgClicked(infoBlock.channelUrl)'
										>
										</q-img>
									</q-card-section>
								</div>
								<q-card-section class="q-pa-xs q-pl-md">
									<div class="text-h6">
										{{ infoBlock.subTitle }}
									</div>
									<span v-html="infoBlock.text"></span>
								</q-card-section>
							</div>
						</q-card>
					</div>

				</div>
			</div>
			<div v-else>
				<div class="text-center full-height flex justify-center">
					<h4>No account attached</h4>
				</div>
			</div>
		</q-scroll-area>
	</q-page>
</template>

<script>
import Twitch from 'src/utils/twitch'
import { openURL } from 'quasar'

export default {
	name: 'PageIndex',
	data () {
		return {
			topGamesInfo: [],
			topStreamsInfo: [],
			featuredStreamsInfo: [],
			infoBlocks: []
		}
	},
	computed: {
		hasConnectedAnyAccount () {
			return this.$store.getters['accounts/any']
		}
	},
	created () {
		const account = this.$store.getters['accounts/twitch']
		console.log(account);
		const twitch = new Twitch(account.token)
		twitch.getChannels()
			.then((response) => {
				console.log(response.data)
			})
			.catch(() => {})
			.finally(() => {})
	},
	methods: {
		imgClicked: function (url) {
			if (url !== '') {
				openURL(url)
			}
		}
	}
}
</script>
<style lang="scss">
.fill-window {
	height: calc(100vh - 100px);
}

.logoPosition {
	position: absolute;
	text-align: center;
	top: 50%;
	transform: translateY(-50%);
	z-index: 0;
}

.infoBlock:hover {
	background-color: (var(--q-color-accent))
}

/** The css code below would highlight the image itself */
/* .infoBlock {
    background-color:(var(--q-color-primary))
    &:hover {
      background:rgba($color: #ad2bc4, $alpha: 0.4)
    }
} */
</style>
