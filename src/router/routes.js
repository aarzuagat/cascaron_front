import security from "src/router/modules/security";

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', name: 'home', component: () => import('pages/Landing/Index')},
      {path: 'stock', name: 'stock', component: () => import('pages/Stock/Stock')},
      ...security
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
