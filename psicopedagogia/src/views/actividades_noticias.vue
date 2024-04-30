<template>
    <div>
      <div class="content">
        <div class="titulo">
          <h1>NOTICIAS Y ACTIVIDADES</h1>
        </div>
      </div>
      <div class="container">
        <div class="sidebar">
          <div class="text-box" style="background-color: #BEAFE5; color: white;">
            <div class="text-content">
              <p>¡NUESTRAS PROXIMAS ACTIVIDADES!</p>
            </div>
          </div>
        </div>
        <div class="calendar_container">
          <!-- Contenido del calendario -->
        </div>
      </div>
      <div class="vacio">
        <br>
      </div>
      <h1>ACTIVIDADES</h1>
      <br>
      <table class="container-actividades">
        <tbody>
          <tr v-for="(actividadRow, rowIndex) in actividadRows" :key="rowIndex">
            <td v-for="(actividad, index) in actividadRow" :key="index">
              <div class="actividades">
                <div class="actividad-imagen">
                  <img :src="actividad.actividad_src" :alt="actividad.actividad">
                </div>
                <div class="actividad-nombre">
                  <button @click="toggleInfoActividad(rowIndex, index)">{{ actividad.actividad }}</button>
                  <div v-if="expandedInfoActividad[rowIndex][index]" class="info-actividad">
                    <p>Fecha: {{ actividad.fecha }}</p>
                    <p>Hora: {{ actividad.hora }}</p>
                    <p>Ubicación: {{ actividad.ubicacion }}</p>
                    <p>Descripción: {{ actividad.descripcion }}</p>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <h1>NOTICIAS</h1>
      <br>
      <table class="container-noticias">
        <tbody>
          <tr v-for="(noticiaRow, rowIndex) in noticiaRows" :key="rowIndex">
            <td v-for="(noticia, index) in noticiaRow" :key="index">
              <div class="noticia">
                <div class="noticia-imagen">
                  <img :src="noticia.noticia_src" :alt="noticia.noticia">
                </div>
                <div class="noticia-contenido">
                  <button @click="toggleInfoNoticia(rowIndex, index)">{{ noticia.noticia }}</button>
                  <div v-if="expandedInfoNoticia[rowIndex][index]" class="info-noticia">
                    <p>{{ noticia.contenido }}</p>
                    <p>Fecha: {{ noticia.fecha }}</p>
                  </div>
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
  
  const actividades = ref([]);
  const actividadRows = ref([]);
  const expandedInfoActividad = ref([]);
  
  const obtenerActividades = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/actividades');
      actividades.value = response.data;
      calcularFilasDeActividades();
    } catch (error) {
      console.error('Error fetching Actividades:', error);
    }
  };
  
  const calcularFilasDeActividades = () => {
    actividadRows.value = [];
    expandedInfoActividad.value = [];
    for (let i = 0; i < actividades.value.length; i += 3) {
      const row = [];
      const infoRow = [];
      for (let j = i; j < i + 3 && j < actividades.value.length; j++) {
        row.push(actividades.value[j]);
        infoRow.push(false); // Inicialmente la información está oculta
      }
      actividadRows.value.push(row);
      expandedInfoActividad.value.push(infoRow);
    }
  };
  
  const toggleInfoActividad = (rowIndex, index) => {
    expandedInfoActividad.value[rowIndex][index] = !expandedInfoActividad.value[rowIndex][index];
  };
  
  onMounted(() => {
    obtenerActividades();
  });
  
  const noticias = ref([]);
  const noticiaRows = ref([]);
  const expandedInfoNoticia = ref([]);
  
  const obtenerNoticias = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/noticias');
      noticias.value = response.data;
      calcularFilasDeNoticias();
    } catch (error) {
      console.error('Error fetching Noticias:', error);
    }
  };
  
  const calcularFilasDeNoticias = () => {
    noticiaRows.value = [];
    expandedInfoNoticia.value = [];
    for (let i = 0; i < noticias.value.length; i += 3) {
      const row = [];
      const infoRow = [];
      for (let j = i; j < i + 3 && j < noticias.value.length; j++) {
        row.push(noticias.value[j]);
        infoRow.push(false); // Inicialmente la información está oculta
      }
      noticiaRows.value.push(row);
      expandedInfoNoticia.value.push(infoRow);
    }
  };
  
  const toggleInfoNoticia = (rowIndex, index) => {
    expandedInfoNoticia.value[rowIndex][index] = !expandedInfoNoticia.value[rowIndex][index];
  };
  
  onMounted(() => {
    obtenerNoticias();
  });
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');
  @import url('/src/assets/estilo.css');
  @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
  
  .container-actividades {
    margin-left: 5vh;
    margin-right:5vh;
    width:100%;
    text-align: center;
  }
    .container-noticias{
    width:100%;
    text-align: center;
  }
  
  .actividades {
    width: 100%;
    margin-bottom: 20px;
    box-sizing: border-box;
  }
  
  .actividad-imagen img {
    width: 100%;
  }

  .actividad-nombre {
    margin-top: 1vh;
  }
  
  button {
    background-color: #FFC497;
    border: none;
    cursor: pointer;
  }
  
  .info-actividad {
    margin-top: 2vh;
    padding: 2vh;
    background-color: #FFC497;
    border-radius: 3vh;
  }
  
  .info-noticia {
    margin-top: 2vh;
    padding: 2vh;
    background-color: #FFC497;
    border-radius: 3vh;
  }
  h1{
    margin-left: 5vh;
    font-family: 'Oswald', 'sans-serif';
    font-size: 5vh;
  }
  </style>
  