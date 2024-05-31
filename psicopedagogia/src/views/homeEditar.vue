<template>
  <div class="cuadro">
    <div class="formDatos">
      <h2 class="tit-principal">Inicio</h2>
      <div class="modifi">
        <div class="modal-content">
          <h2>Información principal</h2>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="quienes_somos">¿Quienes somos?</label><br>
              <textarea id="quienes_somos" :disabled="!editar" v-model="quienes_somos"></textarea>
            </div>
            <div class="form-group">
              <label for="mision">Misión</label><br>
              <textarea id="mision" :disabled="!editar" v-model="mision"></textarea>
            </div>
            <div class="form-group">
              <label for="vision">Visión</label><br>
              <textarea id="vision" :disabled="!editar" v-model="vision"></textarea>
            </div>
            <div class="form-group">
              <label for="perfil_estudiante">Perfil estudiante</label><br>
              <textarea id="perfil_estudiante" :disabled="!editar" v-model="perfil_estudiante"></textarea>
            </div>
            <div class="images-section">
              <h2>Imágenes del Carrusel</h2>
              <br><br>
              <div class="images-carrusel">
                <div class="carrusel-primer">
                  <div class="form-group">
                    <label for="img1">Imagen 1: </label>
                    <img :src="img1" alt="Imagen 1">
                    <input type="file" :disabled="!editar" @change="onFileChange($event, 'img1')">
                  </div>
                  <br>
                  <div class="form-group">
                    <label for="img2">Imagen 2: </label>
                    <img :src="img2" alt="Imagen 2">
                    <input type="file" :disabled="!editar" @change="onFileChange($event, 'img2')">
                  </div>
                  <br>
                  <div class="form-group">
                    <label for="img3">Imagen 3: </label>
                    <img :src="img3" alt="Imagen 3">
                    <input type="file" :disabled="!editar" @change="onFileChange($event, 'img3')">
                  </div>
                  <br>
                </div>
                <div class="carrusel-segundo">
                  <div class="form-group">
                    <label for="img4">Imagen 4: </label>
                    <img :src="img4" alt="Imagen 4">
                    <input type="file" :disabled="!editar" @change="onFileChange($event, 'img4')">
                  </div>
                  <br>
                  <div class="form-group">
                    <label for="img5">Imagen 5: </label>
                    <img :src="img5" alt="Imagen 5">
                    <input type="file" :disabled="!editar" @change="onFileChange($event, 'img5')">
                  </div>
                  <br>
                  <div class="form-group">
                    <label for="img6">Imagen 6: </label>
                    <img :src="img6" alt="Imagen 6">
                    <input type="file" :disabled="!editar" @change="onFileChange($event, 'img6')">
                  </div>
                  <br>
                </div>
              </div>
              <br><br>
              <h2>Imágenes de Información Adicional</h2>
              <br><br>
              <div class="form-group">
                <label for="imgMision">Imagen Misión: </label><br>
                <img :src="imgMision" alt="Imagen Misión">
                <input type="file" :disabled="!editar" @change="onFileChange($event, 'imgMision')">
              </div>
              <div class="form-group">
                <label for="imgVision">Imagen Visión: </label><br>
                <img :src="imgVision" alt="Imagen Visión">
                <input type="file" :disabled="!editar" @change="onFileChange($event, 'imgVision')">
              </div>
              <div class="form-group">
                <label for="imgPerfil">Imagen Perfil de Estudiante:</label><br>
                <img :src="imgPerfil" alt="Imagen Perfil de Estudiante">
                <input type="file" :disabled="!editar" @change="onFileChange($event, 'imgPerfil')">
              </div>
            </div>

            <div style="text-align: center;">
              <button v-if="!mostrarBotonGuardar && !editar" class="boton-guardar" @click="editar = true">Editar</button>
              <button v-if="editar" class="boton-guardar" @click="guardarCambios">Guardar</button>
            </div>
          </form>
        </div>
        <SuccessEdit v-if="showSuccessModal" @onClose="closeSuccessModal" :message="'El inicio principal ha sido actualizado correctamente'"></SuccessEdit>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SuccessEdit from '/src/components/SuccessEditModal.vue';

let home = ref([]);
let id = ref('');
let quienes_somos = ref('');
let mision = ref('');
let vision = ref('');
let perfil_estudiante = ref('');
let imgMision = ref('');
let imgVision = ref('');
let imgPerfil = ref('');
let img1 = ref('');
let img2 = ref('');
let img3 = ref('');
let img4 = ref('');
let img5 = ref('');
let img6 = ref('');
let editar = ref(false);
let mostrarBotonGuardar = ref(false);
const showSuccessModal = ref(false); 

const obtenerHome = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/home');
    home.value = response.data;
    id.value = response.data._id;
    quienes_somos.value = response.data.quienes_somos;
    mision.value = response.data.mision;
    vision.value = response.data.vision;
    perfil_estudiante.value = response.data.perfil_estudiante;
    imgMision.value = response.data.mision_src;
    imgVision.value = response.data.vision_src;
    imgPerfil.value = response.data.perfil_estudiante_src;
    img1.value= response.data.imagen1;
    img2.value= response.data.imagen2;
    img3.value= response.data.imagen3;
    img4.value= response.data.imagen4;
    img5.value= response.data.imagen5;
    img6.value= response.data.imagen6;
  } catch (error) {
    console.error('Error fetching principal:', error);
  }
};

const guardarCambios = async () => {
  try {
  const formData = new FormData();
  formData.append('id', id.value);
  formData.append('quienes_somos', quienes_somos.value);
  formData.append('mision', mision.value);
  formData.append('vision', vision.value);
  formData.append('perfil_estudiante',  perfil_estudiante.value);
  formData.append('imgMision', imgMision.value);
  formData.append('imgVision', imgVision.value);
  formData.append('imgPerfil', imgPerfil.value);
  formData.append('img1', img1.value);
  formData.append('img2', img2.value);
  formData.append('img3', img3.value);
  formData.append('img4', img4.value);
  formData.append('img5', img5.value);
  formData.append('img6', img6.value);
  const response = await fetch('http://localhost:3000/api/homeUpdate', {
    method: 'POST',
    body: formData
  });
  
  if (response.ok) {
    console.log('Informacion principal actualizada correctamente');
    editar.value = false; 
    showSuccessModal.value = true;
  } else {
    console.error('Error al actualizar :', response.statusText);
  }
} catch (error) {
  console.error('Error al enviar el formulario:', error);
}
};
const onFileChange = async (event, imageName) => {
  const file = event.target.files[0];
  const direc = "/backend/images/";
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
      if (imageName === 'img1') img1.value = imageUrl;
      if (imageName === 'img2') img2.value = imageUrl;
      if (imageName === 'img3') img3.value = imageUrl;
      if (imageName === 'img4') img4.value = imageUrl;
      if (imageName === 'img5') img5.value = imageUrl;
      if (imageName === 'img6') img6.value = imageUrl;
      v
      if (imageName === 'imgMision') imgMision.value = imageUrl;
      if (imageName === 'imgVision') imgVision.value = imageUrl;
      if (imageName === 'imgPerfil') imgPerfil.value = imageUrl;
    
  }
};
const closeSuccessModal = () => {
  showSuccessModal.value = false;
};
onMounted(() => {
  obtenerHome();
});
</script>

<style scoped>
@import url('/src/assets/formEditPrincipal.css');
</style>
