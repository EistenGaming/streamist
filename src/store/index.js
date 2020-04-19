import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import appState from './app_state'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      appState
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./app_state'], () => {
      const newAppState = require('./app_state').default
      Store.hotUpdate({ modules: { appState: newAppState } })
    })
  }

  return Store
}
