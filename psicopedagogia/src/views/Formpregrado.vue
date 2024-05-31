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
          <div class="row">
            <div v-for="i in 4" :key="'images_' + i" class="col-md-6">
              <div class="form-group">
                <label style="margin-right: -11%;" :for="'images_' + i">Imagen {{ i }}:</label>
                <input type="file" :id="'images_' + i" @change="onFileChange($event, i)">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label style="margin-right: -11%;" for="images_5">Imagen 5:</label>
                <input type="file" id="images_5" @change="onFileChange($event, 5)">
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="educativo">Área Educativa:</label><br>
            <textarea style="width: 100%;" id="educativo" v-model="educativo" rows="4" required></textarea>
          </div>
          <div class="form-group">
            <label for="imgedu" style="margin-left: -78%;">Imagen Educativa:</label><br>
            <input type="file" style="margin-left: -55%;" id="imgedu" @change="onFileChange($event)">
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
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Define direc variable
const direc = "/backend/images/";

const currentFile = ref(null);
const showForm = ref(true);
const notification = ref(null);
const videosAsignaturas = ref(new Array(5).fill(''));
const videosActividades = ref(new Array(5).fill(''));
const videosPerfiles = ref(new Array(5).fill(''));
const images = ref(new Array(5).fill(''));
const educativo = ref('');
const imgedu = ref('');
const intercambio = ref('');
const alianza = ref('');

// Function to fetch data from the database
const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/pregrado');
    if (response.status === 200) {
      const data = response.data;
      console.log('Fetched data:', data);

      // Update variables with fetched data, ensuring arrays are filled correctly
      videosAsignaturas.value = [
        data.videos_asignaturas_1 || '',
        data.videos_asignaturas_2 || '',
        data.videos_asignaturas_3 || '',
        data.videos_asignaturas_4 || '',
        data.videos_asignaturas_5 || ''
      ];

      videosActividades.value = [
        data.videos_actividades_1 || '',
        data.videos_actividades_2 || '',
        data.videos_actividades_3 || '',
        data.videos_actividades_4 || '',
        data.videos_actividades_5 || ''
      ];

      videosPerfiles.value = [
        data.videos_perfiles_1 || '',
        data.videos_perfiles_2 || '',
        data.videos_perfiles_3 || '',
        data.videos_perfiles_4 || '',
        data.videos_perfiles_5 || ''
      ];

      images.value = [
        data.images_1 ? direc + data.images_1 : '',
        data.images_2 ? direc + data.images_2 : '',
        data.images_3 ? direc + data.images_3 : '',
        data.images_4 ? direc + data.images_4 : '',
        data.images_5 ? direc + data.images_5 : ''
      ];

      educativo.value = data.educativo || '';
      imgedu.value = data.imgedu ? direc + data.imgedu : '';
      intercambio.value = data.intercambio || '';
      alianza.value = data.alianza || '';
    } else {
      console.error('Error fetching data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Fetch data when the component is mounted
onMounted(fetchData);

const submitForm = async () => {
  try {
    if (currentFile.value) {
      imgedu.value = direc + currentFile.value.name;

      const formData = new FormData();
      formData.append('sampleFile', currentFile.value);

      await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      });
    }

    const formData = new FormData();
    for (let i = 0; i < 5; i++) {
      formData.append(`videos_asignaturas_${i + 1}`, videosAsignaturas.value[i]);
      formData.append(`videos_actividades_${i + 1}`, videosActividades.value[i]);
      formData.append(`videos_perfiles_${i + 1}`, videosPerfiles.value[i]);
      if (images.value[i]) {
        formData.append(`images_${i + 1}`, images.value[i].replace(direc, ''));
      }
    }
    formData.append('educativo', educativo.value);
    formData.append('imgedu', imgedu.value.replace(direc, ''));
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

const onFileChange = (event, index) => {
  const file = event.target.files[0];
  images.value[index - 1] = direc + file.name;
  currentFile.value = file;
};
</script>

<style scoped>
@import url('/src/assets/formPregrado.css');

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
