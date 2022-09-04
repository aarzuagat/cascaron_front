import security from "src/router/modules/security";
import operations from "src/router/modules/operations";
import incidents from "src/router/modules/incidents";
import tutorial from "src/router/modules/tutorial";

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', name: 'home', component: () => import('pages/Landing/Index')},
      {path: 'stock', name: 'stock', component: () => import('pages/Stock/Stock')},
      ...security,
      ...operations,
      ...incidents,
      ...tutorial
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
