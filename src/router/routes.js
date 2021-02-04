const routes = [
	{
		path: '/',
		component: () => import('pages/Index.vue'),
		name: 'dashboard'
	},

	{
		path: '/oauth/success',
		component: () => import('pages/oauth/success'),
		name: 'oauth.success'
	},
	{
		path: '/settings',
		component: () => import('pages/settings/index'),
		children: [
			{
				path: 'accounts',
				component: () => import('pages/settings/accounts'),
				name: 'settings.accounts'
			},
			{
				path: 'appearance',
				component: () => import('pages/settings/appearance'),
				name: 'settings.appearance'
			},
			{
				path: 'notifications',
				component: () => import('pages/settings/notifications'),
				name: 'settings.notifications'
			},
			{
				path: 'connectivity',
				component: () => import('pages/settings/connectivity'),
				name: 'settings.connectivity'
			}
		]
	},
	{
		path: '/home',
		component: () => import('pages/Index.vue')
	},
	{
		path: '/analyticsDashboard',
		component: () => import('pages/AnalyticsDashboard.vue'),
		name: 'analytics.index'
	},

	{
		path: '/planning',
		component: () => import('pages/planning/index'),
		children: [
			{
				path: '',
				component: () => import('pages/planning/content-topics'),
				name: 'planning.content-topics.index'
			}
		]
	},
	{
		path: '/about',
		component: () => import('pages/About.vue'),
		name: 'about'
	},
	{
		path: '/devtools',
		component: () => import('pages/Devtools.vue'),
		children: [
			{
				path: 'debugLog',
				component: () => import('pages/DebugLog.vue'),
				name: 'devtools.debug-log'
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
