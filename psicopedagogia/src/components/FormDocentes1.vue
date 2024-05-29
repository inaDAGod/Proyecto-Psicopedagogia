<template>
    <div class="info-container">
      <div>
        <div class="circle-background"></div>
        <img :src="srcImagen" class="info-img" alt="Docente">
        <div class="info-content">
          <h3 class="nombre-docente">{{ nombre }}</h3>
          <h3>{{ correo }}</h3>
          <h3>Cargo: {{ cargo }}</h3>
          <h3>Dato C: {{ datoc }}</h3>
          <p>{{ comentario }}</p>
          <div class="divBoton">
            <BotonD text="Editar docente" colorFondo="#FF7001" colorTexto="white" @click="toggleForm" />
          </div>
          <DocenteForm v-show="showForm" 
            :onclose="toggleForm"
            :nombre="nombre"
            :apodo="apodo"
            :cargo="cargo"
            :correo="correo"
            :datoc="datoc"
            :index="index"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, ref } from 'vue';
  import BotonD from './BotonD.vue';
  import DocenteForm from './FormEditarDocente.vue';
  const showForm = ref(false);
  
  const toggleForm = () => {
    showForm.value = !showForm.value;
  };
  
  const props = defineProps({
    nombre: String,
    apodo: String,
    cargo: String,
    correo: String,
    datoc: String,
    srcImagen: String,
    index: Number,
  });
  </script>
  
  <style scoped>
  @import url('/src/assets/docentes.css');
  </style>
  