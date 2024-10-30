import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/about' },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('../views/Map.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;