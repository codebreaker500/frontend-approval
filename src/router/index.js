import AppLayoutVue from '@/views/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/',
      component: AppLayoutVue,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: () => import('@/views/HomeView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/transactions/deposito',
          name: 'deposito',
          component: () => import('@/views/transactions/DepositoView.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const jwtToken = localStorage.getItem('jwtToken'); 

  if (to.meta.requiresAuth && !jwtToken) {
    next({ name: 'login' });
  } else if (to.name === 'login' && jwtToken) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;
