<template>
    <div id="app">
      <!-- First section: NOSOTROS -->
      <div style="display: flex; align-items: center;">
        <h1 class="titulo-nos">NOSOTROS</h1>
        <div style="display: flex; align-items: center; justify-content: flex-end; flex-grow: 1;">
          <div style="margin: 20px;">
            <!-- Button to toggle the Formpaginanos component -->
            <button class="b-formna" @click="toggleFormVisibility('formPaginanos')">Modificar</button>
            <!-- Formpaginanos component -->
            <Formpaginanos v-if="showFormPaginanos" @closeForm="closeForm('formPaginanos')" />
          </div>
        </div>
      </div>
  
      <!-- Video section -->
      <div class="video-container">
        <!-- Paste the iframe code here -->
        <iframe class="video-nos" :src="getEmbeddedLink(paginaNosotros.link_video)" frameborder="0" allowfullscreen></iframe>
      </div>
  
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
  
      <!-- Displaying PROGRAMAS -->
      <h1 class="titulo-nos">PROGRAMAS</h1>
      <div style="text-align: center; margin-bottom: 5%">
        <a :href="paginaNosotros.link_soc_cien"><button class="b-linksna">Sociedad Científica Estudiantil Inpsicopedia</button></a><br>
        <a :href="paginaNosotros.link_sembrando"><button class="b-linksna">Programa “Sembrando Semillas de Paz”</button></a><br>
        <a :href="paginaNosotros.link_psico_ucb"><button class="b-linksna">Psicopedagogía La Paz</button></a><br>
      </div>
  
      <!-- Footer -->
      <footer>
        <img src="/src/assets/images/rocas.png" alt="Image Description" class="afooternos-img">
        <div class="afooternos-container">
          <table class="afooternos-table">
      <tr class="afooternos-tr">
        <td class="afooternos-td">
          <a :href="paginaNosotros.facebook"><img class="imgnosa" src="/src/assets/images/facebook.png" alt="Imagen del logo"></a>
        </td>
        <td class="afooternos-td">
          <p class="afooternos-p">Psicopedagogía UCB La Paz</p>
        </td>
      </tr>
      <tr class="afooternos-tr">
        <td class="afooternos-td">
          <a :href="paginaNosotros.insta"><img class="imgnosa"   src="/src/assets/images/insta.png" alt="Imagen del logo"></a>
        </td>
        <td class="afooternos-td">
          <p class="afooternos-p">ucb.psp</p>
        </td>
      </tr>
      <tr class="afooternos-tr">
        <td class="afooteros-td">
          <a :href="paginaNosotros.youtube"><img class="imgnosa"  src="/src/assets/images/yt.png" alt="Imagen del logo"></a>
        </td>
        <td class="afooternos-td">
          <p class="afooternos-p">canal de youtube</p>
        </td>
      </tr>
      <tr class="afooternos-tr">
        <td class="afooternos-td">
          <a :href="paginaNosotros.tiktok"><img class="imgnosa"  src="/src/assets/images/tiktok.png" alt="Imagen del logo"></a>
        </td>
        <td class="afooternos-td">
          <p class="afooternos-p">psp.ucb.lapaz</p>
        </td>
      </tr>
    </table>
  
          <div class="afooternos-info">
            <h2 class="afooternos-mainnos">Atención de Dirección de Carrera</h2>
            <p id="direcion">{{ paginaNosotros.attencion_dire }}</p>
          </div>
        </div>
      </footer>
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


