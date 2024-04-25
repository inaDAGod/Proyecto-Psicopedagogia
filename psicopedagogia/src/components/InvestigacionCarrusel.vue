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
    @import url('/src/assets/carruInv.css');
  </style>
  