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

/* get the image of the gop game */
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
