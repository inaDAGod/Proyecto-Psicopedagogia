<template>
    <div>
      <div class="content">
        <div class="titulo">
          <h1>NOTICIAS Y ACTIVIDADES</h1>
        </div>
      </div>
      <div class="container-anuncio">
        <div class="anuncio">
          <div class="text-box-act">
            <div class="text-content-act">
              <p>¡NUESTRAS</p>
              <p>PROXIMAS</p>
              <p>ACTIVIDADES!</p>
            </div>
          </div>
        </div>
      </div>
      <div class="vacio">
        <br>
      </div>
      <div class="subtitulo-actividad">
        <h1>ACTIVIDADES</h1>
      </div>
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
                  <button class="btn-actividad" @click="toggleInfoActividad(rowIndex, index)">{{ actividad.actividad }}</button>
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
      <div class="subtitulo-actividad">
        <h1>NOTICIAS</h1>
      </div>
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
                  <button class="btn-noticia" @click="toggleInfoNoticia(rowIndex, index)">{{ noticia.noticia }}</button>
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
  
  .titulo h1{
    font-size: 11vh;
    color: #FF7001;
    font-family: 'Koulen', 'sans-serif';
    margin-top: 4vh;
  }
  .subtitulo-actividad h1{
    font-size: 7vh;
    color: #FF7001;
    font-family: 'Koulen', 'sans-serif';
    margin-top: 4vh;
  }
  .container-anuncio{
    text-align: center;
    align-items: center;
    margin-right: 7%;
    margin-left: 7%;
    width:86%;
  }
  .anuncio{
    text-align: center;
  }
  .text-box-act{
    padding: 3vh;
    border-radius: 5vh;
    text-align: center;
    align-items: center;
    padding-left: 5%;
    padding-right: 5%;
    background-color: #BEAFE5;
  }
  .text-content-act p{
    font-size: 5vh;
    font-family: 'Oswald', sans-serif;
    color: white;
    text-align: center;
  }
  .container-actividades,
  .container-noticias {
    margin-left: 5%;
    margin-right:5%;
    width:90%;
    text-align: center;
  }
  
  .actividades,
  .noticias {
    width: 90%;
    margin-bottom: 20px;
    box-sizing: border-box;
  }
  
  .actividad-imagen img,
  .noticia-imagen img {
    width: 60vh; /* Establece el ancho al 100% */
    height: 40vh; /* Establece la altura a 20vh (puedes ajustar este valor según tus necesidades) */
    object-fit: cover; /* Para mantener la relación de aspecto */
  }

  .actividad-nombre {
    margin-top: 1vh;
  }
  
  .btn-actividad{
    color:white;
    font-family: 'Roboto Condensed', sans-serif;
    background-color: #0D89F4;
    border: none;
    cursor: pointer;
    border-radius: 6vh;
    font-size: 3vh;
    padding: 3vh;
    padding-left: 5%;
    padding-right: 5%;
    width: auto; /* Ancho automático por defecto */
  }
  .btn-noticia{
    color:white;
    font-family: 'Roboto Condensed', sans-serif;
    background-color: #BADF3A;
    border: none;
    cursor: pointer;
    border-radius: 6vh;
    font-size: 3vh;
    padding: 3vh;
    margin-top: 2vh;
    padding-left: 5%;
    padding-right: 5%;
    width: auto; /* Ancho automático por defecto */

  }
  .btn-actividad:hover,
  .btn-noticia:hover {
      transform: scale(1.10); /* Aumenta el tamaño del botón en un 5% cuando el mouse pasa sobre él */
  }
  
  .info-actividad {
    margin-top: 2vh;
    padding: 2vh;
    background-color: #AAD6FB;
    border-radius: 3vh;
  }
  
  .info-noticia {
    margin-top: 2vh;
    padding: 2vh;
    background-color: #DBEE96;
    border-radius: 3vh;
  }
  .info-actividad p,
  .info-noticia p{
    font-family: 'Roboto Condensed', 'sans-serif';
    font-size: 2.5vh;
    color: #333333;
    text-align: center;
    align-items: center;
  }
  h1{
    margin-left: 5vh;
    font-family: 'Oswald', 'sans-serif';
    font-size: 5vh;
  }
  </style>
  