<template>
    <div class="cuerpo">
      <div class="container">
        <div class="cardsEgresados">
          <h2 class="tituloE">Egresados</h2>
          <Cards />
        </div>
        <div class="formAddEgresado">
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
      .tituloE{
        color:#FF7001;
        padding: 3%;
        font-size: 250%;
      }
      .container {
        display: flex;
        width: 100%;
      }

      .cardsEgresados {
        flex: 0 0 60%; 
      }

      .formAddEgresado {
        flex: 0 0 40%; /* Ocupa el 40% del ancho */
        background-color: #D9D9D9;
       
      }
  </style>
  