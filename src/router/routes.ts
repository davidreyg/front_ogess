import { guest, auth } from 'src/core/middlewares';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/core/layouts/MainLayout.vue'),
    meta: { middleware: [auth] },
    children: [
      { path: '', component: () => import('src/core/pages/IndexPage.vue') },
      {
        path: 'persona',
        name: 'persona',
        component: () => import('../persona/PersonaMain.vue'),
        children: [
          {
            path: '',
            name: 'persona.index',
            component: () => import('../persona/pages/PersonaIndex.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('src/auth/pages/LoginPage.vue'),
    meta: { middleware: [guest] },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/core/pages/ErrorNotFound.vue'),
  },
];

export default routes;
