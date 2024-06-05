<template>
    <div :class="['text-box', bgColor]">
      <div class="text-content">
        <h1>{{ title }}</h1>
        <img :src="imageSrc" class="d-block w-100" :alt="title">
        <p>{{ text }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    title: String,
    imageSrc: String,
    text: String,
    bgColor: String // Clase de fondo para cambiar el color de fondo
  });
  </script>
  
  <style scoped>
  .text-box {
    border-radius: 5vh;
    padding: 5vh;
    margin-top: 5vh;
    margin-bottom: 1vh;
    transition: transform 0.3s ease;
  }
  .text-box:hover {
    transform: scale(1.05); /* Aumenta el tamaño del text box en un 5% cuando el mouse pasa sobre él */
  }
  
  .text-content h1 {
    padding-top: 20px;
    font-family: 'Koulen', sans-serif;
    text-align: center;
    font-size: 3vmax;
  }
  
  .text-content p {
    padding-top: 20px;
    font-family: 'Roboto Condensed', sans-serif;
    text-align: center;
    font-size: 1.7vmax;
  }
  
  .text-content img {
    max-width: 100%;
    height: auto;
    text-align: center;
  }
  
  /* Colores de fondo */
  .bg-mision {
    background-color: #AAD6FB;
  }
  
  .bg-vision {
    background-color: #FEF684;
  }


  @media screen and (max-width: 768px) {
     
    .text-box{
        max-width: 95%; /* Hacer el text box ocupar el ancho completo en pantallas pequeñas */
        margin-left: 0;
        margin-right: 0;
    }
    .text-box img {
        max-width: 100%; /* Hacer el text box ocupar el ancho completo en pantallas pequeñas */
        text-align: center;
    }
    .text-content1 h1 {
        font-size: 2vh; /* Tamaño de fuente más pequeño para adaptarse a pantallas más pequeñas */
        max-width: 100%;
    }

    .text-content p {
        font-size: 1.7vh; /* Tamaño de fuente más pequeño para adaptarse a pantallas más pequeñas */
        max-width: 100%;
    }

    .text-content h1 {
        font-size: 2vh; /* Tamaño de fuente más pequeño para adaptarse a pantallas más pequeñas */
        max-width: 100%;
    }
}
  </style>
  