<!-- CardActividad.vue -->
<template>
    <div class="actividades">
      <div class="actividad-imagen">
        <img :src="actividad.actividad_src" :alt="actividad.actividad">
      </div>
      <div class="actividad-nombre">
        <button :class="btnClass" @click="toggleInfo">{{ actividad.actividad }}</button>
        <div v-if="expandedInfo" :class="infoClass">
          <p>Fecha: {{ actividad.fecha }}</p>
          <p>Hora: {{ actividad.hora }}</p>
          <p>Ubicación: {{ actividad.ubicacion }}</p>
          <p>Descripción: {{ actividad.descripcion }}</p>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
  import { ref, computed, defineProps } from 'vue';
  
  const props = defineProps({
    actividad: Object,
    tipo: String
  });
  
  const actividad = ref(props.actividad);
  const expandedInfo = ref(false);
  
  const toggleInfo = () => {
    expandedInfo.value = !expandedInfo.value;
  };
  
  // Clase del botón según el tipo de actividad
  const btnClass = computed(() => {
    switch (props.tipo) {
      case 'universidad':
        return 'btn-actividad-universidad';
      case 'departamental':
        return 'btn-actividad-departamental';
      case 'internacional':
        return 'btn-actividad-internacional';
      default:
        return '';
    }
  });
  
  // Clase de información según el tipo de actividad
  const infoClass = computed(() => {
    switch (props.tipo) {
      case 'universidad':
        return 'info-actividad-universidad';
      case 'departamental':
        return 'info-actividad-departamental';
      case 'internacional':
        return 'info-actividad-internacional';
      default:
        return '';
    }
  });
</script>
  
  
  <style scoped>
  /* Estilos específicos para la tarjeta de actividad */

  @import url('/src/assets/interaccion.css');
  .actividades {
    width: 90%;
    margin-bottom: 20px;
    box-sizing: border-box;
  }
  .actividad-imagen img {
    width: 60vh;
    height: 40vh;
    object-fit: cover;
  }
  .actividad-nombre {
    margin-top: 1vh;
  }

  .btn-actividad:hover {
    transform: scale(1.10);
  }
  .info-actividad {
    margin-top: 2vh;
    padding: 2vh;
    background-color: #AAD6FB;
    border-radius: 3vh;
  }
  .info-actividad p {
    font-family: 'Roboto Condensed', 'sans-serif';
    font-size: 2.5vh;
    color: #333333;
    text-align: center;
    align-items: center;
  }
  @media (max-width: 992px) {
    .actividad-imagen img {
      width: 70vw; /* Establece el ancho al 100% */
      height: 50vw; /* Establece la altura a 20vh (puedes ajustar este valor según tus necesidades) */
      object-fit: cover; /* Para mantener la relación de aspecto */
    }
    
    .subtitulo-actividad h1{
      font-size: 1vh;
      color: #FF7001;
      font-family: 'Koulen', 'sans-serif';
      margin-top: 4vh;
    }
  }
  
  @media (max-width: 768px) {
    .subtitulo-actividad h1{
      font-size: 1vh;
      color: #FF7001;
      font-family: 'Koulen', 'sans-serif';
      margin-top: 4vh;
    }
  }
  
  @media (max-width: 576px) {
    .subtitulo-actividad h1{
      font-size: 1vh;
      color: #FF7001;
      font-family: 'Koulen', 'sans-serif';
      margin-top: 4vh;
    }
  }
  </style>
  