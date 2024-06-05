<template>
  <div id="app">
    
    
    <h1 class="titulo-nos">NOSOTROS</h1>
    <div class="video-container">
      <!-- Paste the iframe code here -->
      <iframe class="video-nos" :src="getEmbeddedLink(paginaNosotros.link_video)" frameborder="0" allowfullscreen></iframe>
    </div>

    <h1 class="titulo-nos">NUESTRA FAMILIA</h1>

    

    <div class="docentes-container">
      <div v-for="docente in docentes" :key="docente.id" class="docente-item">
        <div v-html="generateTable(docente)"></div>
      </div>
    </div>

    <h1 class="titulo-nos">PROGRAMAS</h1>
    <div style="text-align: center; margin-bottom: 5%">
      <a :href="paginaNosotros.link_soc_cien"><button class="b-links">Sociedad Científica Estudiantil Inpsicopedia</button></a><br>
      <a :href="paginaNosotros.link_sembrando"><button class="b-links">Programa “Sembrando Semillas de Paz”</button></a><br>
      <a :href="paginaNosotros.link_psico_ucb"><button class="b-links">Psicopedagogía La Paz</button></a><br>
    </div>
    
    <footer class="footernos" style="background-color:  rgba(170, 214, 251, 1)">
        
        <div class="footernos-container">
          <div>
          <table class="footernos-table">
            
              <img src="/src/assets/images/rocas.png" alt="Image Description" class="footernos-img">
          

      <tr class="footernos-tr" >
        <td class="footernos-td">
          <a :href="paginaNosotros.facebook"><img style="margin-top: 10%;" class="imgnos" src="/src/assets/images/facebook.png" alt="Imagen del logo"></a>
        </td>
        <td class="footernos-td2">
          <p class="footernos-p" style="margin-top: 10%;">Psicopedagogía UCB La Paz</p>
        </td>
      </tr>
      <tr class="footernos-tr">
        <td class="footernos-td">
          <a :href="paginaNosotros.insta"><img class="imgnos"   src="/src/assets/images/insta.png" alt="Imagen del logo"></a>
        </td>
        <td class="footernos-td">
          <p class="footernos-p">ucb.psp</p>
        </td>
      </tr>
      <tr class="footernos-tr">
        <td class="footeros-td">
          <a :href="paginaNosotros.youtube"><img class="imgnos"  src="/src/assets/images/yt.png" alt="Imagen del logo"></a>
        </td>
        <td class="footernos-td">
          <p class="footernos-p">canal de youtube</p>
        </td>
      </tr>
      <tr class="footernos-tr">
        <td class="footernos-td">
          <a :href="paginaNosotros.tiktok"><img class="imgnos"  src="/src/assets/images/tiktok.png" alt="Imagen del logo"></a>
        </td>
        <td class="footernos-td">
          <p class="footernos-p">psp.ucb.lapaz</p>
        </td>
      </tr>
    
    </table></div>
  
          <div class="footernos-info">
            <h2 class="footernos-mainnos">Atención de Dirección de Carrera</h2>
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


const getEmbeddedLink = (link) => {
  // Verifica si el enlace es del formato "watch" y lo convierte a "embed"
  if (link.includes('youtube.com/watch')) {
    const videoId = link.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  // Si el enlace ya está en formato "embed", devuelve el mismo enlace
  return link;
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
        <p ><b> ${docente.nombre}</b><br><br>
         ${docente.cargo}<br>

         <u>${docente.correo}</u><br>
         Dato curioso:
         ${docente.datoc}</p>
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
<style scoped>
@import url('/src/assets/nosotros.css');




</style>