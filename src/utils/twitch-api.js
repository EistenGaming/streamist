/** Imports / Requires */
// const util = require('src/utils/utility')

/**
 * @name TwitchAPI
 * @author Michael 'Zen' Boeni
 * @description : Creates the TwitchAPI class
 * @param {Object<id, secret>} options : passes the client id and secret to the constructor
*/
function TwitchAPI (options) {
  this.id = options.id
  this.secret = options.secret
}

/**
 * @method makeGetRequest
 * @description : makes a well-formed GET request via http or https server
 * @param {String} http : passes an string to our request
 * @returns {Promise.<string, Error>} returns data from an http request;
*/
TwitchAPI.prototype.makeGetRequest = function (http) {
  return new Promise((resolve, reject) => {
    // set the headers in our request
    const headers = {
      'Client-ID': this.id,
      Accept: 'application/vnd.twitchtv.v5+json'
    }
    // use the request module to make a http request
    console.log('Header: ' + headers)
  })
}

/**
 * @method makePostRequest
 * @description : makes a well-formed POST request via http or https server
 * @param {String} http : passes an string to our request
 * @returns {Promise.<string, Error>} returns data from an http request;
*/
TwitchAPI.prototype.makePostRequest = function (http) {
  return new Promise((resolve, reject) => {
    // set the headers in our request
    const headers = {
      'Client-ID': this.id,
      Accept: 'application/vnd.twitchtv.v5+json'
    }
    // use the request module to make a http request
    console.log('Header: ' + headers)
  })
}

module.exports = TwitchAPI
