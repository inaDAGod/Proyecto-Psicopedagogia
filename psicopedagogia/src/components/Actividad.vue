<template>
    <div class="actividades">
      <div class="actividad-imagen">
        <img :src="actividad.actividad_src" :alt="actividad.actividad">
      </div>
      <div class="actividad-nombre">
        <button class="btn-actividad" @click="toggleInfoActividad">{{ actividad.actividad }}</button>
        <div v-if="expanded" class="info-actividad">
          <p>Fecha: {{ actividad.fecha }}</p>
          <p>Hora: {{ actividad.hora }}</p>
          <p>Ubicación: {{ actividad.ubicacion }}</p>
          <p>Descripción: {{ actividad.descripcion }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      actividad: Object
    },
    data() {
      return {
        expanded: false
      };
    },
    methods: {
      toggleInfoActividad() {
        this.expanded = !this.expanded;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Aquí puedes añadir estilos específicos para el componente Actividad */
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
  .btn-actividad {
    color: white;
    font-family: 'Roboto Condensed', sans-serif;
    background-color: #0D89F4;
    border: none;
    cursor: pointer;
    border-radius: 6vh;
    font-size: 3vh;
    padding: 3vh;
    padding-left: 5%;
    padding-right: 5%;
    width: auto;
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
  </style>
  