const routes = [
  {
    path: '/',
    component: () => import('pages/Index.vue')
  },
  {
    path: '/settings',
    component: () => import('pages/Settings.vue')
  },
  {
    path: '/home',
    component: () => import('pages/Index.vue')
  },
  {
    path: '/analyticsDashboard',
    component: () => import('pages/AnalyticsDashboard.vue')
  },
  {
    path: '/planning',
    component: () => import('pages/Planning.vue')
  },
  {
    path: '/about',
    component: () => import('pages/About.vue')
  },
  {
    path: '/devtools',
    component: () => import('pages/Devtools.vue'),
    children: [
      {
        path: 'debugLog',
        component: () => import('pages/DebugLog.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
