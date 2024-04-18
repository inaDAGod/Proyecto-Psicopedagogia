<template>
    <div>
      <nav class="navbar">
        <!-- Contenido del navbar aquí -->
      </nav>
      <div class="content">
        <div class="titulo">
            <h1>Bienvenido aAAAAAAAAAA </h1>
            <h2>Psicopedagogia</h2>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home'
  }
  </script>
  
  <style scoped>
  /* Estilos específicos del componente */
  .navbar {
    background-color: #BADF3A;
    color: white;
    width: 100%;
    height: 100px;
  }
  
  .content {
    padding: 20px;
  }
  
  .titulo h1{
    font-family: 'Koulen', sans-serif; /* Aplicamos la fuente Koulen al texto */
    font-size: 40px;
    color: #0D89F4;
  }
  .titulo h2{
    font-family: 'Koulen', sans-serif; /* Aplicamos la fuente Koulen al texto */
    font-size: 60px;
    color: #FF7001;
  }
  
  .carousel {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }
  
  .carousel img {
    flex: 0 0 auto;
    width: 100%;
    scroll-snap-align: start;
  }
  </style>
  