<template>
    <div id="app" class="container">
      <!-- Use Docentes component -->
      <div style="flex: content;">
      <div class="container_main">
        <table>
        
        <tr>
          <td style="width: 70%;">
            <Docentes @closeForm="closeForm('docentes')" />
          </td>
          <td style="width: 30%;">
            <Formpaginanos @closeForm="closeForm('formPaginanos')" />
          </td>
        </tr>
      </table>


      </div></div></div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Formpaginanos from '@/components/FormDocente.vue'; // Adjusted import path
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
  .container_main {
    width: 100%; /* Adjusted width */
    display: flex;
    margin-top: -10%;
  }
  </style>
  
  