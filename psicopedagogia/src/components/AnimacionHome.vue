<template>
    <div>
      <div class="animation-container">
            <div class="image-left">
                <img :src="leftImageSrc" alt="Imagen izquierda">
            </div>
            <div class="animation-text">
                <p>{{ animationText }}</p>
            </div>
            <div class="image-right">
                <img :src="rightImageSrc" alt="Imagen derecha">
            </div>
        </div>
    </div>
  </template>
  
<script>
  const leftImageSrc = './assets/images/home-area1.png';
  const rightImageSrc = './assets/images/home-area2.png';
  const animationText = 'Áreas de estudio';
</script>
  
<style scoped>
  .animation-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  .image-left img,
  .image-right img {
      width: 100%;
      height: auto;
  }

  .image-left {
    flex: 1; 
    transform: translateX(-100%);
    animation: slideInLeft 2s forwards;
  }
  .image-right {
    flex: 1; 
    transform: translateX(100%);
    animation: slideInRight 2s forwards;
  }
  .animation-text {
    position: relative;
    z-index: 1; /* Para que el texto esté por encima de las imágenes */
    font-size: 24px;
    animation: slideIn 2s forwards;
  }
  .animation-text p {
      font-family:'Oswald', sans-serif;
      text-align: center;
      font-size: 5.5vw;
      max-width: 100%;
  }
  @keyframes slideInLeft {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
  }
    
  @keyframes slideInRight {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
  }
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(0px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media screen and (max-width: 768px) {
    /* Estilos adicionales para pantallas pequeñas */
    .animation-text p {
        font-size: 8vw; /* Cambia el tamaño del texto para adaptarse a pantallas más pequeñas */
    }
  }
</style>
  