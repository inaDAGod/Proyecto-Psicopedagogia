<template>
  <div id="app">
    <h2 class="titulo-pos2">POSTGRADO</h2>
    <br>

    <div class="container-pos">
      <h1 class="titulo-pos">Diplomados, especialidades y Maestría</h1>
      <div class="maestrias-container">
        <div v-for="maestria in maestrias" :key="maestria.id_pos" class="maestria-item">
          <div class="maestria-card card1" style="background-color: rgba(170, 214, 251, 1);">
            <div class="maestria-img">
              <img :src="maestria.img" :alt="maestria.titulo" class="maestria-image">
            </div>
            <div class="maestria-info">
              <h5 class="maestria-head">{{ maestria.titulo }}</h5>
              <p class="maestria-about"> {{ maestria.about }}</p>
              <p><b>Competencia:</b> {{ maestria.competencia }}</p>
              <p><b>Requisitos:</b> {{ maestria.requisitos }}</p>
              <p><b>Fecha:</b> {{ maestria.fecha }}</p>
            </div>
          </div>
        </div>
      </div>
      <h1 class="titulo-pos">Formación Continua</h1>
      <div class="cursos-container">
        <div v-for="curso in cursos" :key="curso.id_cur" class="curso-item">
          <div class="curso-card card2" style="background-color: rgba(219, 238, 150, 1);">
            <div class="curso-info">
              <h4 class="curso-head">{{ curso.titulo }}</h4>
              <p class="curso-about">{{ curso.about }}</p>
              <p><b>Competencia:</b> {{ curso.competencia }}</p>
              <p><b>Requisitos:</b> {{ curso.requisitos }}</p>
              <p><b>Fecha:</b> {{ curso.fecha }}</p>
            </div>
            <div class="curso-img">
              <img :src="curso.img" :alt="curso.titulo" class="curso-image">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const cursos = ref([]);
const maestrias = ref([]);

const obtenerMaestrias = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/maestria');
    maestrias.value = response.data;
  } catch (error) {
    console.error('Error fetching maestrias:', error);
  }
};

const obtenerCursos = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/cursosfc');
    cursos.value = response.data;
  } catch (error) {
    console.error('Error fetching cursos:', error);
  }
};

onMounted(() => {
  obtenerMaestrias();
  obtenerCursos();
});
</script>

<style scoped>
.titulo-pos {
    font-family: 'Koulen';
    font-size: 300%;
    color: rgba(255, 42, 157, 1);
    padding: 2%;
}
.titulo-pos2 {
  font-family: 'Koulen';
  font-size: 80px;
  color: rgba(255, 42, 157, 1);
  padding: 2%;
}

.maestrias-container,
.cursos-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.maestria-item,
.curso-item {
  width: 48%;
  margin-bottom: 20px;
}

.maestria-card,
.curso-card {
  display: flex;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 5%;
}

.maestria-img,
.curso-img {
  flex: 1;
}

.maestria-image,
.curso-image {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
}

.maestria-info,
.curso-info {
  flex: 1;
  padding: 20px;
  font-family: 'Oswald', sans-serif;
}

.maestria-head,
.curso-head {
  font-size: 20px;
  margin-bottom: 10px;
}

.maestria-about,
.curso-about {
  font-size: 16px;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .maestria-item,
  .curso-item {
    width: 100%;
  }
}
</style>
