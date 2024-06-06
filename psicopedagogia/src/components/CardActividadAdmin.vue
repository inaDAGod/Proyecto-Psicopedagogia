<template>
    <div class="actividades">
      <div class="actividad-nombre">
        <div class="info-actividad">
          <img :src="actividad.actividad_src" :alt="actividad.actividad" width="30vh" height="25vh">
          <h1>{{ actividad.actividad }}</h1>
          <button class="boton-editar" @click="$emit('edit-actividad', actividad)"><img src="/src/assets/images/edit.png" width="20vh" height="auto"></button>
          <button class="boton-accion" @click="$emit('delete-actividad', actividad)"><img src="/src/assets/images/trash2.png" width="20vh" height="auto"></button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      actividad: Object
    }
  };
  </script>
  
  <style scoped>
  /* Aquí puedes añadir estilos específicos para el componente Actividad */
  .actividades {
    width: 90%;
    margin-bottom:20px;
    box-sizing: border-box;
    
  }
  .info-actividad img {
    width: 38vh;
    height: 25vh;
    object-fit: cover;
  }
  .info-actividad:hover {
      transform: scale(1.05);
  }
  .info-actividad h1 {
    margin-top: 5%;
    font-size: 1.5vw;
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
    background-color: #f8f8f8;
    border-radius: 3vh;
    width:20vw;
    height: 25vw;
  }
  .info-actividad p {
    font-family: 'Roboto Condensed', 'sans-serif';
    font-size: 2.5vh;
    color: #333333;
    text-align: center;
    align-items: center;
  }
  .acciones-publicacion {
    text-align: center;
    margin-top: 1vh;
  }
  .boton-editar {
    font-size: 100%;
    width: 5vw;
    height: 2.5vw;
    margin-right: 5%;
    margin-bottom: 2vh;
    background-color: #BADF3A;
    border-color: #acacac;
    padding: 0.5vh;
    border-radius: 3vh;
    box-shadow: 0px 0px 10px rgba(82, 218, 89, 0.452);
  }
  .boton-accion {
    font-size: 100%;
    width: 5vw;
    height: 2.5vw;
    margin-right: 5%;
    margin-bottom: 2vh;
    background-color: #FFA198;
    border-color: #acacac;
    padding: 0.5vh;
    border-radius: 3vh;
    box-shadow: 0px 0px 10px rgba(82, 218, 89, 0.452);
  }
  .boton-accion img, .boton-editar img {
    width: 40%; /* Hacer que la imagen ocupe todo el espacio disponible dentro del botón */
    height: auto; /* Mantener la proporción de aspecto */
  }
  @media (max-width: 992px) {
    .info-actividad img {
      width: 55vw;
      height: 35vw;
      object-fit: cover;
    }
    
    .info-actividad h1 {
      font-size: 1vh;
      color: #FF7001;
      margin-top: 4vh;
    }
  }
  
  @media (max-width: 768px) {
    .info-actividad h1 {
      font-size: 1vh;
      color: #FF7001;
      margin-top: 4vh;
    }
  }
  
  @media (max-width: 576px) {
    .info-actividad h1 {
      font-size: 1vh;
      color: #FF7001;
      margin-top: 4vh;
    }
  }
  </style>
  