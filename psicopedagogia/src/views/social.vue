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
    <br>
    <div class="subtitulo-actividad">
      <h1>ACTIVIDADES UNIVERSITARIAS</h1>
    </div>
    <br>
    <div class="container-actividades row">
      <div v-for="(actividad, index) in actividadesU" :key="index" class="col-lg-4 col-md-6 col-sm-12 mb-3">
        <CardActividad :actividad="actividad" tipo="universidad" />
      </div>
    </div>

    <!-- Actividades Departamentales -->
    <div class="subtitulo-actividad">
      <h1>ACTIVIDADES DEPARTAMENTALES</h1>
    </div>
    <br>
    <div class="container-actividades row">
      <div v-for="(actividad, index) in actividadesD" :key="index" class="col-lg-4 col-md-6 col-sm-12 mb-3">
        <CardActividad :actividad="actividad" tipo="departamental" />
      </div>
    </div>

    <!-- Actividades Internacionales -->
    <div class="subtitulo-actividad">
      <h1>ACTIVIDADES INTERNACIONALES</h1>
    </div>
    <br>
    <div class="container-actividades row">
      <div v-for="(actividad, index) in actividadesI" :key="index" class="col-lg-4 col-md-6 col-sm-12 mb-3">
        <CardActividad :actividad="actividad" tipo="internacional" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import CardActividad from '/src/components/CardActividad.vue';

// Define the reactive variables for home
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

// Actividades Universitarias
const actividadesU = ref([]);
const obtenerActividades_Universidad = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/actividades_universidad');
    actividadesU.value = response.data;
  } catch (error) {
    console.error('Error fetching Actividades:', error);
  }
};
onMounted(() => {
  obtenerActividades_Universidad();
});

// Actividades Departamentales
const actividadesD = ref([]);
const obtenerActividades_Departamental = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/actividades_departamental');
    actividadesD.value = response.data;
  } catch (error) {
    console.error('Error fetching Actividades:', error);
  }
};
onMounted(() => {
  obtenerActividades_Departamental();
});

// Actividades Internacionales
const actividadesI = ref([]);
const obtenerActividades_Internacional = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/actividades_internacional');
    actividadesI.value = response.data;
  } catch (error) {
    console.error('Error fetching Actividades:', error);
  }
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

.text-box-objetivo {
  background-color: #ffc497; /* Color de fondo para el text box de objetivo */
  text-align: center; /* Centra el texto */
  color: black; /* Color del texto */
  border-radius: 5vh;
  padding: 7vh;
  margin-bottom: 5%; /* Espacio entre el recuadro y el carrusel */
  max-width: 90%;
}

.text-box-lineas {
  background-color: #ffcee8; /* Color de fondo para el text box de líneas */
  text-align: center; /* Centra el texto */
  color: black; /* Color del texto */
  border-radius: 5vh;
  padding: 7vh;
  margin-bottom: 5%; /* Espacio entre el recuadro y el carrusel */
  max-width: 90%;
}

.container-objetivo,
.container-lineas {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-box-objetivo p,
.text-box-lineas p {
  padding-top: 3vh;
  padding-left: 3vh;
  padding-right: 3vh;
  padding-bottom: 3vh;
  font-family: 'Roboto Condensed', sans-serif;
  text-align: center;
  font-size: 3.5vh;
}

.text-box-objetivo h1,
.text-box-lineas h1 {
  color: black; /* Color del texto */
  font-size: 4vh;
}

.titulo-social h1 {
  margin-left: 5vh;
  font-family: 'Oswald', 'sans-serif';
  font-size: 5vh;
  color: #ff7001;
}

.container-actividades {
  display: flex;
  flex-wrap: wrap;
}

.subtitulo-actividad h1{
    font-size: 7vh;
    color: #FF7001;
    font-family: 'Koulen', 'sans-serif';
    margin-top: 4vh;
}
@media (max-width: 992px) {
  .container-objetivo,
  .container-lineas{
    width:100%;
  }
  .text-box-objetivo,
  .text-box-lineas {
    padding: 5vh;
    margin-bottom: 3%;
    width:100%;
  }

  .text-box-objetivo p,
  .text-box-lineas p {
    font-size: 3vh;
  }

  .text-box-objetivo h1,
  .text-box-lineas h1 {
    font-size: 3.5vh;
  }
  .subtitulo-actividad h1{
      font-size: 3.7vh;
      color: #FF7001;
      font-family: 'Koulen', 'sans-serif';
      margin-top: 4vh;
    }
}

@media (max-width: 768px) {
  .text-box-objetivo,
  .text-box-lineas {
    padding: 3vh;
    margin-bottom: 2%;
    width:100%;
  }

  .text-box-objetivo p,
  .text-box-lineas p {
    font-size: 2.5vh;
  }

  .text-box-objetivo h1,
  .text-box-lineas h1 {
    font-size: 3vh;
  }
  .subtitulo-actividad h1{
      font-size: 2.7vh;
      color: #FF7001;
      font-family: 'Koulen', 'sans-serif';
      margin-top: 4vh;
  }
}

@media (max-width: 576px) {
  .text-box-objetivo,
  .text-box-lineas {
    padding: 2vh;
    margin-bottom: 1%;
    width:100%;
  }

  .text-box-objetivo p,
  .text-box-lineas p {
    font-size: 2vh;
  }

  .text-box-objetivo h1,
  .text-box-lineas h1 {
    font-size: 2.5vh;
  }
  .subtitulo-actividad h1{
      font-size: 2.7vh;
      color: #FF7001;
      font-family: 'Koulen', 'sans-serif';
      margin-top: 4vh;
  }
}
</style>
