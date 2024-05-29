<template>
    <div id="app" class="container">
      <!-- Use Docentes component -->
      <div style="flex: content;">
      <div class="container_main">
      <div class="column"> 
        <Docentes @closeForm="closeForm('docentes')" />
      </div>
      </div>
      <!-- Use Formpaginanos component -->
      <div class="column"> 
        <Formpaginanos @closeForm="closeForm('formPaginanos')" />
      </div>
    </div></div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Formpaginanos from '/src/FormDocente.vue'; // Adjusted import path
  import Docentes from './Docentesadmin.vue'; // Adjusted import path
  
  // Define a ref to track the visibility of each form
  const showFormDocentes = ref(false);
  const showFormPaginanos = ref(false);
  
  // Method to close a form based on its name
  const closeForm = (formName) => {
    if (formName === 'docentes') {
      showFormDocentes.value = false;
    } else if (formName === 'formPaginanos') {
      showFormPaginanos.value = false;
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
  }
  
  .column {
    flex: 1;
  }
  #app {
  display: flex;
}
.container_main{
    width: 65%;
}
  </style>
  
  