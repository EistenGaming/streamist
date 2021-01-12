// import { LocalStorage } from 'quasar'

export const state = {
  layout: 'MainLayout',
  dark: false

}
export const getters = {
  theme: state => state.theme,
  darkMode: state => state.dark
}

export const mutations = {

  setLayout (state, _l = 'MainLayout') {
    state.layout = _l
  },

  toggleDarkMode (state) {
    state.dark = !state.dark
  }
}

export const actions = {}
