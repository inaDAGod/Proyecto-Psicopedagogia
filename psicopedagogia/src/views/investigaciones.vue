<template>
    <div>
        <h2 class="titleInves">Investigacion <br>Grupo de investigación "Zona de aprendizaje"</h2>
        <div class="bloque-container">
            <Bloque titulo="¿Quienes somos?" :contenido="paginaInvestigaciones.quienes_somos" fondo="#AAD6FB" />
            <Bloque titulo="¿Desde cuando existimos?" :contenido="paginaInvestigaciones.desdecuando" fondo="#FEF684" />
            <Bloque titulo="¿Quienes forman parte?" :contenido="paginaInvestigaciones.quienes_conforman" fondo="#DBEE96" />
            <Bloque titulo="¿Como unirse?" :contenido="paginaInvestigaciones.como_unirse" fondo="#FFCEE8" />

        </div>
        <br>
        <br>
        
        <h3 class="subtitulo"> Acciones investigativas</h3>
        <Carrusel :listainvestigaciones = investigaciones />
       
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Bloque from '/src/components/ParrafoInvestigacion.vue';
import Carrusel from '/src/components/CarruselInv.vue';
const paginaInvestigaciones = ref({});
const investigaciones = ref({});

const obtenerZona = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/investigaciones');
    paginaInvestigaciones.value = response.data;
  } catch (error) {
    console.error('Error fetching investigaciones:', error);
  }
};

const obtenerInvestigaciones = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/zona/investigaciones');
    investigaciones.value = response.data;
  } catch (error) {
    console.error('Error fetching investigaciones:', error);
  }
};

onMounted(() => {
  obtenerZona();
  obtenerInvestigaciones();
});


</script>  
<style scoped>
@import url('/src/assets/sociedad.css');
    
</style>