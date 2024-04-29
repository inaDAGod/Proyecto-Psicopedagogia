<template>
    <div class="car-container">
      <div class="car">
        <div class="car-inner">
          <div v-for="(egresado, index) in visibleIndices" :key="index" class="car-item">
            <div class="img-container">
              <img :src="egresados[egresado].src_foto" :class="{ 'img-oval': true, 'blur': egresado !== currentIndex, 'focused': egresado === currentIndex }" alt="...">
            </div>
            <div class="car-caption">
              <h3 style="color: black;">{{ egresados[egresado].nombre }}</h3>
            </div>
          </div>
        </div>
        <button class="car-control-prev" type="button" @click="prevSlide">
          <
        </button>
        <button class="car-control-next" type="button" @click="nextSlide">
          >
        </button>
      </div>
      <div class="espacio"></div>
      <div v-if="egresados[currentIndex]">
        <Info
          :nombre="egresados[currentIndex].nombre"
          :correo="egresados[currentIndex].correo"
          :anio_graduacion="egresados[currentIndex].anio_graduacion"
          :trabajo="egresados[currentIndex].trabajo"
          :comentario="egresados[currentIndex].comentario"
          :srcFoto="egresados[currentIndex].src_foto"
        />
      </div>
      <div class="espacio"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, defineEmits } from 'vue';
  import axios from 'axios';
  import Info from './EgresadosInfo.vue';
  
  const emits = defineEmits(['updateCurrentIndex']);
  
  onMounted(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/egresados');
      egresados.value = response.data;
      updateVisibleIndices();
    } catch (error) {
      console.error('Error al obtener los egresados:', error);
    }
  });
  
  const egresados = ref([]);
  const currentIndex = ref(0);
  const visibleIndices = ref([]);
  
  const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % egresados.value.length;
    updateVisibleIndices();
    emits('updateCurrentIndex', currentIndex.value);
  };
  
  const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + egresados.value.length) % egresados.value.length;
    updateVisibleIndices();
    emits('updateCurrentIndex', currentIndex.value);
  };
  
  const updateVisibleIndices = () => {
    const totalIndices = egresados.value.length;
    const prevIndex = (currentIndex.value - 1 + totalIndices) % totalIndices;
    const nextIndex = (currentIndex.value + 1) % totalIndices;
    visibleIndices.value = [prevIndex, currentIndex.value, nextIndex];
  };
  </script>
  
  <style scoped>
    @import url('/./src/assets/egresados.css');
  </style>
  