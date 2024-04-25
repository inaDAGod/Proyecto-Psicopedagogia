<template>
    <div>
      <h2 class="titleInves">Investigacion <br>Sociedad Científica Estudiantil INPSICOPEDIA</h2>
      <div class="bloque-container">
        <Bloque titulo="¿Quienes somos?" contenido="Contenido del bloque" fondo="#AAD6FB" />
        <Bloque titulo="¿Desde cuando existimos?" contenido="Contenido del bloque" fondo="#FEF684" />
        <Bloque titulo="¿Quienes forman parte?" contenido="Contenido del bloque" fondo="#DBEE96" />
        <Bloque titulo="¿Como unirse?" contenido="Contenido del bloque" fondo="#FFCEE8" />
      </div>
      <div>
        <h3 class="subtitulo">Acciones investigativas</h3>
          <div class="carrusel">
            <Carousel />
          </div>
      </div>
      <div>
        <h3 class="subtitulo">La presente Investigación</h3>
        <div class="presentee">
          <PresenteInv />
        </div>
    </div>
  
  </div>
  </template>
  
  <script setup>
    import Bloque from './components/ParrafoInvestigacion.vue';
    import Carousel from './components/InvestigacionCarrusel.vue';
    import PresenteInv from './components/PresenteInvestigacion.vue';
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap');
  
  .titleInves {
    color: #FF7001;
    font-family: 'Koulen';
    font-size: 300%;
    padding-left: 5%;
  }
  
  .bloque-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-left: 3%;
    padding-right: 3%;
  }
  .subtitulo{
    color: #FF7001;
    text-align: left;
    padding-left: 3%;
  }
  .presentee{
    padding-top: 10%;
    padding-bottom: 20%;
    
  }
  @media (max-width: 768px) {
    .bloque-container {
      flex-direction: column;
      align-items: center;
    }
    .titleInves {
        font-size: 200%;
        padding-left: 5%;
    }
  }

 
  </style>
  