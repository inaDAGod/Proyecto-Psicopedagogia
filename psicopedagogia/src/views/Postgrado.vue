<template>
    <div id="app">
      
      
      <h2 class="titulo-pos2">POSTGRADO</h2>
      <br>
  
      <div class="container-pos">
        <h1 class="titulo-pos" style="text-align: left;">Diplomados,especialidades y Maestría</h1>
      <br>
    <div class="maestrias-container">
      <div v-for="maestria in maestrias" :key="maestria.id_pos" class="maestria-item">
        <div v-html="generateMaestriaTable(maestria)"></div>
      </div>
    </div>

   <br><br><br>
   <h1 class="titulo-pos" style="text-align: left;">Formacion Continua</h1>
      <br>
    <div class="cursos-container">
      <div v-for="curso in cursos" :key="curso.id_cur" class="curso-item">
        <div v-html="generateCursoTable(curso)"></div>
      </div>
    </div>
  </div>

  
      
  
      </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Reactive variables to store fetched data
const cursos = ref([]);
const maestrias = ref([]);

// Function to fetch data for Maestrias
const obtenerMaestrias = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/maestria');
    maestrias.value = response.data;
  } catch (error) {
    console.error('Error fetching maestrias:', error);
  }
};
const obtenerCursos = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/cursoscf'); // Corregido el nombre de la ruta
    cursos.value = response.data;
  } catch (error) {
    console.error('Error fetching cursos:', error);
  }
};




// Call the functions to fetch data when the component is mounted
onMounted(() => {
  obtenerMaestrias();
  obtenerCursos();
});

// Function to generate HTML table for Maestrias
const generateMaestriaTable = (maestria) => {
  const tableHTML = `<center>
    <div class="maestria">
      <div class="maestria-info">
        <h5 class="maestria-head">Título: ${maestria.titulo}</h5><p class="maestria-info p"><b>
        About: ${maestria.about}<br><br>
        Competencia: ${maestria.competencia}<br><br>
        Requisitos: ${maestria.requisitos}<br><br>
        Fecha: ${maestria.fecha}</b></p>
      </div>
      <div class="maestria-img">
        <img src="${maestria.img}" alt="${maestria.titulo}" class="maestria-image">
      </div>
    </div>
  <center>`;

  return tableHTML;
};

// Function to generate HTML table for Cursos Continuos
const generateCursoTable = (curso) => {
  const tableHTML = `<center>
    <div class="curso">
        <div class="curso-img">
        <img src="${curso.img}" alt="${curso.titulo}" class="curso-image">
      </div>
      <div class="curso-info">
        <h4 class="curso-head"> ${curso.titulo}<h4>
            <p class="curso-info p">
        About: ${curso.about}<br><br>
        Competencia: ${curso.competencia}<br><br>
        Requisitos: ${curso.requisitos}<br><br>
        Fecha: ${curso.fecha}</p>
      </div>
      
    </div>
  <center>`;

  return tableHTML;
};
</script>
  <style>
  @import url('/src/assets/Postgrado.css');
  
  
  
  
  </style>