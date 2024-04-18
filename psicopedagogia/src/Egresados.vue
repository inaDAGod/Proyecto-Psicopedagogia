<template>
    <div>
      <h2>NUESTROS EGRESADOS</h2>
      <div class="carousel-container">
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
      </div>
      <div class="espacio">

      </div>
      <div class="info-container">
        <div v-if="egresados[currentIndex]">
        
            <div class="circle-background"></div>
            <img :src="egresados[currentIndex].src_foto" class="info-img" alt="Egresado">
      
          <div class="info-content">
            <h3 class="nombre-egresado">{{ egresados[currentIndex].nombre }}</h3>
            <h3>{{ egresados[currentIndex].correo }}</h3>
            <h3>Año de graduación: {{ egresados[currentIndex].anio_graduacion }}</h3>
            <h3>Trabajo actual: {{ egresados[currentIndex].trabajo }}</h3>
            <p>{{ egresados[currentIndex].comentario }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  //falta manejar cuando no hay datos en la BD
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
  