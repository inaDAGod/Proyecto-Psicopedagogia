<template>
    <div id="app">
      <!-- Button to modify page links -->
      <button @click="showModifyPageLinksModal = true">Modify Page Links</button>
  
      <!-- Button to add a docente -->
      <button @click="showAddDocenteModal = true">Add Docente</button>
  
      <!-- Button to modify a docente -->
      <button @click="showModifyDocenteModal = true">Modify Docente</button>
  
      <!-- Button to delete a docente -->
      <button @click="showDeleteDocenteModal = true">Delete Docente</button>
  
      <!-- Modify Page Links Modal -->
      <div v-if="showModifyPageLinksModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="showModifyPageLinksModal = false">&times;</span>
          <!-- Form fields for modifying page links -->
          <input type="text" v-model="newPageLinks.link_video" placeholder="Link Video">
          <input type="text" v-model="newPageLinks.link_soc_cien" placeholder="Link Soc Cien">
          <input type="text" v-model="newPageLinks.link_sembrando" placeholder="Link Sembrando">
          <input type="text" v-model="newPageLinks.link_psico_ucb" placeholder="Link Psico UCB">
          <input type="text" v-model="newPageLinks.facebook" placeholder="Facebook">
          <input type="text" v-model="newPageLinks.insta" placeholder="Insta">
          <input type="text" v-model="newPageLinks.youtube" placeholder="Youtube">
          <input type="text" v-model="newPageLinks.tiktok" placeholder="Tiktok">
          <textarea v-model="newPageLinks.attencion_dire" placeholder="Atención Dirección"></textarea>
          <button @click="modifyPageLinks">Save Changes</button>
        </div>
      </div>
  
      <!-- Add Docente Modal -->
      <div v-if="showAddDocenteModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="showAddDocenteModal = false">&times;</span>
          <!-- Form fields for adding a docente -->
        </div>
      </div>
  
      <!-- Modify Docente Modal -->
      <div v-if="showModifyDocenteModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="showModifyDocenteModal = false">&times;</span>
          <!-- Form fields for modifying a docente -->
        </div>
      </div>
  
      <!-- Delete Docente Modal -->
      <div v-if="showDeleteDocenteModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="showDeleteDocenteModal = false">&times;</span>
          <!-- Form fields for deleting a docente -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        showModifyPageLinksModal: false,
        showAddDocenteModal: false,
        showModifyDocenteModal: false,
        showDeleteDocenteModal: false,
        newPageLinks: {
          link_video: '',
          link_soc_cien: '',
          link_sembrando: '',
          link_psico_ucb: '',
          facebook: '',
          insta: '',
          youtube: '',
          tiktok: '',
          attencion_dire: ''
        },
      };
    },
    methods: {
      async modifyPageLinks() {
        try {
          await axios.put('http://localhost:3000/api/info-pagina', this.newPageLinks);
          // Optionally, you can handle success (e.g., show a success message)
          console.log('Page links modified successfully');
          this.showModifyPageLinksModal = false;
        } catch (error) {
          console.error('Error modifying page links:', error);
          // Optionally, you can handle errors (e.g., show an error message)
        }
      },
      async addDocente(docenteData) {
  try {
    await axios.post('http://localhost:3000/api/docentes', docenteData);
    // Optionally, you can handle success (e.g., show a success message)
    console.log('Docente added successfully');
    this.showAddDocenteModal = false;
  } catch (error) {
    console.error('Error adding docente:', error);
    // Optionally, you can handle errors (e.g., show an error message)
  }
},

async modifyDocente(docenteId, docenteData) {
  try {
    await axios.put(`http://localhost:3000/api/docentes/${docenteId}`, docenteData);
    // Optionally, you can handle success (e.g., show a success message)
    console.log('Docente modified successfully');
    this.showModifyDocenteModal = false;
  } catch (error) {
    console.error('Error modifying docente:', error);
    // Optionally, you can handle errors (e.g., show an error message)
  }
},

async deleteDocente(docenteId) {
  try {
    await axios.delete(`http://localhost:3000/api/docentes/${docenteId}`);
    // Optionally, you can handle success (e.g., show a success message)
    console.log('Docente deleted successfully');
    this.showDeleteDocenteModal = false;
  } catch (error) {
    console.error('Error deleting docente:', error);
    // Optionally, you can handle errors (e.g., show an error message)
  }
},
    },
  };
  </script>
  
  <style scoped>
  /* Add your CSS styles for modals here */
  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
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
  