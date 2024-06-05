<template>
  <div class="mod">
    <div class="mod-content">
      <button class="clo" @click="closeForm">&times;</button>
      <h2>Editar Red</h2>
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
          <input type="file" id="src" @change="onFileChange">
        </div>
        <div style="text-align: center;">
          <button class="bot-guardar">Guardar</button>
          <br><br><br><br><br><br>
          <button class="bot-borrar" @click.prevent="showDeleteModal"><img src="/src/assets/images/trash2.png" width="20vh" height="auto"></button>
        </div>
      </form>
    </div>
    <delete-confirmation-red :red="props.red" :showForm="showDeleteForm" @closeForm="closeDeleteModal" @redEliminado="handleRedEliminado" />
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import axios from 'axios';
import DeleteConfirmationRed from './ModEliminarRed.vue';

const props = defineProps({
  red: Object,
});

const emit = defineEmits(['onclose', 'redEliminado']);

const titulo = ref('');
const link = ref('');
const index = ref('');
const currentFile = ref(null);
const showDeleteForm = ref(false); // Nueva referencia para mostrar el modal de eliminación

watch(props, () => {
  if (props.red) {
    titulo.value = props.red.titulo;
    link.value = props.red.link;
    index.value = props.red._id;
  }
});

const submitForm = async () => {
  try {
    const direc = "/backend/images/";
    let imageSrc = props.red.src;

    if (currentFile.value) {
      const formDataImage = new FormData();
      formDataImage.append('sampleFile', currentFile.value);

      const imageResponse = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formDataImage
      });

      if (!imageResponse.ok) {
        throw new Error('Error al subir la imagen');
      }

      const responseData = await imageResponse.json();
      imageSrc = direc + currentFile.value.name;
    }

    const formData = new FormData();
    formData.append('index', index.value);
    formData.append('titulo', titulo.value);
    formData.append('link', link.value);
    formData.append('foto', imageSrc);

    const response = await fetch('http://localhost:3000/api/redUpdate', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      console.log('Red actualizada correctamente');
      closeForm();
    } else {
      console.error('Error al actualizar la red:', response.statusText);
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
};

const showDeleteModal = () => {
  showDeleteForm.value = true;
};

const closeDeleteModal = () => {
  showDeleteForm.value = false;
};

const handleRedEliminado = () => {
  emit('redEliminado');
  closeForm();
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  currentFile.value = file;
};

const closeForm = () => {
  emit('onclose');
};
</script>

<style scoped>
@import url('/src/assets/formEgresados.css');
</style>
