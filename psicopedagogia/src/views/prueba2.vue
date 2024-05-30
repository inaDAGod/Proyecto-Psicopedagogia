<template>
    <div id="app">
      <div class="content-wrapper">
        <div class="main-content">
          <h1 class="titulo-nos">Cursos</h1>
          <div class="docentes-container">
            <div v-for="cursosfc in cursosfcs" :key="cursosfc.id" class="docente-item">
              <div v-html="generateTable(cursosfc)"></div>
              <button class="b-formnad" @click="openModForm(cursosfc)">Modificar</button>
              <button class="b-formnad" @click="openDelForm(cursosfc)">Eliminar</button>
            </div>
          </div>
          <FormDocMod v-if="showFormDocMod" :cursosfc="selectedDocente" :showForm="showFormDocMod" @closeForm="closeForm('formDocMod')" />
          <FormDocElim v-if="showFormDocElim" :cursosfc="selectedDocente" :showForm="showFormDocElim" @closeForm="closeForm('formDocElim')" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import FormDocMod from '/src/components/FormCursoMod.vue';
  import FormDocElim from '/src/components/FormCursoElim.vue';
  
  const showFormDocMod = ref(false);
  const showFormDocElim = ref(false);
  const cursosfcs = ref([]);
  const selectedDocente = ref(null);
  
  const obtenerDocentes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/cursosfc');
      cursosfcs.value = response.data;
    } catch (error) {
      console.error('Error fetching cursosfcs:', error);
    }
  };
  
  const openModForm = (cursosfc) => {
    selectedDocente.value = cursosfc;
    showFormDocMod.value = true;
  };
  
  const openDelForm = (cursosfc) => {
    selectedDocente.value = cursosfc;
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
  
  const generateTable  = (cursosfc) => {
  const tableHTML = `<center>
    <div class="maestria">
      <div class="maestria-info">
        <h5 class="maestria-head">Título: ${cursosfc.titulo}</h5><p class="maestria-info p"><b>
        About: ${cursosfc.about}<br><br>
        Competencia: ${cursosfc.competencia}<br><br>
        Requisitos: ${cursosfc.requisitos}<br><br>
        Fecha: ${cursosfc.fecha}</b></p>
      </div>
      <div class="maestria-img">
        <img src="${cursosfc.img}" alt="${cursosfc.titulo}" class="maestria-image">
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
  