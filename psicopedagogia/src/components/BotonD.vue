<template>
  <div class="botonD">
    <button :style="{ backgroundColor: colorFondo, color: colorTexto }" >{{ text }}</button>
  </div>
   
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    text: String,
    colorFondo: String,
    colorTexto: String,
  });
  </script>
  
  <style scoped>
  .botonD button{
      border: none;
      border-radius: 40px;
      cursor: pointer;
      height: 50px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); 
      font-size: 120%;
      width: 40%;
    }
    
    .botonD button:hover {
      opacity: 0.8;
    }
  </style>
  