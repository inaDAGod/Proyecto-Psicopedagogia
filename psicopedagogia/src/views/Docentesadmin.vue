<template>
  <div id="app">
    <div class="content-wrapper">
      <div class="main-content">
        <div style="display: flex; align-items: center;">
          <h1 class="titulo-nos">NUESTRA FAMILIA</h1>
          <div style="display: flex; align-items: center; justify-content: flex-end; flex-grow: 1;">
            <div style="margin:20px;">
              <button class="b-formnad" @click="toggleFormVisibility('formDocMod')">Modificar</button>
              <FormDocMod v-if="showFormDocMod" @closeForm="closeForm('formDocMod')" />
            </div>
            <div style="margin:20px;">
              <button class="b-formnad" @click="toggleFormVisibility('formDocElim')">Eliminar</button>
              <FormDocElim v-if="showFormDocElim" @closeForm="closeForm('formDocElim')" />
            </div>
          </div>
        </div>
        <div class="docentes-container">
          <div v-for="docente in docentes" :key="docente.id" class="docente-item">
            <div v-html="generateTable(docente)"></div>
          </div>
        </div>
      </div>
       
      
    </div>
  </div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import FormDocMod from '/src/FormDocMod.vue';
  import FormDocElim from '/src/FormDocElim.vue';
  import Formpaginanos from '/src/FormDocente.vue';
  
  // Define separate reactive variables for each form FormDocElim
  const showFormPaginanos = ref(false);
  const showFormDocente = ref(false);
  const showFormDocMod = ref(false);
  const showFormDocElim = ref(false);
  
  // Function to toggle the visibility of each form based on its name
  const toggleFormVisibility = (formName) => {
    if (formName === 'formPaginanos') {
      showFormPaginanos.value = !showFormPaginanos.value;
    }else if (formName === 'formDocMod') {
      showFormDocMod.value = !showFormDocMod.value;
    } else if (formName === 'formDocElim') {
      showFormDocElim.value = !showFormDocElim.value;
    }
  };
  
  // Function to close each form based on its name
  const closeForm = (formName) => {
    if (formName === 'formPaginanos') {
      showFormPaginanos.value = false;
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
    <div class="docentesnad">
      <div class="docentes-infonad">
        <p ><b>Nombre: ${docente.nombre}</b><br>Apodo:${docente.apodo}<br>Cargo:
         ${docente.cargo}<br> 
         Correo:${docente.correo}<br>
         Dato curioso:
         ${docente.datoc}</p>
      </div>
      <div class="docentes-avatarnad">
        <img src="${docente.imagen}" alt="${docente.nombre}" class="docentes-imagenad">
      </div>
    </div>
  <center>`;

  return tableHTML;
};
  </script>
  
 
  
  
  
  















  <style>
@import url('/src/assets/nostrosadmin.css');
.docentes-infonad {
  text-align: left;
  margin-left: 7%;
  margin-top: 8%;
}

.docentes-infonad p{
  font-size: 100%;
  font-family: 'Roboto Condensed', sans-serif;
  width: 55%;
}

.docentes-containernad {
  display: flex;
  flex-wrap: wrap;
  
}
  
.docente-itemnad {
  flex-basis: calc(46% - 10px); 
  margin-bottom: 20px; 
}

.docentesnad {
  position: relative;
  background-color: rgba(255, 206, 232, 1);
  border-radius: 40px;
  text-align: center;
  width: 320px;
  display: flex;
  margin-top: 8%;
  margin-bottom: 20px;
  height: 400px;
}



.docentes-avatarnad {
  display: inline-block;
  position: absolute;
  right: 3%; 
  top: 25%; 
}

.docentes-imagenad { 
  border-radius: 50%;
  text-align: right;
  position: relative; 
  z-index: 1; 
  margin-top: -50px; 
  width: 100px;
  height: 100px;
}


.b-formnad {
    font-size: 36px;
    width: 100%;
    padding: 1px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: rgba(255, 42, 157, 1);
    color: white;
    border-radius: 40px;
    border-color: rgb(98, 39, 71);
    left:0;
}
.content-wrapper {
  display: flex
}

.main-content {
  width: 100%; /* Adjust width as needed */
}



</style>


