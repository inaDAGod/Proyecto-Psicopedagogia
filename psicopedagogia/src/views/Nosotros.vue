<template>
  <div id="app">
    <h1 class="titulo-nos">NOSOTROS</h1>
    <div class="video-container">
      <iframe class="video-nos" :src="getEmbeddedLink(paginaNosotros.link_video)" frameborder="0" allowfullscreen></iframe>
    </div>

    <h1 class="titulo-nos">NUESTRA FAMILIA</h1>

    <div class="doc-container">
      <div v-for="docente in docentes" :key="docente.id" class="doc-card">
        <div class="doc-info">
          <p><b>{{ docente.nombre }}</b><br><br>
          {{ docente.cargo }}<br>
          <u>{{ docente.correo }}</u><br>
          Dato curioso: {{ docente.datoc }}</p>
        </div>
        <div class="doc-avatar">
          <div class="doc-nickname">{{ docente.apodo }}</div>
          <img :src="docente.imagen" :alt="docente.nombre" class="doc-image">
        </div>
      </div>
    </div>

    <h1 class="titulo-nos">PROGRAMAS</h1>
    <div style="text-align: center; margin-bottom: 5%">
      <a :href="paginaNosotros.link_soc_cien"><button class="b-links">Sociedad Científica Estudiantil Inpsicopedia</button></a><br>
      <a :href="paginaNosotros.link_sembrando"><button class="b-links">Programa “Sembrando Semillas de Paz”</button></a><br>
      <a :href="paginaNosotros.link_psico_ucb"><button class="b-links">Psicopedagogía La Paz</button></a><br>
    </div>
    
    <footer class="footernos" style="background-color: rgba(170, 214, 251, 1)">
      <div class="footernos-container">
        <div>
          <table class="footernos-table">
            <img src="/src/assets/images/rocas.png" alt="Image Description" class="footernos-img">
            <tr class="footernos-tr">
              <td class="footernos-td">
                <a :href="paginaNosotros.facebook"><img style="margin-top: 10%;" class="imgnos" src="/src/assets/images/facebook.png" alt="Imagen del logo"></a>
              </td>
              <td class="footernos-td2">
                <p class="footernos-p" style="margin-top: 10%;">Psicopedagogía UCB La Paz</p>
              </td>
            </tr>
            <tr class="footernos-tr">
              <td class="footernos-td">
                <a :href="paginaNosotros.insta"><img class="imgnos" src="/src/assets/images/insta.png" alt="Imagen del logo"></a>
              </td>
              <td class="footernos-td">
                <p class="footernos-p">ucb.psp</p>
              </td>
            </tr>
            <tr class="footernos-tr">
              <td class="footeros-td">
                <a :href="paginaNosotros.youtube"><img class="imgnos" src="/src/assets/images/yt.png" alt="Imagen del logo"></a>
              </td>
              <td class="footernos-td">
                <p class="footernos-p">canal de youtube</p>
              </td>
            </tr>
            <tr class="footernos-tr">
              <td class="footernos-td">
                <a :href="paginaNosotros.tiktok"><img class="imgnos" src="/src/assets/images/tiktok.png" alt="Imagen del logo"></a>
              </td>
              <td class="footernos-td">
                <p class="footernos-p">psp.ucb.lapaz</p>
              </td>
            </tr>
          </table>
        </div>
        <div class="footernos-info">
          <h2 class="footernos-mainnos">Atención de Dirección de Carrera</h2>
          <p id="direcion">{{ paginaNosotros.attencion_dire }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Define the reactive variables to store data for docentes and paginaNosotros
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

// Function to fetch docentes data from the database
const obtenerDocentes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/docentes');
    docentes.value = response.data;
  } catch (error) {
    console.error('Error fetching docentes:', error);
  }
};

// Function to fetch paginaNosotros data from the database
const obtenerInfoPagina = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/info-pagina');
    paginaNosotros.value = response.data;
  } catch (error) {
    console.error('Error fetching paginaNosotros data:', error);
  }
};

const getEmbeddedLink = (link) => {
  // Verifica si el enlace es del formato "watch" y lo convierte a "embed"
  if (link.includes('youtube.com/watch')) {
    const videoId = link.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  // Si el enlace ya está en formato "embed", devuelve el mismo enlace
  return link;
};

// Call the functions to fetch data when the component is mounted
onMounted(() => {
  obtenerDocentes();
  obtenerInfoPagina();
});
</script>

<style scoped>
@import url('/src/assets/nosotros.css');

.doc-card {
  display: flex;
  align-items: center;
  background-color: rgba(255, 206, 232, 1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  text-align: left;
  width: 100%;
  max-width: 550px;
  margin-bottom: 3%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-top-right-radius: 280px; /* Adjust this value as needed to make it circular */
  border-bottom-right-radius: 280px; /* Adjust this value as needed to make it circular */
  height: 270px;
}

.doc-info {
  flex: 3; /* 60% of the card */
  margin-right: 25px;
  width: 60%;
  padding: 10% 25px 3% 3%; /* Top, right, bottom, left padding */
  margin-top: -10%;
  font-family: 'Roboto Condensed', sans-serif; /* Correctly formatted font-family */
}


.doc-avatar {
  position: relative;
  flex: 2; /* 40% of the card */
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.doc-nickname {
  position: absolute;
  top: -5px;
  left: 75%;
  transform: translateX(-50%);
  background-color: rgba(255, 42, 157, 1);
  color: white;
  padding: 3% 5%;
  padding-left: 12%;
  padding-right: 12%;
  font-size: 23px;
  border-radius: 20px;
  text-align: center;
  font-family: 'Oswald', sans-serif;
}

.doc-image {
  width: 270px;
  height: 270px;
  border-radius: 50%; /* Match the card's border-radius */
  object-fit: cover;
  margin-left: -10%;
}

.doc-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch; /* Ensure all items stretch to the same height */
}

.doc-item {
  flex: 1 1 calc(33% - 20px);
  margin: 10px;
}


</style>
