<template>
    <div>
      <h1>NUESTROS EGRESADOS</h1>
      <ul>
      <li v-for="(egresado, index) in egresados" :key="egresado.id_egresado">
        <img :src="egresado.src_foto"  style="width: 100px; height: 100px;">
        <div>
          <strong>{{ egresado.nombre }}</strong> - {{ egresado.trabajo }}
        </div>
      </li>
    </ul>
    </div>
  </template>
  
  
  <script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const egresados = ref([]);
const currentIndex = ref(0);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/egresados');
    egresados.value = response.data;
  } catch (error) {
    console.error('Error al obtener los egresados:', error);
  }
});

const nextSlide = () => {
  if (currentIndex.value < egresados.value.length - 1) {
    currentIndex.value++;
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};
</script>

  
  <style>
    @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
    @import url('/src/assets/styleD.css');
    .carrusel{
        background-color: #FEF684;
    }
  </style>