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
    <div class="cursodi">
      <div class="cursodi-info">
        <h5 class="cursodi-head">Título: ${cursosfc.titulo}</h5><p class="curso-info p"><b>
        About: ${cursosfc.about}<br><br>
        Competencia: ${cursosfc.competencia}<br><br>
        Requisitos: ${cursosfc.requisitos}<br><br>
        Fecha: ${cursosfc.fecha}</b></p>
      </div>
      <div class="cursodi-img">
        <img src="${cursosfc.img}" alt="${cursosfc.titulo}" class="cursodi-image">
      </div>
    </div>
  <center>`;

  return tableHTML;
};
  </script>
  
  <style>
  @import url('/src/assets/Postgradoadmi.css');
  
 
  
  
  
  
  </style>
  