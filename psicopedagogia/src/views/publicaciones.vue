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
      <tbody>
        <tr v-if="publicacionesFiltradas.length > 0" v-for="(publicacionRow, rowIndex) in publicacionesFiltradas" :key="rowIndex">
          <td v-for="(publicacion, index) in publicacionRow" :key="index">
            {{ publicacion }}
            <div class="publicaciones" v-if="publicacion._id">
              <a :href="publicacion.ruta" target="_blank" rel="noopener noreferrer">
                  <div class="publicacion-imagen" @mouseover="aumentarImagen(rowIndex, index)" @mouseleave="reducirImagen(rowIndex, index)">
                      <img :src="publicacion.publicacion_src" :alt="publicacion.titulo" :style="{ transform: imagenesAgrandadas[rowIndex][index] ? 'scale(1.05)' : 'scale(1)' }">
                  </div>
              </a>
              <div class="info-publicacion">
                <h1>{{ publicacion.titulo }}</h1>
                <p>Autor: {{ publicacion.autor }}</p>
                <p>Año: {{ publicacion.anio }}</p>
                <p>{{ publicacion.descripcion }}</p>
              </div>
            </div>
          </td>
        </tr>
        <tr v-else>
          <td colspan="2">No se encontraron publicaciones</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const publicaciones = ref([]);
const publicacionesRows = ref([]);
const imagenesAgrandadas = ref([]);
const filtro = ref({
  todos: ''
});
const publicacionesFiltradas = computed(() => {
  return publicaciones.value.filter(publicacion => {
    const terminos = filtro.value.todos.toLowerCase().split(' ');
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
    calcularFilasDePublicaciones();
    imagenesAgrandadas.value = Array.from({ length: publicacionesRows.value.length }, () => Array(publicacionesRows.value[0].length).fill(false));
  } catch (error) {
    console.error('Error fetching publicaciones:', error);
  }
};

const calcularFilasDePublicaciones = () => {
  publicacionesRows.value = [];

  for (let i = 0; i < publicaciones.value.length; i += 2) {
    const row = [];
    for (let j = i; j < i + 2 && j < publicaciones.value.length; j++) {
      row.push(publicaciones.value[j]);
    }
    publicacionesRows.value.push(row);
  }
};

const aumentarImagen = (rowIndex, index) => {
  imagenesAgrandadas.value[rowIndex][index] = true;
};

const reducirImagen = (rowIndex, index) => {
  imagenesAgrandadas.value[rowIndex][index] = false;
};

onMounted(() => {
  obtenerPublicaciones();
});
</script>

<style>
  .titulo-publicacion h1{
    font-size: 11vh;
    color: #FF7001;
    font-family: 'Koulen', 'sans-serif';
  }
  .container-publicaciones{
    margin-right:5%;
    margin-left: 3%;
    width:90%;
  }
  .info-publicacion p {
    color: black;
    text-align: left;
    align-items: center;
    font-size: 3vh;
    font-family: 'Roboto Condensed', sans-serif;
    
  }
  .info-publicacion h1 {
    color: black;
    text-align: center;
    align-items: center;
    font-size: 3.5vh;
    font-family: 'Oswald', sans-serif;
  }
  .publicacion-imagen img {
    width: 30vh;
    height: 45vh;
    margin-right: 3vh;
    transition: transform 0.3s ease; /* Agrega una transición suave */
  }
  .publicaciones {
    display: flex;
    margin-top: 3vh;
    margin-bottom: 3vh;
    padding: 1%;
    margin: 2%;
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
  .publicacion-imagen{
    flex:1;
  }
  .info-publicacion {
    flex: 2.5;
  }
  .filtro{
    display: none;
  }
</style>
