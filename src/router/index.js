import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from 'src/store'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

const globalMiddleware = []

const routeMiddleware = resolveMiddleware(
  require.context('./middlewares', false, /.*\.js$/)
)

const router = new VueRouter({
  scrollBehavior: function (to, from, savedPosition) {
    if (savedPosition) { return window.scrollTo({ top: savedPosition.y, behavior: 'smooth' }) } else if (to.hash) {
      return window.scrollTo({ top: document.querySelector(to.hash).offsetTop, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  routes,

  // Leave these as is and change from quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
})

router.beforeEach(beforeEach)
router.afterEach(afterEach)
export default router

async function beforeEach (to, from, next) {
  // Get the matched components and resolve them.

  const components = await resolveComponents(
    router.getMatchedComponents({ ...to })
  )

  if (components.length === 0) {
    return next()
  }

  // Start the loading bar.
  if (components[components.length - 1].loading !== false) {
    // router.app.$nextTick(() => router.app.$loading.start())
  }

  // Get the middleware for all the matched components.
  const middleware = getMiddleware(components)

  // Call each middleware.
  callMiddleware(middleware, to, from, (...args) => {
    // Set the application layout only if "next()" was called with no args.
    if (args.length === 0) {
      store.commit('ui/setLayout', components[0].layout)
      // router.app.setLayout(components[0].layout || '')
    }

    next(...args)
  })
}

async function afterEach (to, from, next) {
  if (store.getters['ui/serverError']) {
    await store.dispatch('ui/clearServerError')
  }

  return next || true
}

async function resolveComponents (components) {
  return await Promise.all(components.map(async component => {
    return typeof component === 'function' ? (await component()).default : component
  }))
}

function getMiddleware (components) {
  const middleware = [...globalMiddleware]

  components.filter(c => c.middleware).forEach(component => {
    if (Array.isArray(component.middleware)) {
      middleware.push(...component.middleware)
    } else {
      middleware.push(component.middleware)
    }
  })
  return middleware
}

function callMiddleware (middleware, to, from, next) {
  const stack = middleware.reverse()

  const _next = (...args) => {
    // Stop if "_next" was called with an argument or the stack is empty.
    if (args.length > 0 || stack.length === 0) {
      if (args.length > 0) {
        // router.app.$loading.finish()
      }

      return next(...args)
    }

    const middleware = stack.pop()

    if (typeof middleware === 'function') {
      middleware(to, from, _next)
    } else if (routeMiddleware[middleware]) {
      routeMiddleware[middleware](to, from, _next)
    } else {
      throw Error(`Undefined middleware [${middleware}]`)
    }
  }

  _next()
}

function resolveMiddleware (requireContext) {
  return requireContext.keys()
    .map(file =>
      [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
    )
    .reduce((guards, [name, guard]) => (
      { ...guards, [name]: guard.default }
    ), {})
}
