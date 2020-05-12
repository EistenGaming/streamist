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
export async function getTopGamesInfo (noOfGames) {
  const twitch = connect()
  const result = []
  console.log('top games limit: ' + noOfGames)
  const topGames = await twitch.getTopGames({ limit: +noOfGames + 1 })
  console.log(topGames)
  for (let index = 0; index < noOfGames; index++) {
    if (topGames.top[index] !== '') {
      const id = topGames.top[index].game._id
      const gameName = topGames.top[index].game.name
      const gameViewers = topGames.top[index].viewers
      const gameChannels = topGames.top[index].channels
      const gameInfo = await twitch.searchGames(gameName)
      const imgUrl = gameInfo.games[0].box.large
      result.push({ id: id, index: index + 1, name: gameName, imgURL: imgUrl, viewers: gameViewers, channels: gameChannels })
    }
  }
  return result
}
/* get info about the gop stream */
export async function getTopStreamsInfo (noOfStreams, gameName, streamLanguage) {
  const twitch = connect()
  const topStreams = await twitch.getTopStreams({ limit: noOfStreams, game: gameName, language: streamLanguage })
  console.log(topStreams)
  const result = []
  for (let index = 0; index < noOfStreams; index++) {
    if (topStreams.streams[index].game !== '') {
      const id = topStreams.streams[index]._id
      const gameName = topStreams.streams[index].game
      const channelName = topStreams.streams[index].channel.display_name
      const gameViewers = topStreams.streams[index].viewers
      const gameInfo = await twitch.searchGames(gameName)
      const channelUrl = topStreams.streams[index].channel.url
      const imgUrl = gameInfo.games[0].box.large
      result.push({ id: id, index: index + 1, name: gameName, imgURL: imgUrl, channelUrl: channelUrl, viewers: gameViewers, channelName: channelName })
    }
  }
  return result
}

/* get info about featured streams */
export async function getFeaturedStreamsInfo (noOfStreams) {
  const twitch = connect()
  const featuredStreams = await twitch.getFeaturedStreams({ limit: noOfStreams })
  console.log(featuredStreams)
  const result = []
  for (let index = 0; index < noOfStreams; index++) {
    const id = featuredStreams.featured[index].stream._id
    const gameName = featuredStreams.featured[index].stream.game
    const channelName = featuredStreams.featured[index].stream.channel.display_name
    const gameViewers = featuredStreams.featured[index].stream.viewers
    const imgUrl = featuredStreams.featured[index].stream.preview.large
    const channelUrl = featuredStreams.featured[index].stream.channel.url
    result.push({ id: id, index: index + 1, name: gameName, imgURL: imgUrl, channelUrl: channelUrl, viewers: gameViewers, channelName: channelName })
  }
  return result
}

/** Get data about a specific streamer (needs to be live) */
export async function getUserData (userName) {
  const twitch = connect()
  const userData = await twitch.getUser(userName)
  let result = null
  if (userData.stream !== null) {
    result = { userName: userData.stream.channel.name, gameName: userData.stream.game, viewers: userData.stream.viewers, channelDescription: userData.stream.channel.description, channelLogoURL: userData.stream.channel.logo, streamPreviewURL: userData.stream.preview.large }
  }
  return result
}
