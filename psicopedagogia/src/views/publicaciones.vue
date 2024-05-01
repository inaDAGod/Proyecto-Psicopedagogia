<template>
  <div>
    <div class="content">
      <div class="titulo-publicacion">
        <br><br><br>
        <h1>PUBLICACIONES Y LIBROS</h1>
        <br><br>
      </div>
    </div>
    <br>
    <table class="container-publicaciones">
      <tbody>
        <tr v-for="(publicacionRow, rowIndex) in publicacionesRows" :key="rowIndex">
          <td v-for="(publicacion, index) in publicacionRow" :key="index">
            <div class="publicaciones">
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
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const publicaciones = ref([]);
const publicacionesRows = ref([]);
const imagenesAgrandadas = ref([]);

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
    text-align: center;
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
  }
  .publicacion-imagen{
    flex:1;
  }
  .info-publicacion {
    flex: 2.5;
  }
</style>
