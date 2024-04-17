<template>
  <div id="app">
    <Header></Header> <!-- Componente del encabezado -->
    
    <div class="main-content">
      <h1>NOSOTROS</h1>
      <Video :video-url="paginaNosotros.link_video"></Video> <!-- Componente del video -->
      <Family :docentes="docentes"></Family> <!-- Componente de la familia -->
      <Programs :sociedad-url="paginaNosotros.link_soc_cien" :semillas-url="paginaNosotros.link_sembrando" :psico-url="paginaNosotros.link_psico_ucb"></Programs> <!-- Componente de programas -->
    </div>
    
    <Footer :face-info="paginaNosotros.facebook" :inst-info="paginaNosotros.insta" :canal-info="paginaNosotros.youtube" :tiktok-info="paginaNosotros.tiktok" :textodire="paginaNosotros.attencion_dire"></Footer> <!-- Componente del pie de página -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Define las variables reactivas para almacenar los datos de los docentes y la información de la página
const docentes = ref([]);
const paginaNosotros = ref({
  link_video: '',
  link_soc_cien: '',
  link_sembrando: '',
  link_psico_ucb: '',
  facebook: '',
  insta: '',
  youtube: '',
  tiktok: '',
  attencion_dire: ''
});

// Función para obtener los datos de los docentes desde la base de datos
const obtenerDocentes = async () => {
  try {
    const response = await axios.get('http://tu-api.com/docentes'); // Reemplaza la URL por la de tu API
    docentes.value = response.data;
  } catch (error) {
    console.error('Error al obtener los docentes:', error);
  }
};

// Función para obtener la información de la página desde la base de datos
const obtenerInfoPagina = async () => {
  try {
    const response = await axios.get('http://tu-api.com/info-pagina'); // Reemplaza la URL por la de tu API
    paginaNosotros.value = response.data;
  } catch (error) {
    console.error('Error al obtener la información de la página:', error);
  }
};

// Llama a las funciones para obtener los datos cuando el componente se monte
onMounted(() => {
  obtenerDocentes();
  obtenerInfoPagina();
});
</script>



<style scoped>
@import url('/src/assets/nosotros.css');
</style>
