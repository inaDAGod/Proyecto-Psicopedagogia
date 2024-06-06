<template>
  <div class="mod">
    <div class="mod-content">
      <h2>Agregar Nueva Red</h2>
      <form @submit.prevent="submitForm">
        <div class="for-group">
          <label for="titulo">Titulo:</label><br>
          <input type="text" id="titulo" v-model="titulo" required>
        </div>
        <div class="for-group">
          <label for="link">Link externo:</label><br>
          <input type="text" id="link" v-model="link">
        </div>
        <div class="for-group">
          <label for="src_foto">Foto Red:</label><br>
          <input type="file" id="src" @change="onFileChange" ref="fileInput" required>
        </div>
        <div style="text-align: center;">
          <button class="bot-guardar">Guardar</button>
        </div>
      </form>
    </div>
    <SuccessEdit
      v-if="showSuccessModal"
      @onClose="closeSuccessModal"
      :message="'La investigación ha sido agregada correctamente'"
      :titulo="'Investigación agregada'"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import SuccessEdit from '/src/components/ModalNoti.vue'; 

const showSuccessModal = ref(false); 
const titulo = ref('');
const link = ref('');
const src = ref('');
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
    src.value = direc + currentFile.value.name;
    const formData = new FormData();
    formData.append('sampleFile', currentFile.value);
    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    }).then(async (res) => {
      console.log(res);
      const formData = new FormData(); // Crear objeto FormData para enviar archivos
      formData.append('titulo', titulo.value);
      formData.append('link', link.value);
      formData.append('foto', src.value); 
      const response = await fetch('http://localhost:3000/api/red', {
        method: 'POST',
        body: formData // Pasar el formData como cuerpo de la solicitud
      });
      if (response.ok) {
        console.log('Red guardada correctamente');
        showSuccessModal.value = true;
        clearFields();
      } else {
        console.error('Error al guardar la red:', response.statusText);
      }
    });
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
  titulo.value = '';
  link.value = '';
  src.value = '';
  currentFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = ''; 
  }
};
</script>

<style scoped>
@import url('/src/assets/formEgresados2.css');
</style>
