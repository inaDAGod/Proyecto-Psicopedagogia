<template>
    <div class="publicacion" v-if="publicacion._id">
      <a :href="publicacion.ruta" target="_blank" rel="noopener noreferrer">
        <div class="publicacion-imagen" @mouseover="aumentarImagen" @mouseleave="reducirImagen">
          <img :src="publicacion.publicacion_src" :alt="publicacion.titulo" :style="{ transform: imagenAgrandada ? 'scale(1.05)' : 'scale(1)' }">
        </div>
      </a>
      <div class="info-publicacion">
        <h1>{{ publicacion.titulo }}</h1>
        <p>Autor: {{ publicacion.autor }}</p>
        <p>Año: {{ publicacion.anio }}</p>
        <p>{{ publicacion.descripcion }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const props = defineProps({
    publicacion: Object // Define la propiedad `publicacion` como un objeto
    });
  const publicacion = ref(props.publicacion);
  const imagenAgrandada = ref(false);
  
  const aumentarImagen = () => {
    imagenAgrandada.value = true;
  };
  
  const reducirImagen = () => {
    imagenAgrandada.value = false;
  };
  </script>
  
  <style scoped>
  .publicacion {
    display: flex;
    margin-top: 3vh;
    margin-bottom: 3vh;
    padding: 1%;
    margin: 2%;
  }
  .publicacion-imagen img {
    width: 15vw;
    height: 25vw;
    margin-right: 2vw;
    transition: transform 0.3s ease; /* Agrega una transición suave */
  }
  
  .info-publicacion {
    flex: 2.5;
  }
  
  .info-publicacion p {
    color: black;
    text-align: left;
    align-items: center;
    font-size: 1.5vw;
    font-family: 'Roboto Condensed', sans-serif;
  }
  
  .info-publicacion h1 {
    color: black;
    text-align: center;
    align-items: center;
    font-size: 4vh;
    font-family: 'Oswald', sans-serif;
  }

  @media (max-width: 768px) {
  .publicaciones {
    flex-direction: column;
    margin: 0;
    padding: 2vw;
  }

  .info-publicacion p {
    font-size: 3vw;
  }

  .info-publicacion h1 {
    font-size: 4.5vw;
  }
  .publicacion-imagen img {
    width: 25vw;
    height: 40vw;
    margin-right: 2vw;
    transition: transform 0.3s ease; /* Agrega una transición suave */
  }
}
  </style>
  