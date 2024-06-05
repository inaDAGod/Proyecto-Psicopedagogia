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
  /* Los estilos de los botones se definen en el componente padre */
  </style>
  