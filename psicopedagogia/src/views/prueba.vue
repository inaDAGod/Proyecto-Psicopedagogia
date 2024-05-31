<template>
    <div id="app">
      <div class="content-wrapper">
        <div class="main-content">
          <h1 style="font-family: 'Koulen';
    font-size: 400%;
    color: rgba(255, 112, 1, 1);
    padding: 2%;" >Diplomados,especialidades y Maestría</h1>
          <div class="docentes-container">
            <div v-for="maestria in maestrias" :key="maestria.id" class="docente-item" style="background-color: rgba(170, 214, 251, 1);margin:2%;border-radius: 20px;">
              <div v-html="generateTable(maestria)"></div>
              
              <button class="b-forma" style="background-color: #FFA198;border-color: #FFA198;margin-right: 20%;" @click="openDelForm(maestria)"><img src="/backend/images/trash2.png" width="28vh" height="auto" style="padding: 2%;"></button>
              <button class="b-forma" style="background-color: #BADF3A;border-color: #BADF3A;" @click="openModForm(maestria)"><img src="/backend/images/edit.png" width="28vh" height="auto" style="padding: 2%"></button>
            </div>
          </div>
          <FormDocMod v-if="showFormDocMod" :maestria="selectedDocente" :showForm="showFormDocMod" @closeForm="closeForm('formDocMod')" />
          <FormDocElim v-if="showFormDocElim" :maestria="selectedDocente" :showForm="showFormDocElim" @closeForm="closeForm('formDocElim')" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import FormDocMod from '/src/components/FormMaestriaMod.vue';
  import FormDocElim from '/src/components/FormMaestriaElim.vue';
  
  const showFormDocMod = ref(false);
  const showFormDocElim = ref(false);
  const maestrias = ref([]);
  const selectedDocente = ref(null);
  
  const obtenerDocentes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/maestria');
      maestrias.value = response.data;
    } catch (error) {
      console.error('Error fetching maestrias:', error);
    }
  };
  
  const openModForm = (maestria) => {
    selectedDocente.value = maestria;
    showFormDocMod.value = true;
  };
  
  const openDelForm = (maestria) => {
    selectedDocente.value = maestria;
    showFormDocElim.value = true;
  };
  
  const closeForm = (formName) => {
    if (formName === 'formDocMod') {
      showFormDocMod.value = false;
    } else if (formName === 'formDocElim') {
      showFormDocElim.value = false;
    }
  };
  
  onMounted(() => {
    obtenerDocentes();
  });
  
  const generateTable  = (maestria) => {
  const tableHTML = `<center>
    <div class="maestriadi">
      <div class="maestriadi-info">
        <img src="${maestria.img}" alt="${maestria.titulo}" class="maestriadi-image">
        <h5 class="maestriadi-head">Título: ${maestria.titulo}</h5><p class="maestria-info p">
        About: ${maestria.about}<br><br>
        Competencia: ${maestria.competencia}<br><br>
        Requisitos: ${maestria.requisitos}<br><br>
        Fecha: ${maestria.fecha}</p>
      </div>
      
    </div>
  <center>`;

  return tableHTML;
};
  </script>
  
  <style>
 
 @import url('/src/assets/Postgradoadmi.css');
 
    .b-forma {
        font-size: 36px;
        width: 32%;
        padding: 1%;
        color: white;
        border-radius: 40px;
        font-size: 150%;
        left:0;
        margin:2%;
        margin-top: -7%;
        padding-left:2% ;
        padding-right:2% ;
    }
    .content-wrapper {
      display: flex
    }
    
    .main-content {
      width: 100%; /* Adjust width as needed */
    }
  
  
  </style>
  