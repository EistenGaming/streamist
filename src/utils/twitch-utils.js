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
export async function getTopGameImageURL () {
  const twitch = connect()
  const optionalParams = { limit: 1 }
  let url
  try {
    const topGames = await twitch.getTopGames(optionalParams)
    console.log(topGames)
    const gameName = topGames.top[0].game.name
    console.log('GameName: ' + gameName)
    const gameInfo = await twitch.searchGames(gameName)
    console.log('GameInfo: ' + gameInfo)
    url = gameInfo.games[0].box.medium
    console.log('URL: ' + url)
  } catch (error) {
    console.log('Could not fetch top game url: ' + error)
  }
  return url
  /*   twitch.getTopGames(optionalParams)
    .then(data => {
      const gameName = data.top[0].game.name
      console.log('Game: ' + gameName)
      twitch.searchGames(gameName)
        .then(gameData => {
          console.log(gameData)
          // console.log('URL:' + gameData.games[0].box.medium)
          return gameData.games[0].box.medium
        })
    })
    .catch(error => {
      console.error(error)
    }) */
}
