<template>
    <div class="noticia">
      <div class="noticia-imagen">
        <img :src="noticia.noticia_src" :alt="noticia.noticia">
      </div>
      <div class="noticia-contenido">
        <button class="btn-noticia" @click="toggleInfoNoticia">{{ noticia.noticia }}</button>
        <div v-if="expanded" class="info-noticia">
          <p>{{ noticia.contenido }}</p>
          <p>Fecha: {{ noticia.fecha }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      noticia: Object
    },
    data() {
      return {
        expanded: false
      };
    },
    methods: {
      toggleInfoNoticia() {
        this.expanded = !this.expanded;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Aquí puedes añadir estilos específicos para el componente Noticia */
  .noticia {
    width: 90%;
    margin-bottom: 20px;
    box-sizing: border-box;
  }
  .noticia-imagen img {
    width: 60vh;
    height: 40vh;
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
  @media (max-width: 992px) {
    .noticia-imagen img {
      width: 70vw; /* Establece el ancho al 100% */
      height: 50vw; /* Establece la altura a 20vh (puedes ajustar este valor según tus necesidades) */
      object-fit: cover; /* Para mantener la relación de aspecto */
    }
  }
  </style>