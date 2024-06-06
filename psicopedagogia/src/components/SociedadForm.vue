<template>
  <div class="mod">
    <div class="mod-content">
      <h2>Agregar Investigación</h2>
      <form @submit.prevent="submitForm">
        <div class="for-group">
          <label for="titulo">Titulo:</label><br>
          <input type="text" id="titulo" v-model="titulo" required>
        </div>
        <div class="for-group">
          <label for="comentario">Descripción:</label><br>
          <textarea id="descripcion" v-model="descripcion"></textarea>
        </div>
        <div class="for-group">
          <label for="src_foto">Foto Investigación:</label><br>
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
const descripcion = ref('');
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
    src.value = direc + currentFile.value.name;
    const formData = new FormData();
    formData.append('sampleFile', currentFile.value);

    const imageResponse = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    });

    if (imageResponse.ok) {
      const formData = new FormData();
      formData.append('titulo', titulo.value);
      formData.append('descripcion', descripcion.value);
      formData.append('foto', src.value);

      const response = await fetch('http://localhost:3000/api/investigacionSociedad', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        showSuccessModal.value = true;
        clearFields();
      } else {
        console.error('Error al guardar la investigación:', response.statusText);
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
  titulo.value = '';
  descripcion.value = '';
  currentFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = ''; 
  }
};
</script>

<style scoped>
@import url('/src/assets/formEgresados2.css');
</style>
