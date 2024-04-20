<template>
  <div class="cuerpo">
    <h2>NUESTROS EGRESADOS</h2>
    <div>
      <Carrusel :egresados="egresados" :currentIndex="currentIndex" :visibleIndices="visibleIndices" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Carrusel from './components/EgresadosCarrusel.vue';

const egresados = ref([]);
const currentIndex = ref(0);
const visibleIndices = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/egresados');
    egresados.value = response.data;
  } catch (error) {
    console.error('Error al obtener los egresados:', error);
  }
});
</script>

<style scoped>
@import url('/src/assets/egresados.css');
</style>
