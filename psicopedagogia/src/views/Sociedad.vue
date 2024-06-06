<template>
  <div class="paginaInv">
    <h2 class="titleInves">Investigacion <br>Sociedad Científica Estudiantil INPSICOPEDIA</h2>
    
    <div v-for="item in items" :key="item">
      <template v-if="item === 'Acciones investigativas'">
        <div class="acciones">
          <h3 class="subtitulo">Acciones investigativas</h3>
          <br>
          <Carrusel :listainvestigaciones="investigaciones" />
        </div>
      </template>

      <template v-else-if="item === 'Tarjetas informativas'">
        <div class="bloque-container">
          <Bloque titulo="¿Quienes somos?" :contenido="sociedad.quienes_somos" fondo="#AAD6FB" />
          <Bloque titulo="¿Desde cuando existimos?" :contenido="sociedad.desdecuando" fondo="#FEF684" />
          <Bloque titulo="¿Quienes forman parte?" :contenido="sociedad.quienes_conforman" fondo="#DBEE96" />
          <Bloque titulo="¿Como unirse?" :contenido="sociedad.como_unirse" fondo="#FFCEE8" />
        </div>
      </template>
    </div>
    
    <br>
    <br>
    <div>
      <PieInv :face="sociedad.link_face" :contacto="sociedad.contactos" red="Facebook Zona"/>
    </div>
  </div>
</template>

<script setup>
import Bloque from '/src/components/ParrafoInvestigacion.vue';
import Carrusel from '/src/components/CarruselInv.vue';
import PresenteInv from '/src/components/PresenteInvestigacion.vue';
import PieInv from '/src/components/PieInvestigacion.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

let sociedad = ref([]);
let investigaciones = ref({});
let items = ref([]);

const obtenerSoci = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/sociedad');
    sociedad.value = response.data;
    items.value = response.data.order;
  } catch (error) {
    console.error('Error fetching investigaciones:', error);
  }
};

const obtenerInvestigaciones = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/sociedad/investigaciones');
    investigaciones.value = response.data;
  } catch (error) {
    console.error('Error fetching investigaciones:', error);
  }
};

onMounted(() => {
  obtenerSoci();
  obtenerInvestigaciones();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap');
@import url('/src/assets/sociedad.css');
</style>
