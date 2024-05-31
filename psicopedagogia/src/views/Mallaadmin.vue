<template>
    <div id="app">
      <div class="content-wrapper">
        <div class="main-content">
          <h1 class="titulo-nos">Malla</h1>
          <div class="docentes-container">
            <div v-for="semestre in semestres" :key="semestre.id" class="docente-item">
              <div v-html="generateTable(semestre)"></div>
              <button class="b-formnad" style="background-color: #5BA45A;border-color: #5BA45A;" @click="openModForm(semestre)">Modificar</button>
              <button class="b-formnad" style="background-color: #DF351B;border-color: #DF351B;" @click="openDelForm(semestre)">Eliminar</button>
            </div>
          </div>
          <FormDocMod v-if="showFormDocMod" :semestre="selectedDocente" :showForm="showFormDocMod" @closeForm="closeForm('formDocMod')" />
          <FormDocElim v-if="showFormDocElim" :semestre="selectedDocente" :showForm="showFormDocElim" @closeForm="closeForm('formDocElim')" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import FormDocMod from '/src/components/FormMallaMod.vue';
  import FormDocElim from '/src/components/FormMallaElim.vue';
  
  const showFormDocMod = ref(false);
  const showFormDocElim = ref(false);
  const semestres = ref([]);
  const selectedDocente = ref(null);
  
  const obtenerDocentes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/semestre');
      semestres.value = response.data;
    } catch (error) {
      console.error('Error fetching docentes:', error);
    }
  };
  
  const openModForm = (semestre) => {
    selectedDocente.value = semestre;
    showFormDocMod.value = true;
  };
  
  const openDelForm = (semestre) => {
    selectedDocente.value = semestre;
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
  
  const generateTable = (semestre) => {
    const tableHTML = `<center>
      <div class="docentesnad">
        <div class="docentes-infonad">
          <p><b>Semestre: ${semestre.semestre}</b><br>Area:${semestre.area}<br>Sigla: ${semestre.sigla}<br> 
            Materia:${semestre.materia}<br>Requisito:${semestre.requisito}<br>Description:${semestre.descrip}</p>
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
      padding: 2%;
      margin-top: 8%;
  }
  
  .docentes-infonad p{
    font-size: 100%;
      font-family: 'Roboto Condensed', sans-serif;
      width: 100%;
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
      height: 120%;
  }
  
  
  
  .docentes-imagenad { 
    border-radius: 20px;
      z-index: 1; 
      width: 100%;
      height: 40%;
      padding-bottom: 2%;
  }
  
  
  .b-formnad {
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
  