<template>
    <div id="app">
      <!-- First section: NOSOTROS -->
      
  
      <!-- Second section: NUESTRA FAMILIA -->
      <div style="display: flex; align-items: center;">
        <h1 class="titulo-nos">NUESTRA FAMILIA</h1>
        <div style="display: flex; align-items: center; justify-content: flex-end; flex-grow: 1;">
          <div style="margin:20px;">
            <!-- Button to toggle the FormDocente component -->
            <button class="b-formna" @click="toggleFormVisibility('formDocente')">Agregar</button>
            <!-- FormDocente component -->
            <FormDocente v-if="showFormDocente" @closeForm="closeForm('formDocente')" />
          </div>
          <div style="margin:20px;">
            <!-- Button to toggle the FormDocente component -->
            <button class="b-formna" @click="toggleFormVisibility('formDocMod')">Modificar</button>
            <!-- FormDocente component -->
            <FormDocMod v-if="showFormDocMod" @closeForm="closeForm('formDocMod')" />
          </div>
          <div style="margin:20px;">
            <!-- Button to toggle the FormDocente component -->
            <button class="b-formna" @click="toggleFormVisibility('formDocElim')">Eliminar</button>
            <!-- FormDocente component -->
            <FormDocElim v-if="showFormDocElim" @closeForm="closeForm('formDocElim')" />
          </div>
        </div>
      </div>
  
      
      <div class="docentes-container">
      <div v-for="docente in docentes" :key="docente.id" class="docente-item">
        <div v-html="generateTable(docente)"></div>
      </div>
    </div>
  
      
      
  
      <!-- Footer -->
      
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import Formpaginanos from '/src/Formp.vue';
  import FormDocente from '/src/FormDocente.vue';
  import FormDocMod from '/src/FormDocMod.vue';
  import FormDocElim from '/src/FormDocElim.vue';
  
  // Define separate reactive variables for each form FormDocElim
  const showFormPaginanos = ref(false);
  const showFormDocente = ref(false);
  const showFormDocMod = ref(false);
  const showFormDocElim = ref(false);
  
  // Function to toggle the visibility of each form based on its name
  const toggleFormVisibility = (formName) => {
    if (formName === 'formPaginanos') {
      showFormPaginanos.value = !showFormPaginanos.value;
    } else if (formName === 'formDocente') {
      showFormDocente.value = !showFormDocente.value;
    } else if (formName === 'formDocMod') {
      showFormDocMod.value = !showFormDocMod.value;
    } else if (formName === 'formDocElim') {
      showFormDocElim.value = !showFormDocElim.value;
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
    else if (formName === 'formDocElim') {
      showFormDocElim.value = false;
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
    <div class="docentesna">
      <div class="docentes-infona">
        <p ><b> ${docente.nombre}</b><br><br>
         ${docente.cargo}<br>
         ${docente.correo}<br>
         Dato curioso:
         ${docente.datoc}</p>
      </div>
      <div class="docentes-avatarna">
        <div class="docentes-nicknamena">${docente.apodo}</div>
        <img src="${docente.imagen}" alt="${docente.nombre}" class="docentes-imagena">
      </div>
    </div>
  <center>`;

  return tableHTML;
};
  </script>
  
 
  
  
  
  















  <style>
@import url('/src/assets/nostrosadmin.css');




</style>


