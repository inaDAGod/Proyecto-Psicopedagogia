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
          <button class="b-formna" @click="toggleFormVisibility('formDocElim')">Eliminar</button>
          <!-- FormDocente component -->
          <FormDocElim v-if="showFormDocElim" @closeForm="closeForm('formDocElim')" />
        </div>
      </div>
    </div>

    <div class="docentes-container">
      <div v-for="docente in docentes" :key="docente.id" class="docente-item">
        <div v-html="generateTable(docente)"></div>
        <button class="b-formna" @click="openModifyForm(docente)">Modificar</button>
      </div>
    </div>

    <!-- Modificar FormDocMod component -->
    <FormDocMod v-if="showFormDocMod" @closeForm="closeForm('formDocMod')" :docente="selectedDocente" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import FormDocente from '/src/FormDocente.vue';
import FormDocMod from '/src/FormDocMod.vue';
import FormDocElim from '/src/FormDocElim.vue';

// Define separate reactive variables for each form
const showFormDocente = ref(false);
const showFormDocMod = ref(false);
const showFormDocElim = ref(false);
const selectedDocente = ref(null);

// Function to toggle the visibility of each form based on its name
const toggleFormVisibility = (formName) => {
  if (formName === 'formDocente') {
    showFormDocente.value = !showFormDocente.value;
  } else if (formName === 'formDocMod') {
    showFormDocMod.value = !showFormDocMod.value;
  } else if (formName === 'formDocElim') {
    showFormDocElim.value = !showFormDocElim.value;
  }
};

// Function to close each form based on its name
const closeForm = (formName) => {
  if (formName === 'formDocente') {
    showFormDocente.value = false;
  } else if (formName === 'formDocMod') {
    showFormDocMod.value = false;
  } else if (formName === 'formDocElim') {
    showFormDocElim.value = false;
  }
};

// Function to open the modify form and set the selected docente
const openModifyForm = (docente) => {
  selectedDocente.value = docente;
  showFormDocMod.value = true;
};

// Fetch data from the server
const docentes = ref([]);

const obtenerDocentes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/docentes');
    docentes.value = response.data;
  } catch (error) {
    console.error('Error fetching docentes:', error);
  }
};

onMounted(() => {
  obtenerDocentes();
});

// Function to generate HTML table for docentes
const generateTable = (docente) => {
  const tableHTML = `<center>
    <div class="docentesna">
      <div class="docentes-infona">
        <p><b>${docente.nombre}</b><br><br>
         ${docente.cargo}<br>
         ${docente.correo}<br>
         Dato curioso: ${docente.datoc}</p>
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
