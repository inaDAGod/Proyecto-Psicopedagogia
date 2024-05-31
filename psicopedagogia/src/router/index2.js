import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/principalAdmi.vue';
import Egresados from '@/views/EgresadosAdmi.vue';
import About from '@/views/Nosotrosadmin.vue';
import Sociedad from '@/views/SociedadAdmi.vue'
import Zona from '@/views/ZonaAdmi.vue'
//import Social from '@/views/social.vue'
import Red from '@/views/RedAdmi.vue'
//import Publicaciones from '@/views/publicaciones.vue'
import Pregrado from '@/views/Formpregrado.vue'
import Postgrado from '@/views/Postgradoadi.vue'
import Docentes from '@/views/Docentesadi.vue'
import Malla from '@/views/Mallaadi.vue'

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
<<<<<<< HEAD
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
=======
      path: '/sociedadadmi',
      name: 'Sociedad',
      component: Sociedad,
    },
    {
      path: '/zonaadmi',
      name: 'Zona',
      component: Zona,
>>>>>>> main
    }
  ],
});

export default router;
