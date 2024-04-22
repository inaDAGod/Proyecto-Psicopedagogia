<template>
    <div class="info-container">
      <div>
        <div class="circle-background"></div>
        <img :src="srcFoto" class="info-img" alt="Egresado">
        <div class="info-content">
          <h3 class="nombre-egresado">{{ nombre }}</h3>
          <h3>{{ correo }}</h3>
          <h3>Año de graduación: {{ anioGraduacion }}</h3>
          <h3>Trabajo actual: {{ trabajo }}</h3>
          <p>{{ comentario }}</p>
          <div class="divBoton">
            <BotonD text="Editar egresado" colorFondo="#FF7001" colorTexto="white"  @click="toggleForm" />
          </div>
          <EgresadoForm v-show="showForm" :onclose="toggleForm"/>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import BotonD from './BotonD.vue';
  import EgresadoForm from './FormEditarEgresado.vue';
  import { ref } from 'vue';
  const showForm = ref(false);
  
  const toggleForm = () => {
    showForm.value = !showForm.value;
  };
  const props = defineProps({
    nombre: String,
    correo: String,
    anioGraduacion: Number,
    trabajo: String,
    comentario: String,
    srcFoto: String,
    index: Number
  });
  </script>
  
  <style scoped>
  @import url('/./src/assets/egresados.css');
  </style>
  