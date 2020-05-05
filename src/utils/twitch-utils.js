import { LocalStorage } from 'quasar'
/* Twitch API Access */

/* connect to Twitch using the client ID and secret */
export function connect () {
  let accounts
  if (LocalStorage.getItem('accounts')) {
    try {
      accounts = JSON.parse(LocalStorage.getItem('accounts'))
    } catch (e) {
      /** TODO: error handling */
    }
  }
  const twAccountData = accounts.find(item => item.type === 'Twitch')
  const Twitch = require('twitch.tv-api')
  const twitch = new Twitch({
    id: twAccountData.id,
    secret: twAccountData.secret
  })
  return twitch
}

/* get info about the gop game */
export async function getTopGameInfo () {
  const twitch = connect()
  const optionalParams = { limit: 1 }
  const topGames = await twitch.getTopGames(optionalParams)
  const gameName = topGames.top[0].game.name
  const gameViewers = topGames.top[0].viewers
  const gameChannels = topGames.top[0].channels
  const gameInfo = await twitch.searchGames(gameName)
  const url = gameInfo.games[0].box.large
  // return url
  return { name: gameName, imgURL: url, viewers: gameViewers, channels: gameChannels }
}

/* get info about the gop stream */
export async function getTopStreamInfo () {
  const twitch = connect()
  const topStreams = await twitch.getTopStreams()
  const gameName = topStreams.streams[0].game
  const channelName = topStreams.streams[0].channel.display_name
  const gameViewers = topStreams.streams[0].viewers
  const gameInfo = await twitch.searchGames(gameName)

  const url = gameInfo.games[0].box.large
  // return url
  return { name: gameName, imgURL: url, viewers: gameViewers, channelName: channelName }
}

/* get info about featured streams */
export async function getFeaturedStreamsInfo (noOfStreams) {
  const twitch = connect()
  const featuredStreams = await twitch.getFeaturedStreams({ limit: noOfStreams })
  const result = []
  for (let index = 0; index < noOfStreams; index++) {
    const gameName = featuredStreams.featured[index].stream.game
    const channelName = featuredStreams.featured[index].stream.channel.display_name
    const gameViewers = featuredStreams.featured[index].stream.viewers
    const url = featuredStreams.featured[index].stream.preview.large
    result.push({ name: gameName, imgURL: url, viewers: gameViewers, channelName: channelName })
  }
  // return url
  return result
}
