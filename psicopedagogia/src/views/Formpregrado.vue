<template>
  <div>
    <div v-if="notification" class="notification">
      {{ notification }}
    </div>
    <div class="modal" v-show="showForm">
      <div class="modal-content">
        <form @submit.prevent="submitForm">
          <!-- Input field for link_malla -->
          <div class="form-group">
            <label for="link_malla">Link Malla:</label><br>
            <input type="text" id="link_malla" v-model="linkMalla" required>
          </div>
          
          <!-- Input fields for videos_asignaturas -->
          <div v-for="i in 5" :key="'videos_asignaturas_' + i" class="form-group">
            <label :for="'videos_asignaturas_' + i">Video Asignaturas {{ i }}:</label><br>
            <input type="text" :id="'videos_asignaturas_' + i" v-model="videosAsignaturas[i - 1]">
          </div>

          <!-- Input fields for videos_actividades -->
          <div v-for="i in 5" :key="'videos_actividades_' + i" class="form-group">
            <label :for="'videos_actividades_' + i">Video Actividades {{ i }}:</label><br>
            <input type="text" :id="'videos_actividades_' + i" v-model="videosActividades[i - 1]">
          </div>

          <!-- Input fields for videos_perfiles -->
          <div v-for="i in 5" :key="'videos_perfiles_' + i" class="form-group">
            <label :for="'videos_perfiles_' + i">Video Perfiles {{ i }}:</label><br>
            <input type="text" :id="'videos_perfiles_' + i" v-model="videosPerfiles[i - 1]">
          </div>

          <!-- Input fields for images -->
          <div class="row">
            <div v-for="i in 5" :key="'images_' + i" class="col-md-6">
              <div class="form-group">
                <label :for="'images_' + i">Imagen {{ i }}:</label>
                <input type="file" :id="'images_' + i" @change="(event) => onFileChange(event, 'images_' + i)">
              </div>
            </div>
          </div>

          <!-- Input field for educativo -->
          <div class="form-group">
            <label for="educativo">Área Educativa:</label><br>
            <textarea id="educativo" v-model="educativo" rows="4" required></textarea>
          </div>

          <!-- Input field for imgedu -->
          <div class="form-group">
            <label for="imgedu">Imagen Educativa:</label><br>
            <input type="file" id="imgedu" @change="(event) => onFileChange(event, 'imgedu')">
          </div>

          <!-- Input field for intercambio -->
          <div class="form-group">
            <label for="intercambio">Link Intercambio:</label><br>
            <input type="text" id="intercambio" v-model="intercambio">
          </div>

          <!-- Input field for alianza -->
          <div class="form-group">
            <label for="alianza">Link Alianza:</label><br>
            <input type="text" id="alianza" v-model="alianza">
          </div>

          <!-- Submit button -->
          <div style="text-align: center;">
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

const direc = "/src/assets/images/";

const currentFile = ref(null);
const showForm = ref(true);
const notification = ref(null);
const linkMalla = ref('');
const videosAsignaturas = ref(new Array(5).fill(''));
const videosActividades = ref(new Array(5).fill(''));
const videosPerfiles = ref(new Array(5).fill(''));
const images = ref(new Array(5).fill(null));
const educativo = ref('');
const imgedu = ref(null);
const intercambio = ref('');
const alianza = ref('');

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/pregrado');
    if (response.status === 200) {
      const data = response.data;
      linkMalla.value = data.link_malla || '';
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
        data.images_1 ? direc + data.images_1 : null,
        data.images_2 ? direc + data.images_2 : null,
        data.images_3 ? direc + data.images_3 : null,
        data.images_4 ? direc + data.images_4 : null,
        data.images_5 ? direc + data.images_5 : null
      ];
      educativo.value = data.educativo || '';
      imgedu.value = data.imgedu ? direc + data.imgedu : null;
      intercambio.value = data.intercambio || '';
      alianza.value = data.alianza || '';
    } else {
      console.error('Error fetching data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(fetchData);

const submitForm = async () => {
  try {
    const formData = new FormData();
    formData.append('link_malla', linkMalla.value);
    for (let i = 0; i < 5; i++) {
      formData.append(`videos_asignaturas_${i + 1}`, videosAsignaturas.value[i]);
      formData.append(`videos_actividades_${i + 1}`, videosActividades.value[i]);
      formData.append(`videos_perfiles_${i + 1}`, videosPerfiles.value[i]);
      if (images.value[i]) {
        formData.append(`images_${i + 1}`, images.value[i]);
      }
    }
    if (imgedu.value) {
      formData.append('imgedu', imgedu.value);
    }
    formData.append('educativo', educativo.value);
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

const onFileChange = async (event, imageName) => {
  const file = event.target.files[0];
  if (file) {
    const formDataImage = new FormData();
    formDataImage.append('sampleFile', file);

    const imageResponse = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formDataImage
    });

    if (!imageResponse.ok) {
      console.error(`Error al subir la imagen ${imageName}`);
      return;
    }

    const imageUrl = direc + file.name;
    switch (imageName) {
      case 'images_1':
        images.value[0] = imageUrl;
        break;
      case 'images_2':
        images.value[1] = imageUrl;
        break;
      case 'images_3':
        images.value[2] = imageUrl;
        break;
      case 'images_4':
        images.value[3] = imageUrl;
        break;
      case 'images_5':
        images.value[4] = imageUrl;
        break;
      case 'imgedu':
        imgedu.value = imageUrl;
        break;
      default:
        break;
    }
  }
};
</script>

<style scoped>
@import url('/src/assets/formPregrado.css');

.notification {
  background-color: #4CAF50;
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
</style>
