<template>
    <div class="carousel-container">
      <div class="carousel">
        <transition name="slide" mode="out-in" :duration="{ enter: 500, leave: 500, bounce: 0.3 }">
          <div :key="currentIndex" class="slide">
            <img :src="images[currentIndex]" alt="slide" class="carousel-image" />
          </div>
        </transition>
      </div>
      <div class="controls">
        <button @click="prevSlide" class="prev">&#10094;</button>
        <button @click="nextSlide" class="next">&#10095;</button>
      </div>
      <div class="background-circle"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        images: [
          '/src/assets/images/inves.jpg',
          '/src/assets/images/inves2.jpg',
          '/src/assets/images/inves3.jpg',
        ],
        currentIndex: 0
      };
    },
    methods: {
      prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      },
      nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }
    },
    mounted() {
      // Precargar imágenes para mejorar la transición inicial
      this.images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }
  };
  </script>
  
  <style scoped>
  .carousel-container {
    position: relative;
    width: 100%;
    max-width: 600px; /* Ajusta el ancho del carrusel según tus necesidades */
    margin: 0 auto; /* Centra horizontalmente */
  }
  
  .carousel {
    overflow: hidden;
  }
  
  .slide {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  
  .carousel-image {
    max-width: 70%; /* Ajusta el tamaño máximo de la imagen */
    height: auto;
  }
  
  .controls {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  
  button {
    background: rgba(255, 255, 255, 0.5);
    border: none;
    padding: 10px;
    font-size: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
  
  .background-circle {
    position: absolute;
    top: 50%;
    right: -550px; 
    transform: translateY(-50%);
    width: 500px; 
    height: 500px; 
    background-color: #DBEE96;
    border-radius: 50%; 
    z-index: -1; 
  }
  </style>
  