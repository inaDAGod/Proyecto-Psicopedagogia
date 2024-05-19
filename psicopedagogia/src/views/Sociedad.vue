<template>
    <div class="paginaInv">
      <h2 class="titleInves">Investigacion <br>Sociedad Científica Estudiantil INPSICOPEDIA</h2>
      <div class="bloque-container">
        <Bloque titulo="¿Quienes somos?" :contenido="sociedad.quienes_somos" fondo="#AAD6FB" />
        <Bloque titulo="¿Desde cuando existimos?" :contenido="sociedad.desdecuando" fondo="#FEF684" />
        <Bloque titulo="¿Quienes forman parte?" :contenido="sociedad.quienes_conforman" fondo="#DBEE96" />
        <Bloque titulo="¿Como unirse?" :contenido="sociedad.como_unirse" fondo="#FFCEE8" />
      </div>
      <div>
        <h3 class="subtitulo">Acciones investigativas</h3>
         <Carrusel :listainvestigaciones = investigaciones />
      </div>
      <div>
        <PieInv />
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
    let  sociedad = ref([]);
    let  investigaciones = ref([]);
    const obtenerSoci = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/sociedad');
        sociedad.value = response.data;
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
  