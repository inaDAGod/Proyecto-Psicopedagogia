<template>
  <div>
    <div class="content">
      <div class="titulo-publicacion">
        <br><br>
        <h1>PUBLICACIONES Y LIBROS</h1>
      </div>
      <div>
        <input type="text" v-model="filtro.todos" class="busquedaPubli" placeholder="Buscar por título, autor, año o descripción">
        <button class="buscarPubli" @click="filtrarPublicaciones">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
        </button>
      </div>
    </div>
    <br>
    <table class="container-publicaciones">
      <div class="grid-container">
        <Publicacion v-for="(publicacion, index) in publicacionesFiltradas" :key="index" :publicacion="publicacion" />
      </div>
      <div v-if="publicacionesFiltradas.length === 0">
        No se encontraron publicaciones
      </div>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Publicacion from '/src/components/CardPublicacion.vue';

const publicaciones = ref([]);
const filtro = ref({
  todos: ''
});
const publicacionesFiltradas = computed(() => {
  const terminos = filtro.value.todos.toLowerCase().split(' ');
  return publicaciones.value.filter(publicacion => {
    return terminos.every(termino => {
      return Object.values(publicacion).some(valor => {
        return String(valor).toLowerCase().includes(termino);
      });
    });
  });
});
const obtenerPublicaciones = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/publicaciones');
    publicaciones.value = response.data;
  } catch (error) {
    console.error('Error fetching publicaciones:', error);
  }
};
onMounted(() => {
  obtenerPublicaciones();
});
</script>

<style scoped>
  .titulo-publicacion h1{
    font-size: 8vh;
    color: #FF7001;
    font-family: 'Koulen', 'sans-serif';
  }
  .container-publicaciones{
    margin-right:5%;
    margin-left: 3%;
    width:90%;
  }
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(40vw, 2fr));
    gap: 30px;
  }
  .busquedaPubli{
    width: 60%;
    margin: 2%;
    padding: 1%;
    margin-left: 5%;
    border-radius: 40px;
    border-color: #ff710441;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); 
  }
  .buscarPubli{
    background-color: #BADF3A;
    border-color: #BADF3A;
    padding: 1%;
    border-radius: 40px;
    box-shadow: 0px 0px 10px rgba(82, 218, 89, 0.452); 
  }
  .buscarPubli:hover{
    background-color: #FF7001;
    border-color: #FF7001;
  }
  .filtro{
    display: none;
  }

  @media (max-width: 768px) {
  .titulo-publicacion h1 {
    font-size: 3.7vw;
    color: #FF7001;
    font-family: 'Koulen', 'sans-serif';
  }
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(70vw, 2fr));
    gap: 30px;
  }

  .container-publicaciones {
    width: 100%;
    margin: 0;
  }
  
}
</style>
