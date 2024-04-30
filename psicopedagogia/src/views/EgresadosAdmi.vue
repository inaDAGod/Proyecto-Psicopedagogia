<template>
    <div class="cuerpo">
      <h2>NUESTROS EGRESADOS</h2>
      <div class="divBoton">
        <BotonD text="Añadir egresado" colorFondo="#FF7001" colorTexto="white" @click="toggleForm" />
      </div>
      <div>
        <Carrusel/>
      </div>
      <NuevoEgresadoForm v-show="showForm" :onclose="toggleForm"/>
    </div>
  </template>
  
  <script setup>
  import Carrusel from '/src/components/EgresadoCarruselAdmi.vue';
  import BotonD from '/src/components/BotonD.vue';
  import NuevoEgresadoForm from '/src/components/FormEgresado.vue';
  import { ref } from 'vue';
  
  const showForm = ref(false);
  
  const toggleForm = () => {
    showForm.value = !showForm.value;
  };

  </script>
  
  <style scoped>
  @import url('/src/assets/egresados.css');
  </style>
  