<template>
    <div id="app">
      <div style="display: flex; align-items: center;">
        <h1>NOSOTROS</h1>
        <div style="display: flex; align-items: center; justify-content: flex-end; flex-grow: 1;">
          <div style="margin:20px;"><a href="#" @click="showModifyInfoPaginaModal = true"><button style="font-size: 36px; width: 100%; padding: 10px;padding-left: 30px;padding-right: 30px; margin-right: 10px;background-color: rgba(255, 42, 157, 1);">Modificar</button></a></div>
        </div>
      </div>
      <div class="video-container">
        <!-- Paste the iframe code here -->
        <iframe :src="paginaNosotros.link_video" frameborder="0" allowfullscreen></iframe>
      </div>
      <div style="display: flex; align-items: center;">
        <h1>NUESTRA FAMILIA</h1>
        <div style="display: flex; align-items: center; justify-content: flex-end; flex-grow: 1;">
          <div style="margin:20px;"><a href="#" @click="showAddDocenteModal = true"><button style="font-size: 36px; width: 100%; padding: 10px;padding-left: 30px;padding-right: 30px; margin-right: 10px;background-color: rgba(255, 42, 157, 1);">Agregar</button></a></div>
          <div style="margin:20px;"><a href="#" @click="showModifyDocenteModal = true"><button style="font-size: 36px; width: 100%; padding: 10px;padding-left: 30px;padding-right: 30px; margin-right: 10px;background-color: rgba(255, 42, 157, 1);">Modificar</button></a></div>
          <div style="margin:20px;"><a href="#" @click="showDeleteDocenteModal = true"><button style="font-size: 36px; width: 100%; padding: 10px;padding-left: 30px;padding-right: 30px; margin-right: 10px;background-color: rgba(255, 42, 157, 1);">Eliminar</button></a></div>
        </div>
      </div>
  
      <div v-for="docente in docentes" :key="docente.id_docente" v-html="generateTable(docente)"></div>
  
      <h1>PROGRAMAS</h1>
      <div style="text-align: center; margin-bottom: 5%">
        <a :href="paginaNosotros.link_soc_cien"><button>Sociedad Científica Estudiantil Inpsicopedia</button></a><br>
        <a :href="paginaNosotros.link_sembrando"><button>Programa “Sembrando Semillas de Paz”</button></a><br>
        <a :href="paginaNosotros.link_psico_ucb"><button>Psicopedagogía La Paz</button></a><br>
      </div>
      
      <footer>
        <img src="/src/assets/images/rocas.png" alt="Image Description" class="footer-img">
        <div class="footer-container">
          <table class="footer-table">
            <tr>
              <td>
                <a :href="paginaNosotros.facebook"><img style="width: 200px;" src="/src/assets/images/facebook.png" alt="Imagen del logo"></a>
              </td>
              <td>
                <p>Psicopedagogía UCB La Paz</p>
              </td>
            </tr>
            <tr>
              <td>
                <a :href="paginaNosotros.insta"><img style="width: 200px;"  src="/src/assets/images/insta.png" alt="Imagen del logo"></a>
              </td>
              <td>
                <p>ucb.psp</p>
              </td>
            </tr>
            <tr>
              <td>
                <a :href="paginaNosotros.youtube"><img style="width: 190px;" src="/src/assets/images/yt.png" alt="Imagen del logo"></a>
              </td>
              <td>
                <p>canal de youtube</p>
              </td>
            </tr>
            <tr>
              <td>
                <a :href="paginaNosotros.tiktok"><img style="width: 200px;" src="/src/assets/images/tiktok.png" alt="Imagen del logo"></a>
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
  
      <!-- Add Docente Modal -->
      <div v-if="showAddDocenteModal">
        <div class="modal">
          <div class="modal-content">
            <span class="close" @click="showAddDocenteModal = false">&times;</span>
            <h2>Agregar Docente</h2>
            <!-- Form to add a docente -->
          </div>
        </div>
      </div>
  
      <!-- Modify Docente Modal -->
      <div v-if="showModifyDocenteModal">
        <div class="modal">
          <div class="modal-content">
            <span class="close" @click="showModifyDocenteModal = false">&times;</span>
            <h2>Modificar Docente</h2>
            <select v-model="selectedDocenteName">
              <option value="">Seleccione un docente</option>
              <option v-for="name in docenteNames" :key="name" :value="name">{{ name }}</option>
            </select>
            <button @click="modifyDocente">Modificar</button>
          </div>
        </div>
      </div>
  
      <!-- Delete Docente Modal -->
      <div v-if="showDeleteDocenteModal">
        <div class="modal">
          <div class="modal-content">
            <span class="close" @click="showDeleteDocenteModal = false">&times;</span>
            <h2>Eliminar Docente</h2>
            <select v-model="selectedDocenteName">
              <option value="">Seleccione un docente</option>
              <option v-for="name in docenteNames" :key="name" :value="name">{{ name }}</option>
            </select>
            <button @click="deleteDocente">Eliminar</button>
          </div>
        </div>
      </div>
  
      <!-- Modify Info Pagina Modal -->
      <div v-if="showModifyInfoPaginaModal">
        <div class="modal">
          <div class="modal-content">
            <span class="close" @click="showModifyInfoPaginaModal = false">&times;</span>
            <h2>Modificar Información de Nosotros</h2>
            <!-- Form to modify info -->
          </div>
        </div>
      </div>
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
  
  // Define a reactive variable to store the list of docente names
  const docenteNames = ref([]);
  
  // Define variables to control the visibility of modals
  const showAddDocenteModal = ref(false);
  const showModifyDocenteModal = ref(false);
  const showDeleteDocenteModal = ref(false);
  const showModifyInfoPaginaModal = ref(false);
  const selectedDocenteName = ref('');
  
  // Function to fetch docentes data from the database
  const obtenerDocentes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/docentes');
      docentes.value = response.data;
      // Populate the list of docente names
      docenteNames.value = response.data.map(docente => docente.nombre);
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
  
  // Function to modify a docente
  const modifyDocente = async () => {
    try {
      const selectedDocente = docentes.value.find(docente => docente.nombre === selectedDocenteName);
      if (selectedDocente) {
        const docenteId = selectedDocente.id_docente;
        // Now you have the ID of the selected docente to use in your modify logic
        // Implement logic to modify the docente using the ID
      }
    } catch (error) {
      console.error('Error modifying docente:', error);
    }
  };
  
  // Function to delete a docente
  const deleteDocente = async () => {
    try {
      const selectedDocente = docentes.value.find(docente => docente.nombre === selectedDocenteName);
      if (selectedDocente) {
        const docenteIdToDelete = selectedDocente.id_docente;
        // Now you have the ID of the selected docente to use in your delete logic
        // Implement logic to delete the docente using the ID
      }
    } catch (error) {
      console.error('Error deleting docente:', error);
    }
  };
  
  // Function to modify info for Nosotros
  const modifyInfoPagina = async () => {
    // Implement logic to modify data for Nosotros
  };
  
  </script>
  
  <style scoped>
  /* Add your CSS styles here */
  .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>
  
<style>
@import url('/src/assets/nosotros.css');

</style>  