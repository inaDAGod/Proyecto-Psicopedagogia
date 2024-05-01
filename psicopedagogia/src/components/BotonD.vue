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
      font-size: 100%;
      width: auto;
      padding-left: 1%;
      padding-right: 1%;
    }
    
    .botonD button:hover {
      opacity: 0.8;
    }
  </style>
  