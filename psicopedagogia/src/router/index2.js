import { createRouter, createWebHistory } from 'vue-router';
import Inicio from '@/views/homeEditar.vue';
import Egresados from '@/views/EgresadosAdmi.vue';
import About from '@/views/Nosotrosadmin.vue';
//import Sociedad from '@/views/Sociedad.vue'
//import Zona from '@/views/investigaciones.vue'
//import Social from '@/views/social.vue'
import Red from '@/views/Red.vue'
import Publicaciones from '@/views/publicacionesadmin.vue'
import InteraccionSocial from'@/views/interaccionadmin.vue'
//import Pregrado from '@/views/Pregrado.vue'
//import Postgrado from '@/views/Postgrado.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/admi',
      name: 'Home',
      component: Inicio,
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
      path: '/publicacionesadmi',
      name: 'Publicaciones',
      component: Publicaciones,
    },
    {
      path: '/interaccionsadmi',
      name: 'InteraccionSocial',
      component: InteraccionSocial,
    }
  ],
});

export default router;
