<template>
  <div class="modal" v-show="showForm">
    <div class="modal-content">
      <button style="margin-left: 90%;width: 9%;" class="close" @click="closeForm">&times;</button>
      <h2>Modificar Maestría</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="titulo">Título:</label><br>
          <input type="text" id="titulo" v-model="formData.titulo" required>
        </div>
        <div class="form-group">
          <label for="about">About:</label><br>
          <input type="text" id="about" v-model="formData.about" required>
        </div>
        <div class="form-group">
          <label for="competencia">Competencia:</label><br>
          <input type="text" id="competencia" v-model="formData.competencia" required>
        </div>
        <div class="form-group">
          <label for="requisitos">Requisitos:</label><br>
          <input type="text" id="requisitos" v-model="formData.requisitos" required>
        </div>
        <div class="form-group">
          <label for="fecha">Fecha:</label><br>
          <input type="date" id="fecha" v-model="formData.fecha" required>
        </div>
        <div class="form-group">
          <label for="img">Imagen:</label><br>
          <input type="file" id="img" @change="onFileChange">
        </div><br>
        <div style="text-align: center;">
          <button class="boton-guardar">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';

const props = defineProps(['maestria', 'showForm']);
const emit = defineEmits(['closeForm']);

const formData = ref({
  titulo: '',
  about: '',
  competencia: '',
  requisitos: '',
  fecha: ''
});

const currentFile = ref(null);

watch(() => props.maestria, (newMaestria) => {
  if (newMaestria) {
    formData.value = { ...newMaestria };
  }
}, { immediate: true });

const submitForm = async () => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('titulo', formData.value.titulo);
    formDataToSend.append('about', formData.value.about);
    formDataToSend.append('competencia', formData.value.competencia);
    formDataToSend.append('requisitos', formData.value.requisitos);
    formDataToSend.append('fecha', formData.value.fecha);
   
    if (currentFile.value) {
      const imagenURL = "/backend/images/" + currentFile.value.name;
      formDataToSend.append('img', imagenURL);
      formDataToSend.append('sampleFile', currentFile.value);
    }

    const response = await axios.put(`http://localhost:3000/api/maestria/${formData.value._id}`, formDataToSend);
    if (response.status === 200) {
      console.log('Maestría actualizada correctamente');
      closeForm();
    } else {
      console.error('Error al actualizar la maestría:', response.statusText);
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
};



const onFileChange = (event) => {
  const file = event.target.files[0];
  currentFile.value = file;
};

const closeForm = () => {
  emit('closeForm');
};
</script>
  
  <style scoped>
  @import url('/src/assets/formDocentes.css');
  /* Add your styles here */
  </style>
  