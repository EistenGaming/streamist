
/* Twitch API Access */

/* connect to Twitch using the client ID and secret */
export function connect (clientID, clientSecret) {
  const Twitch = require('twitch.tv-api')
  const twitch = new Twitch({
    id: clientID,
    secret: clientSecret
  })
  return twitch
}
