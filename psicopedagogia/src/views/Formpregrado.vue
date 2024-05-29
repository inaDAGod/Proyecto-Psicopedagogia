<template>
  <div>
    <div v-if="notification" class="notification">
      {{ notification }}
    </div>
    <div class="modal" v-show="showForm">
      <div class="modal-content">
        <form @submit.prevent="submitForm">
          <!-- Input fields for the form -->
          <div v-for="i in 5" :key="'videos_asignaturas_' + i" class="form-group">
            <label :for="'videos_asignaturas_' + i">Video Asignaturas {{ i }}:</label><br>
            <input type="text" :id="'videos_asignaturas_' + i" v-model="videosAsignaturas[i - 1]">
          </div>
          <div v-for="i in 5" :key="'videos_actividades_' + i" class="form-group">
            <label :for="'videos_actividades_' + i">Video Actividades {{ i }}:</label><br>
            <input type="text" :id="'videos_actividades_' + i" v-model="videosActividades[i - 1]">
          </div>
          <div v-for="i in 5" :key="'videos_perfiles_' + i" class="form-group">
            <label :for="'videos_perfiles_' + i">Video Perfiles {{ i }}:</label><br>
            <input type="text" :id="'videos_perfiles_' + i" v-model="videosPerfiles[i - 1]">
          </div>
          <div v-for="i in 5" :key="'images_' + i" class="form-group">
            <label :for="'images_' + i">Imagen {{ i }}:</label><br>
            <input type="file" :id="'images_' + i" @change="onFileChange($event, i)">
          </div>
          <div class="form-group">
            <label for="educativo">Área Educativa:</label><br>
            <input type="text" id="educativo" v-model="educativo">
          </div>
          <div class="form-group">
            <label for="imgedu">Imagen Educativa:</label><br>
            <input type="file" id="imgedu" @change="onFileChange($event)">
          </div>
          <div class="form-group">
            <label for="intercambio">Link Intercambio:</label><br>
            <input type="text" id="intercambio" v-model="intercambio">
          </div>
          <div class="form-group">
            <label for="alianza">Link Alianza:</label><br>
            <input type="text" id="alianza" v-model="alianza">
          </div>
          <div style="text-align: center;">
            <!-- Submit button -->
            <button class="boton-guardar">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const showForm = ref(true);
const notification = ref(null);

// Initialize arrays with null values instead of strings
const videosAsignaturas = ref(new Array(5).fill(null));
const videosActividades = ref(new Array(5).fill(null));
const videosPerfiles = ref(new Array(5).fill(null));
const images = ref(new Array(5).fill(null));

const educativo = ref('');
const imgedu = ref('');
const intercambio = ref('');
const alianza = ref('');

// Function to send the form data to the server
const submitForm = async () => {
  try {
    const formData = new FormData();
    for (let i = 0; i < 5; i++) {
      formData.append(`videos_asignaturas_${i + 1}`, videosAsignaturas.value[i]);
      formData.append(`videos_actividades_${i + 1}`, videosActividades.value[i]);
      formData.append(`videos_perfiles_${i + 1}`, videosPerfiles.value[i]);
      // Only append if the file object is not null
      if (images.value[i] !== null) {
        formData.append(`images_${i + 1}`, images.value[i]);
      }
    }
    formData.append('educativo', educativo.value);
    formData.append('imgedu', imgedu.value);
    formData.append('intercambio', intercambio.value);
    formData.append('alianza', alianza.value);

    const response = await axios.post('http://localhost:3000/api/pregrado', formData);

    if (response.status === 200) {
      console.log('Data updated successfully');
      notification.value = 'Actualización exitosa';
      setTimeout(() => {
        notification.value = null;
      }, 3000);
    } else {
      console.error('Error updating data:', response.statusText);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

// Function to handle file change event
const onFileChange = async (event, index) => { // Include index parameter
  try {
    const file = event.target.files[0];

    // Update the images array with the new file
    const updatedImages = [...images.value];
    updatedImages.splice(index, 1, file); // Update the index directly
    images.value = updatedImages;

    // Upload file to server (you may adjust the URL)
    const formData = new FormData();
    formData.append('sampleFile', file);

    const uploadResponse = await axios.post('http://localhost:3000/upload', formData);

    console.log(uploadResponse);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
</script>



<style scoped>
@import url('/src/assets/formPaginanos.css');

/* Notification styles */
.notification {
  background-color: #4CAF50; /* Green */
  color: white;
  padding: 15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  border-radius: 5px;
  text-align: center;
}

/* Other styles here */
</style>
