<template>
    <div class="cuerpo">
      <div class="container">
        <div class="cardsInfo">
          <h2 class="tituloE">Egresados</h2>
          <Cards />
        </div>
        <div class="formAdd">
          <NuevoEgresadoForm /> 
        </div>
      </div>
    </div>

  </template>
  
  <script setup>
  import Cards from '/src/components/EgresadoCarruselAdmi.vue';
  import BotonD from '/src/components/BotonD.vue';
  import NuevoEgresadoForm from '/src/components/FormEgresado.vue';
  import { ref } from 'vue';
  

  </script>
  
  <style scoped>
     @import url('/src/assets/admins.css');
  </style>
  