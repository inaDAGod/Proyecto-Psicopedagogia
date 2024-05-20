import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/principalAdmi.vue';
import Egresados from '@/views/EgresadosAdmi.vue';
import About from '@/views/Nosotrosadmin.vue';
//import Sociedad from '@/views/Sociedad.vue'
//import Zona from '@/views/investigaciones.vue'
//import Social from '@/views/social.vue'
import Red from '@/views/Red.vue'
//import Publicaciones from '@/views/publicaciones.vue'
import Pregrado from '@/views/Pregradoadmin.vue'
import Postgrado from '@/views/Postgradoadmin.vue'
import Docentes from '@/views/Docentesadmin.vue'

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
    }
    ,
    {
      path: '/docentesadmi',
      name: 'Docentes',
      component: Docentes,
    }
    ,
    {
      path: '/egresadosadmi',
      name: 'Egresados',
      component: Egresados,
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
    
  ],
});

export default router;
