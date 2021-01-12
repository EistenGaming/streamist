import { LocalStorage } from 'quasar'

export const state = {
  twitch: null,
  youtube: null,
  facebook: null
}
export const getters = {
  twitch: state => state.twitch,
  youtube: state => state.youtube,
  facebook: state => state.facebook,
  all: state => state,
  any: state => {
    return state.twitch || state.youtube || state.facebook
  }
}

export const mutations = {
  initialize (state) {
    const accounts = JSON.parse(LocalStorage.getItem('accounts'))
    if (!accounts) { return }
    accounts.forEach(acct => {
      if (acct.type === 'Twitch') {
        state.twitch = acct
      }
    })
  }
}

export const actions = {}
