import security from "src/router/modules/security";
import operations from "src/router/modules/operations";

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', name: 'home', component: () => import('pages/Landing/Index')},
      {path: 'stock', name: 'stock', component: () => import('pages/Stock/Stock')},
      ...security,
      ...operations
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
