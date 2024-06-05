<template>
    <div>
      <div class="content">
        <div class="titulo">
          <h1>SEMBRANDO SEMILLAS DE PAZ</h1>
        </div>
      </div>
      <div class="container">
        <div class="sidebar">
          <div class="text-box" style="background-color: #BEAFE5; color: white;">
            <div class="text-content">
              <p>OBJETIVOS</p>
              <p>{{ paginaInteraccion.objetivo }}</p>
            </div>
          </div>
          <div class="text-box" style="background-color: #BEAFE5; color: white;">
            <div class="text-content">
              <p>LINEAS DE ACCIÓN MACRO</p>
              <p>{{ paginaInteraccion.lineas }}</p>
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
          <tr v-for="(actividadRow, rowIndex) in actividadURows" :key="rowIndex">
            <td v-for="(actividadU, index) in actividadRow" :key="index">
              <div class="actividades">
                <div class="actividad-imagen">
                  <img :src="actividadU.actividad_src" :alt="actividadU.actividad">
                </div>
                <div class="actividad-nombre">
                  <button @click="toggleInfoActividadU(rowIndex, index)">{{ actividadU.actividad }}</button>
                  <div v-if="expandedInfoActividadU[rowIndex][index]" class="info-actividad">
                    <p> Fecha: {{ actividadU.fecha }}</p>
                    <p>Hora: {{ actividadU.hora }}</p>
                    <p>Ubicación: {{ actividadU.ubicacion }}</p>
                    <p>Descripción: {{ actividadU.descripcion }}</p>
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

import {ref, onMounted} from 'vue';
import axios from 'axios';

// Define the reactive variables to home
const paginaInteraccion = ref({
    objetivo: '',
    lineas: '',
});
// Function to fetch home data from the database
const obtenerInteraccion = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/interaccionsocial');
    paginaInteraccion.value = response.data;
  } catch (error) {
    console.error('Error fetching home:', error);
  }
};
onMounted(() => {
  obtenerInteraccion();
});

  const actividadesU = ref([]);
  const actividadURows = ref([]);
  const expandedInfoActividadU = ref([]);
  
  const obtenerActividades_Universidad = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/actividades_universidad');
      actividadesU.value = response.data;
      calcularFilasDeActividadesU();
    } catch (error) {
      console.error('Error fetching Actividades:', error);
    }
  };
  
  const calcularFilasDeActividadesU = () => {
    actividadURows.value = [];
    expandedInfoActividadU.value = [];
    for (let i = 0; i < actividadesU.value.length; i += 3) {
      const row = [];
      const infoRow = [];
      for (let j = i; j < i + 3 && j < actividadesU.value.length; j++) {
        row.push(actividadesU.value[j]);
        infoRow.push(false); // Inicialmente la información está oculta
      }
      actividadURows.value.push(row);
      expandedInfoActividadU.value.push(infoRow);
    }
  };
  
  const toggleInfoActividadU = (rowIndex, index) => {
    expandedInfoActividadU.value[rowIndex][index] = !expandedInfoActividadU.value[rowIndex][index];
  };
  
  onMounted(() => {
    obtenerActividades_Universidad();
  });

  
  const actividadesD = ref([]);
  const actividadDRows = ref([]);
  const expandedInfoActividadD = ref([]);
  
  const obtenerActividades_Departamental = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/actividades_departamental');
      actividadesD.value = response.data;
      calcularFilasDeActividadesD();
    } catch (error) {
      console.error('Error fetching Actividades:', error);
    }
  };
  
  const calcularFilasDeActividadesD = () => {
    actividadDRows.value = [];
    expandedInfoActividadD.value = [];
    for (let i = 0; i < actividadesD.value.length; i += 3) {
      const row = [];
      const infoRow = [];
      for (let j = i; j < i + 3 && j < actividadesD.value.length; j++) {
        row.push(actividadesD.value[j]);
        infoRow.push(false); // Inicialmente la información está oculta
      }
      actividadDRows.value.push(row);
      expandedInfoActividadD.value.push(infoRow);
    }
  };
  
  const toggleInfoActividadD = (rowIndex, index) => {
    expandedInfoActividadD.value[rowIndex][index] = !expandedInfoActividadD.value[rowIndex][index];
  };
  
  onMounted(() => {
    obtenerActividades_Departamental();
  });

  const actividadesI = ref([]);
  const actividadIRows = ref([]);
  const expandedInfoActividadI = ref([]);
  
  const obtenerActividades_Internacional = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/actividades_internacional');
      actividadesI.value = response.data;
      calcularFilasDeActividadesI();
    } catch (error) {
      console.error('Error fetching Actividades:', error);
    }
  };
  
  const calcularFilasDeActividadesI = () => {
    actividadIRows.value = [];
    expandedInfoActividadI.value = [];
    for (let i = 0; i < actividadesI.value.length; i += 3) {
      const row = [];
      const infoRow = [];
      for (let j = i; j < i + 3 && j < actividadesI.value.length; j++) {
        row.push(actividadesI.value[j]);
        infoRow.push(false); // Inicialmente la información está oculta
      }
      actividadIRows.value.push(row);
      expandedInfoActividadI.value.push(infoRow);
    }
  };
  
  const toggleInfoActividadI = (rowIndex, index) => {
    expandedInfoActividadI.value[rowIndex][index] = !expandedInfoActividadI.value[rowIndex][index];
  };
  
  onMounted(() => {
    obtenerActividades_Internacional();
  });
  </script>
  
  <style scoped>
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
