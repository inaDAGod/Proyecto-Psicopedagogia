<template>
  <div class="mod">
    <div class="mod-content">
      <h2>Agregar Nuevo Egresado</h2>
      <form @submit.prevent="submitForm">
        <!-- Input fields para el formulario -->
        <div class="for-group">
          <label for="nombre">Nombre:</label><br>
          <input type="text" id="nombre" v-model="nombre" required>
        </div>
        <div class="for-group">
          <label for="correo">Correo:</label><br>
          <input type="email" id="correo" v-model="correo" required>
        </div>
        <div class="for-group">
          <label for="anio_graduacion">Año de Graduación:</label><br>
          <input type="number" id="anio_graduacion" v-model="anioGraduacion" required>
        </div>
        <div class="for-group">
          <label for="trabajo">Trabajo Actual:</label><br>
          <input type="text" id="trabajo" v-model="trabajo" required>
        </div>
        <div class="for-group">
          <label for="comentario">Comentario:</label><br>
          <textarea id="comentario" v-model="comentario"></textarea>
        </div>
        <div class="for-group">
          <label for="src_foto">Foto egresado:</label><br>
          <input type="file" id="src_foto" @change="onFileChange" ref="fileInput" required>
        </div>
        <div style="text-align: center;">
          <!-- Botón para enviar el formulario -->
          <button class="bot-guardar">Guardar</button>
        </div>
      </form>
    </div>
    <SuccessEdit v-if="showSuccessModal" @onClose="closeSuccessModal" :message="'El egresado ha sido agregado correctamente'" :titulo="'Agregado exitosamente'"></SuccessEdit>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import SuccessEdit from '/src/components/ModalNoti.vue'; 

const showSuccessModal = ref(false); 
const nombre = ref('');
const correo = ref('');
const anioGraduacion = ref('');
const trabajo = ref('');
const comentario = ref('');
const src_foto = ref('');
const showForm = ref(true);
const currentFile = ref(null);
const fileInput = ref(null); // Referencia al input de archivo

const props = defineProps({
  onclose: Function,
});

// Función para enviar el formulario al servidor
const submitForm = async () => {
  try {
    const direc = "/backend/images/";
    console.log(currentFile.value);
    src_foto.value = direc + currentFile.value.name;
    const formData = new FormData();
    formData.append('sampleFile', currentFile.value);

    const imageResponse = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    });

    if (imageResponse.ok) {
      const formData = new FormData();
      formData.append('nombre', nombre.value);
      formData.append('correo', correo.value);
      formData.append('anio_graduacion', anioGraduacion.value);
      formData.append('trabajo', trabajo.value);
      formData.append('comentario', comentario.value);
      formData.append('foto', src_foto.value);

      const response = await fetch('http://localhost:3000/api/egresados', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('Egresado guardado correctamente');
        showSuccessModal.value = true;
        clearFields();
      } else {
        console.error('Error al guardar el egresado:', response.statusText);
      }
    } else {
      console.error('Error al subir la imagen:', imageResponse.statusText);
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
};

// Función para manejar el cambio de archivo
const onFileChange = (event) => {
  const file = event.target.files[0];
  currentFile.value = file;
};

// Función para cerrar el formulario
const closeForm = () => {
  props.onclose();
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  closeForm();
};

const clearFields = () => {
  nombre.value = '';
  correo.value = '';
  anioGraduacion.value = '';
  trabajo.value = '';
  comentario.value = '';
  src_foto.value = '';
  currentFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = ''; 
  }
};
</script>

<style scoped>
@import url('/src/assets/formEgresados2.css');
</style>
