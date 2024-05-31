<template>
    <div id="app">
      <div class="content-wrapper">
        <div class="main-content">
          <h1 class="titulo-nos">Formacion Continua</h1>
          <div class="docentes-container">
            <div v-for="cursosfc in cursosfcs" :key="cursosfc.id" class="docente-item" style="margin:2%;border-radius: 20px;background-color: rgba(219, 238, 150, 1);">
              <div v-html="generateTable(cursosfc)"></div>
              <button class="b-formca"  style="background-color: #FFA198;border-color: #FFA198;margin-right: 20%;"  @click="openDelForm(cursosfc)"><img src="/backend/images/trash2.png" width="28vh" height="auto" style="padding: 2%;"></button>
            
              <button class="b-formca"  style="background-color: #BADF3A;border-color: #BADF3A;" @click="openModForm(cursosfc)"><img src="/backend/images/edit.png" width="28vh" height="auto" style="padding: 2%"></button>
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
    <div class="cursodi">
        
      
      <div class="cursodi-info">
        <img src="${cursosfc.img}" alt="${cursosfc.titulo}" class="cursodi-image">
        <h5 class="cursodi-head">Título: ${cursosfc.titulo}</h5><p class="curso-info p">
        About: ${cursosfc.about}<br><br>
        Competencia: ${cursosfc.competencia}<br><br>
        Requisitos: ${cursosfc.requisitos}<br><br>
        Fecha: ${cursosfc.fecha}</p>
      </div>
      
    </div>
  <center>`;

  return tableHTML;
};
  </script>
  
  <style>
  @import url('/src/assets/Postgradoadmi.css');
  
 
  
  .b-formca {
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
  
  
  </style>
  