<template>
    <h2>NUESTROS EGRESADOS</h2>
    <div class="carousel">
      <div class="carousel-inner">
        <div v-for="(egresado, index) in visibleIndices" :key="index" class="carousel-item">
          <div class="img-container">
            <img :src="egresados[egresado].src_foto" :class="{ 'img-oval': true, 'blur': egresado !== currentIndex, 'focused': egresado === currentIndex }" alt="...">
          </div>
          <div class="carousel-caption d-none d-md-block">
            <h3 style="color: black;">{{ egresados[egresado].nombre }}</h3>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" @click="prevSlide">
        <
      </button>
      <button class="carousel-control-next" type="button" @click="nextSlide">
        >
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const egresados = ref([]);
  const currentIndex = ref(0);
  const visibleIndices = ref([]);
  
  onMounted(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/egresados');
      egresados.value = response.data;
      updateVisibleIndices();
    } catch (error) {
      console.error('Error al obtener los egresados:', error);
    }
  });
  
  const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % egresados.value.length;
    updateVisibleIndices();
  };
  
  const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + egresados.value.length) % egresados.value.length;
    updateVisibleIndices();
  };
  
  const updateVisibleIndices = () => {
    const totalIndices = egresados.value.length;
    const prevIndex = (currentIndex.value - 1 + totalIndices) % totalIndices;
    const nextIndex = (currentIndex.value + 1) % totalIndices;
    visibleIndices.value = [prevIndex, currentIndex.value, nextIndex];
  };
  
  </script>
  
  <style>
    @import url('/src/assets/egresados.css');
  </style>
  