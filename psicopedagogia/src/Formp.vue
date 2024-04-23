<template>
  <center>
    <div class="modal" v-show="showForm">
      <div class="modal-content">
        <button style="margin-left: 90%;width: 9%;" class="close" @click="closeForm">&times;</button>
        <h2>{{ existingDataId ? 'Modificar Datos' : 'NOSOTROS' }}</h2>
        <form @submit.prevent="submitForm">
          <!-- Input fields para el formulario -->
          <div class="form-group">
            <label for="link_video">Link del Video:</label><br>
            <input type="text" id="link_video" v-model="link_video" required>
          </div>
          <div class="form-group">
            <label for="link_soc_cien">Link Soc. Científica:</label><br>
            <input type="text" id="link_soc_cien" v-model="link_soc_cien" required>
          </div>
          <div class="form-group">
            <label for="link_sembrando">Link Sembrando:</label><br>
            <input type="text" id="link_sembrando" v-model="link_sembrando" required>
          </div>
          <div class="form-group">
            <label for="link_psico_ucb">Link Psico UCB:</label><br>
            <input type="text" id="link_psico_ucb" v-model="link_psico_ucb" required>
          </div>
          <h1>Redes:</h1>
          <div class="form-group">
            <img style="width: 12%;" src="/src/assets/images/facebook.png" alt="Imagen del logo">
            <input type="text" id="facebook" v-model="facebook" required>
          </div>
          <div class="form-group">
            <img style="width: 12%;" src="/src/assets/images/insta.png" alt="Imagen del logo">
            <input type="text" id="insta" v-model="insta" required>
          </div>
          <div class="form-group">
            <img style="width: 15%;height: 20%;" src="/src/assets/images/yt.png" alt="Imagen del logo">
            <input type="text" id="youtube" v-model="youtube" required>
          </div>
          <div class="form-group">
            <img style="width: 12%;" src="/src/assets/images/tiktok.png" alt="Imagen del logo">
            <input type="text" id="tiktok" v-model="tiktok" required>
          </div>
          <div class="form-group">
            <label for="attencion_dire">Atención Dirección:</label><br>
            <textarea style="width: 100%;" id="attencion_dire" v-model="attencion_dire" rows="4" required></textarea>
          </div>
          <div style="text-align: center;">
            <!-- Botón para enviar el formulario -->
            <button class="boton-guardar">{{ existingDataId ? 'Modificar' : 'Guardar' }}</button>
          </div>
        </form>
      </div>
    </div>
  </center>
</template>

<script setup>
import { ref, defineProps } from 'vue';

// Variables reactivas para los campos del formulario
const link_video = ref('');
const link_soc_cien = ref('');
const link_sembrando = ref('');
const link_psico_ucb = ref('');
const facebook = ref('');
const insta = ref('');
const youtube = ref('');
const tiktok = ref('');
const attencion_dire = ref('');
const showForm = ref(true);
const existingDataId = ref(null); // Add a reactive variable to store the ID of existing data

const props = defineProps({
  onclose: Function,
  // Add a prop to receive the existing data ID
  existingDataId: {
    type: String,
    default: null
  }
});

// Populate form fields if existing data ID is provided
if (props.existingDataId) {
  fetchExistingData(props.existingDataId);
}

// Función para enviar el formulario al servidor
const submitForm = async () => {
  try {
    const formData = new FormData(); // Create FormData object to send data
    formData.append('link_video', link_video.value);
    formData.append('link_soc_cien', link_soc_cien.value);
    formData.append('link_sembrando', link_sembrando.value);
    formData.append('link_psico_ucb', link_psico_ucb.value);
    formData.append('facebook', facebook.value);
    formData.append('insta', insta.value);
    formData.append('youtube', youtube.value);
    formData.append('tiktok', tiktok.value);
    formData.append('attencion_dire', attencion_dire.value);

    // Send the FormData with the existingDataId as part of the URL for PUT or PATCH request
    const method = existingDataId.value ? 'PUT' : 'POST';
    const url = existingDataId.value ? `http://localhost:3000/api/pagina_nosotros/${existingDataId.value}` : 'http://localhost:3000/api/pagina_nosotros';

    const response = await fetch(url, {
      method: method,
      body: formData
    });

    if (response.ok) {
      console.log('Datos guardados correctamente');
      closeForm();
    } else {
      console.error('Error al guardar los datos:', response.statusText);
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
};

// Función para cerrar el formulario
const closeForm = () => {
  props.onclose();
};

// Función para fetch los datos existentes basados en el ID
// Populate form fields if existing data ID is provided


// Función para fetch los datos existentes basados en el ID
const fetchExistingData = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/info-pagina`);
    if (response.ok) {
      const data = await response.json();
      // Populate form fields with existing data
      link_video.value = data.link_video;
      link_soc_cien.value = data.link_soc_cien;
      link_sembrando.value = data.link_sembrando;
      link_psico_ucb.value = data.link_psico_ucb;
      facebook.value = data.facebook;
      insta.value = data.insta;
      youtube.value = data.youtube;
      tiktok.value = data.tiktok;
      attencion_dire.value = data.attencion_dire;
    } else {
      console.error('Error fetching existing data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching existing data:', error);
  }
};


</script>

<style scoped>
/* Your styles here */
</style>
<style scoped>
@import url('.\assets\formPaginanos.css');
</style>
