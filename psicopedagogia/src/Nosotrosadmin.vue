<template>
    <div id="app">
      <!-- First section: NOSOTROS -->
      <div style="display: flex; align-items: center;">
        <h1>NOSOTROS</h1>
        <div style="display: flex; align-items: center; justify-content: flex-end; flex-grow: 1;">
          <div style="margin: 20px;">
            <!-- Button to toggle the Formpaginanos component -->
            <button style="font-size: 36px; width: 100%; padding: 10px;padding-left: 30px;padding-right: 30px; margin-right: 10px;background-color: rgba(255, 42, 157, 1);" @click="toggleFormVisibility('formPaginanos')">Modificar</button>
            <!-- Formpaginanos component -->
            <Formpaginanos v-if="showFormPaginanos" @closeForm="closeForm('formPaginanos')" />
          </div>
        </div>
      </div>
  
      <!-- Video section -->
      <div class="video-container">
        <!-- Paste the iframe code here -->
        <iframe :src="getEmbeddedLink(paginaNosotros.link_video)" frameborder="0" allowfullscreen></iframe>
      </div>
  
      <!-- Second section: NUESTRA FAMILIA -->
      <div style="display: flex; align-items: center;">
        <h1>NUESTRA FAMILIA</h1>
        <div style="display: flex; align-items: center; justify-content: flex-end; flex-grow: 1;">
          <div style="margin:20px;">
            <!-- Button to toggle the FormDocente component -->
            <button style="font-size: 36px; width: 100%; padding: 10px;padding-left: 30px;padding-right: 30px; margin-right: 10px;background-color: rgba(255, 42, 157, 1);" @click="toggleFormVisibility('formDocente')">Agregar</button>
            <!-- FormDocente component -->
            <FormDocente v-if="showFormDocente" @closeForm="closeForm('formDocente')" />
          </div>
          <div style="margin:20px;">
            <!-- Button to toggle the FormDocente component -->
            <button style="font-size: 36px; width: 100%; padding: 10px;padding-left: 30px;padding-right: 30px; margin-right: 10px;background-color: rgba(255, 42, 157, 1);" @click="toggleFormVisibility('formDocMod')">Modificar</button>
            <!-- FormDocente component -->
            <FormDocMod v-if="showFormDocMod" @closeForm="closeForm('formDocMod')" />
          </div>
        </div>
      </div>
  
      <!-- Displaying docentes -->
      <div v-for="docente in docentes" :key="docente.id" v-html="generateTable(docente)"></div>
  
      <!-- Displaying PROGRAMAS -->
      <h1>PROGRAMAS</h1>
      <div style="text-align: center; margin-bottom: 5%">
        <a :href="paginaNosotros.link_soc_cien"><button>Sociedad Científica Estudiantil Inpsicopedia</button></a><br>
        <a :href="paginaNosotros.link_sembrando"><button>Programa “Sembrando Semillas de Paz”</button></a><br>
        <a :href="paginaNosotros.link_psico_ucb"><button>Psicopedagogía La Paz</button></a><br>
      </div>
  
      <!-- Footer -->
      <footer>
        <img src="/src/assets/images/rocas.png" alt="Image Description" class="footer-img">
        <div class="footer-container">
          <table class="footer-table"  style="margin-top: 2px;">
            <tr >
              <td>
                <a :href="paginaNosotros.facebook"><img style="width: 100px;" src="/src/assets/images/facebook.png" alt="Imagen del logo"></a>
              </td>
              <td>
                <p>Psicopedagogía UCB La Paz</p>
              </td>
            </tr>
            <tr>
              <td>
                <a :href="paginaNosotros.insta"><img style="width: 100px;"  src="/src/assets/images/insta.png" alt="Imagen del logo"></a>
              </td>
              <td>
                <p>ucb.psp</p>
              </td>
            </tr>
            <tr>
              <td>
                <a :href="paginaNosotros.youtube"><img style="width: 150px; margin-left:-20px;" src="/src/assets/images/yt.png" alt="Imagen del logo"></a>
              </td>
              <td>
                <p>canal de youtube</p>
              </td>
            </tr>
            <tr>
              <td>
                <a :href="paginaNosotros.tiktok"><img style="width: 100px;" src="/src/assets/images/tiktok.png" alt="Imagen del logo"></a>
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
  import Formpaginanos from './Formp.vue';
  import FormDocente from './FormDocente.vue';
  import FormDocMod from './FormDocMod.vue';
  
  // Define separate reactive variables for each form
  const showFormPaginanos = ref(false);
  const showFormDocente = ref(false);
  const showFormDocMod = ref(false);
  
  // Function to toggle the visibility of each form based on its name
  const toggleFormVisibility = (formName) => {
    if (formName === 'formPaginanos') {
      showFormPaginanos.value = !showFormPaginanos.value;
    } else if (formName === 'formDocente') {
      showFormDocente.value = !showFormDocente.value;
    } else if (formName === 'formDocMod') {
      showFormDocMod.value = !showFormDocMod.value;
    }
  };
  
  // Function to close each form based on its name
  const closeForm = (formName) => {
    if (formName === 'formPaginanos') {
      showFormPaginanos.value = false;
    } else if (formName === 'formDocente') {
      showFormDocente.value = false;
    }
    else if (formName === 'formDocMod') {
      showFormDocMod.value = false;
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



  // Define reactive variables to store data for docentes and paginaNosotros
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


