import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/principalAdmi.vue';
import Egresados from '@/views/EgresadosAdmi.vue';
import About from '@/views/Nosotrosadmin.vue';
import Sociedad from '@/views/SociedadAdmi.vue'
import Zona from '@/views/ZonaAdmi.vue'
//import Social from '@/views/social.vue'
import Red from '@/views/RedAdmi.vue'
//import Publicaciones from '@/views/publicaciones.vue'
//import Pregrado from '@/views/Pregrado.vue'
//import Postgrado from '@/views/Postgrado.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/admi',
      name: 'Home',
      component: Home,
    },
    {
      path: '/redadmi',
      name: 'Red',
      component: Red,
    },
    {
      path: '/aboutadmi',
      name: 'About',
      component: About,
    },
    {
      path: '/egresadosadmi',
      name: 'Egresados',
      component: Egresados,
    },
    {
      path: '/sociedadadmi',
      name: 'Sociedad',
      component: Sociedad,
    },
    {
      path: '/zonaadmi',
      name: 'Zona',
      component: Zona,
    }
    
  ],
});

export default router;
