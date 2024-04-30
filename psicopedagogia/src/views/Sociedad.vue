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
    <PieInv />
  </div>

  </template>
  
  <script setup>
    import Bloque from '/src/components/ParrafoInvestigacion.vue';
    import Carousel from '/src/components/InvestigacionCarrusel.vue';
    import PresenteInv from '/src/components/PresenteInvestigacion.vue';
    import PieInv from '/src/components/PieInvestigacion.vue';
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap');
  
  @import url('/src/assets/sociedad.css');

 
  </style>
  