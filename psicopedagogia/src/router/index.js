import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/principal.vue';
import Egresados from '@/views/Egresados.vue';
import About from '@/views/Nosotros.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/egresados',
      name: 'Egresados',
      component: Egresados,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
  ],
});

export default router;
