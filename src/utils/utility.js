/* NXS utility functions  */

/* Validate a string for valid email format */
export function validateEmail (email) {
  var reg = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/
  if (!reg.test(email)) return false
  return true
}
/* Return a standard v4-compatible UUID */
export function createUUIDv4 () {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
}
/* Return a SHA512 hash of a string in string format (converted from hex) */
export function hashSHA512 (myString) {
  var cjs = require('crypto-js')
  return cjs.SHA512(myString).toString(cjs.enc.Hex)
}
/* Websocket hello world */
export function websocketHelloWorld () {
  const socket = new WebSocket('wss://javascript.info/article/websocket/demo/hello')

  socket.onopen = function (e) {
    socket.send('My name is John')
    console.log('* Connecting to server...')
  }

  socket.onmessage = function (event) {
    console.log('* Message received from server: ' + event.data)
  }

  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log('* Connection closed cleanly, code=' + event.code + ' reason= ' + event.reason)
    } else {
      console.log('* Connection died for some reason...')
    }
  }

  socket.onerror = function (error) {
    console.log('* Connection error: ' + error.message)
  }
}

/* Twitch Messaging Interface */
/* const tmi = require('tmi.js') */
/* twitch api: github.com/stateford/twitch-api */
