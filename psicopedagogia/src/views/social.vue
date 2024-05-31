<template>
  <div>
    <div class="content">
      <div class="titulo-social">
        <br><br><br>
        <h1>SEMBRANDO SEMILLAS DE PAZ</h1>
        <br><br>
      </div>
    </div>
    <div class="container-objetivo">
        <div class="text-box-objetivo">
          <div class="text-content-objetivo">
            <h1>OBJETIVOS</h1>
            <p>{{ paginaInteraccion.objetivo }}</p>
          </div>
        </div>
    </div>
    <div class="container-lineas">
      <div class="text-box-lineas">
          <div class="text-content-lineas">
            <h1>LINEAS DE ACCIÓN MACRO</h1>
            <p>{{ paginaInteraccion.lineas }}</p>
          </div>
        </div>
    </div>
    <div class="vacio">
      <br>
    </div>
    <div class="subtitulo-actividad">
      <h1>ACTIVIDADES UNIVERSITARIAS</h1>
    </div>
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
                <button class="btn-actividad-universidad" @click="toggleInfoActividadU(rowIndex, index)">{{ actividadU.actividad }}</button>
                <div v-if="expandedInfoActividadU[rowIndex][index]" class="info-actividad-universidad">
                  <p>Fecha: {{ actividadU.fecha }}</p>
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

    <!-- Actividades Departamentales -->
    <div class="subtitulo-actividad">
      <h1>ACTIVIDADES DEPARTAMENTALES</h1>
    </div>
    <br>
    <table class="container-actividades">
      <tbody>
        <tr v-for="(actividadRow, rowIndex) in actividadDRows" :key="rowIndex">
          <td v-for="(actividadD, index) in actividadRow" :key="index">
            <div class="actividades">
              <div class="actividad-imagen">
                <img :src="actividadD.actividad_src" :alt="actividadD.actividad">
              </div>
              <div class="actividad-nombre">
                <button class="btn-actividad-departamental" @click="toggleInfoActividadD(rowIndex, index)">{{ actividadD.actividad }}</button>
                <div v-if="expandedInfoActividadD[rowIndex][index]" class="info-actividad-departamental">
                  <p>Fecha: {{ actividadD.fecha }}</p>
                  <p>Hora: {{ actividadD.hora }}</p>
                  <p>Ubicación: {{ actividadD.ubicacion }}</p>
                  <p>Descripción: {{ actividadD.descripcion }}</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Actividades Internacionales -->
    <div class="subtitulo-actividad">
      <h1>ACTIVIDADES INTERNACIONALES</h1>
    </div>
    <br>
    <table class="container-actividades">
      <tbody>
        <tr v-for="(actividadRow, rowIndex) in actividadIRows" :key="rowIndex">
          <td v-for="(actividadI, index) in actividadRow" :key="index">
            <div class="actividades">
              <div class="actividad-imagen">
                <img :src="actividadI.actividad_src" :alt="actividadI.actividad">
              </div>
              <div class="actividad-nombre">
                <button class="btn-actividad-internacional"  @click="toggleInfoActividadI(rowIndex, index)">{{ actividadI.actividad }}</button>
                <div v-if="expandedInfoActividadI[rowIndex][index]" class="info-actividad-internacional">
                  <p>Fecha: {{ actividadI.fecha }}</p>
                  <p>Hora: {{ actividadI.hora }}</p>
                  <p>Ubicación: {{ actividadI.ubicacion }}</p>
                  <p>Descripción: {{ actividadI.descripcion }}</p>
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
  
<style>
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');
  @import url('/src/assets/estilo.css');
  @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
  @import url('/src/assets/interaccion.css');
  

</style>
