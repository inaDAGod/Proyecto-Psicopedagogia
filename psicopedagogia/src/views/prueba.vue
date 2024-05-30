<template>
    <div id="app">
      <div class="content-wrapper">
        <div class="main-content">
          <h1 class="titulo-nos">maestria</h1>
          <div class="docentes-container">
            <div v-for="maestria in maestrias" :key="maestria.id" class="docente-item">
              <div v-html="generateTable(maestria)"></div>
              <button class="b-formnad" @click="openModForm(maestria)">Modificar</button>
              <button class="b-formnad" @click="openDelForm(maestria)">Eliminar</button>
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
        <h5 class="maestriadi-head">Título: ${maestria.titulo}</h5><p class="maestria-info p"><b>
        About: ${maestria.about}<br><br>
        Competencia: ${maestria.competencia}<br><br>
        Requisitos: ${maestria.requisitos}<br><br>
        Fecha: ${maestria.fecha}</b></p>
      </div>
      <div class="maestriadi-img">
        <img src="${maestria.img}" alt="${maestria.titulo}" class="maestriadi-image">
      </div>
    </div>
  <center>`;

  return tableHTML;
};
  </script>
  
  <style>
 
 @import url('/src/assets/Postgradoadmi.css');
  
  
  </style>
  