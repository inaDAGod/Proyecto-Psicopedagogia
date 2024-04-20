<template>
    <div class="cuerpo">
      <h2>NUESTROS EGRESADOS</h2>
      <div class="divBoton">
        <BotonD text="Añadir egresado" colorFondo="#FF7001" colorTexto="white" />
      </div>
      <div>
        <Carrusel/>
      </div>
      
    </div>
  </template>
  
  <script setup>
    import Carrusel from './components/EgresadoCarruselAdmi.vue';
    import BotonD from './components/BotonD.vue';
  </script>
  
  <style scoped>
  @import url('/src/assets/egresados.css');
  </style>
  