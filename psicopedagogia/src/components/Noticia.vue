<template>
    <div class="noticia">
      <div class="noticia-contenido">
        <img :src="noticia.noticia_src" :alt="noticia.noticia" width="30vh" height="25vh">
        <h1>{{ noticia.noticia }}</h1>
        <button class="boton-editar" @click="$emit('edit-actividad', noticia)"><img src="/src/assets/images/edit.png" width="20vh" height="auto"></button>
        <button class="boton-accion" @click="$emit('delete-actividad', noticia)"><img src="/src/assets/images/trash2.png" width="20vh" height="auto"></button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      noticia: Object
    },
  };
  </script>
  
  <style scoped>
  /* Aquí puedes añadir estilos específicos para el componente Noticia */
  .noticia {
    width: 90%;
    margin-bottom: 20px;
    box-sizing: border-box;
  }
  .noticia-contenido h1{
    margin-top: 5%;
    font-size: 1.5vw;
  }
  .noticia-contenido{
    margin-top: 2vh;
    padding: 2vh;
    background-color: #f8f8f8;
    border-radius: 3vh;
    width:20vw;
  }
  .noticia-contenido:hover {
    transform: scale(1.05);
}
  .noticia-contenido img{
    width: 38vh;
    height: 25vh;
    object-fit: cover;
  }
  .btn-noticia {
    color: white;
    font-family: 'Roboto Condensed', sans-serif;
    background-color: #BADF3A;
    border: none;
    cursor: pointer;
    border-radius: 6vh;
    font-size: 3vh;
    padding: 3vh;
    margin-top: 2vh;
    padding-left: 5%;
    padding-right: 5%;
    width: auto;
  }
  .btn-noticia:hover {
    transform: scale(1.10);
  }
  .info-noticia {
    margin-top: 2vh;
    padding: 2vh;
    background-color: #DBEE96;
    border-radius: 3vh;
  }
  .info-noticia p {
    font-family: 'Roboto Condensed', 'sans-serif';
    font-size: 2.5vh;
    color: #333333;
    text-align: center;
    align-items: center;
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
    .noticia-imagen img {
      width: 70vw; /* Establece el ancho al 100% */
      height: 50vw; /* Establece la altura a 20vh (puedes ajustar este valor según tus necesidades) */
      object-fit: cover; /* Para mantener la relación de aspecto */
    }
  }
  </style>