// import { LocalStorage } from 'quasar'

export const state = {
  layout: 'MainLayout',
  dark: false,
  progressSpinner: false

}
export const getters = {
  theme: state => state.theme,
  darkMode: state => state.dark,
  progressSpinner: state => state.progressSpinner
}

export const mutations = {

  setLayout (state, _l = 'MainLayout') {
    state.layout = _l
  },

  toggleDarkMode (state) {
    state.dark = !state.dark
  },

  showProgressSpinner (state) {
    state.progressSpinner = true
  },

  hideProgressSpinner (state) {
    state.progressSpinner = false
  }
}

export const actions = {}
