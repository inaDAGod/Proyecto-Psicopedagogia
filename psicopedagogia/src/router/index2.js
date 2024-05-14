import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/principalAdmi.vue';
import Egresados from '@/views/EgresadosAdmi.vue';
import About from '@/views/Nosotrosadmin.vue';
//import Sociedad from '@/views/Sociedad.vue'
//import Zona from '@/views/investigaciones.vue'
//import Social from '@/views/social.vue'
import Red from '@/views/Red.vue'
//import Publicaciones from '@/views/publicaciones.vue'
//import Pregrado from '@/views/Pregrado.vue'
//import Postgrado from '@/views/Postgrado.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/red',
      name: 'Red',
      component: Red,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    }
    /*
    {
      path: '/investigacion/Sociedad',
      name: 'Sociedad',
      component: Sociedad,
    },
    {
      path: '/investigacion/Zona',
      name: 'Zona',
      component: Zona,
    },
    /*
    {
      path: '/sembrando',
      name: 'Social',
      component: Social,
    },
    /*
    {
      path: '/red',
      name: 'Red',
      component: Red,
    },
    {
      path: '/integra/publicaciones',
      name: 'Publicaciones',
      component: Publicaciones,
    },
    /*{
      path: '/formacion/pregrado',
      name: 'Pregrado',
      component: Pregrado,
    },*/
     /*{
      path: '/formacion/postgrado',
      name: 'Postgrado',
      component: Postgrado,
    },*/
  ],
});

export default router;
