
import { createRouter, createWebHistory } from 'vue-router';
import Inicio from '@/views/homeEditar.vue';
import Egresados from '@/views/EgresadosAdmi.vue';
import About from '@/views/Nosotrosadmin.vue';
import Sociedad from '@/views/SociedadAdmi.vue';
import Zona from '@/views/ZonaAdmi.vue';
import Red from '@/views/RedAdmi.vue';
import Publicaciones from '@/views/publicacionesadmin.vue';
import InteraccionSocial from'@/views/interaccionadmin.vue';
import Noticias from'@/views/actividades_noticiasadmin.vue';
import Pregrado from '@/views/Formpregrado.vue'
import Postgrado from '@/views/Postgradoadi.vue'
import Docentes from '@/views/Docentesadi.vue'
import Malla from '@/views/Mallaadi.vue'
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
    },
    {
      path: '/noticiasadmi',
      name: 'Noticias',
      component: Noticias,
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
    },
    {
      path: '/postgradoadmi',
      name: 'Postgrado',
      component: Postgrado,
    }
    ,
    {
      path: '/pregradoadmi',
      name: 'Pregrado',
      component: Pregrado,
    }
    ,
    {
      path: '/mallaadmi',
      name: 'Malla',
      component: Malla,
    }

  ],
});

export default router;