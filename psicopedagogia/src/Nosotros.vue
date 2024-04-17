<template>
  <div id="app">
    
    
    <h1>NOSOTROS</h1>
    <div class="video-container">
      <!-- Paste the iframe code here -->
      <iframe :src="paginaNosotros.link_video" frameborder="0" allowfullscreen></iframe>
    </div>

    <h1>NUESTRA FAMILIA</h1>

    <div v-for="docente in docentes" :key="docente.id" v-html="generateTable(docente)"></div>

    <h1>PROGRAMAS</h1>
    <div style="text-align: center; margin-bottom: 5%">
      <a :href="paginaNosotros.link_soc_cien"><button>Sociedad Científica Estudiantil Inpsicopedia</button></a><br>
      <a :href="paginaNosotros.link_sembrando"><button>Programa “Sembrando Semillas de Paz”</button></a><br>
      <a :href="paginaNosotros.link_psico_ucb"><button>Psicopedagogía La Paz</button></a><br>
    </div>
    
    <footer>
      <img src="/src/assets/imagen/rocas.png" alt="Image Description" class="footer-img">
  <div class="footer-container">
    <table class="footer-table">
      <tr>
        <td>
          <a :href="paginaNosotros.facebook"><img style="width: 200px;" src="/src/assets/imagen/facebook.png" alt="Imagen del logo"></a>
        </td>
        <td>
          <p>Psicopedagogía UCB La Paz</p>
        </td>
      </tr>
      <tr>
        <td>
          <a :href="paginaNosotros.insta"><img style="width: 200px;"  src="/src/assets/imagen/insta.png" alt="Imagen del logo"></a>
        </td>
        <td>
          <p>ucb.psp</p>
        </td>
      </tr>
      <tr>
        <td>
          <a :href="paginaNosotros.youtube"><img style="width: 190px;" src="/src/assets/imagen/yt.png" alt="Imagen del logo"></a>
        </td>
        <td>
          <p>canal de youtube</p>
        </td>
      </tr>
      <tr>
        <td>
          <a :href="paginaNosotros.tiktok"><img style="width: 200px;" src="/src/assets/imagen/tiktok.png" alt="Imagen del logo"></a>
        </td>
        <td>
          <p>psp.ucb.lapaz</p>
        </td>
      </tr>
    </table>
    
    <div class="footer-info">
      <h2>Atención de Dirección de Carrera</h2>
      <p id="direcion">{{ paginaNosotros.attencion_dire }}</p>
    </div>
  </div>
</footer>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Define the reactive variables to store data for docentes and paginaNosotros
const docentes = ref([]);
const paginaNosotros = ref({
  link_video: '',
  link_soc_cien: '',
  link_sembrando: '',
  link_psico_ucb: '',
  facebook: '',
  insta: '',
  youtube: '',
  tiktok: '',
  attencion_dire: ''
});

// Function to fetch docentes data from the database
const obtenerDocentes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/docentes');
    docentes.value = response.data;
  } catch (error) {
    console.error('Error fetching docentes:', error);
  }
};

// Function to fetch paginaNosotros data from the database
const obtenerInfoPagina = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/info-pagina');
    paginaNosotros.value = response.data;
  } catch (error) {
    console.error('Error fetching paginaNosotros data:', error);
  }
};

// Call the functions to fetch data when the component is mounted
onMounted(() => {
  obtenerDocentes();
  obtenerInfoPagina();
});

// Function to generate HTML table for docentes
const generateTable = (docente) => {
  const tableHTML = `<center>
    <div class="docentes">
      <div class="docentes-info">
        <p >Nombre: ${docente.nombre}<br><br>
        Cargo: ${docente.cargo}<br><br>
        Correo: ${docente.correo}<br><br>
        Descripción: ${docente.datoc}</p>
      </div>
      <div class="docentes-avatar">
        <div class="docentes-nickname">${docente.apodo}</div>
        <img src="${docente.imagen}" alt="${docente.nombre}" class="docentes-image">
      </div>
    </div>
  <center>`;

  return tableHTML;
};
</script>
<style>
@import url('/src/assets/nosotros.css');

</style>