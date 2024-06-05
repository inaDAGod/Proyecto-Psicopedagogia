<template>
    <div class="modal">
      <div class="modal-content">
        <button class="close" @click="closeForm">&times;</button>
        <h2>Editar noticia</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="noticia">Noticia:</label><br>
            <input type="text" id="noticia" v-model="noticia" required>
          </div>
          <div class="form-group">
            <label for="contenido">Contenido:</label><br>
            <textarea id="contenido" v-model="contenido"></textarea>
          </div>
          <div class="form-group">
            <label for="fecha">Fecha:</label><br>
            <input type="date" id="fecha" v-model="fecha" required>
          </div>
          <div class="form-group">
            <label for="noticia_src">Imagen:</label><br>
            <input type="file" id="src" @change="onFileChange">
          </div>
          <div style="text-align: center;">
            <button class="boton-guardar" type="submit">Guardar</button>
            <br><br><br><br>
          </div>
        </form>
        <SuccessEdit v-if="showSuccessModal" @onClose="closeSuccessModal" :message="'La noticia ha sido actualizada correctamente'"></SuccessEdit>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue';
  import axios from 'axios';
  import SuccessEdit from '/src/components/SuccessEditModal.vue';
  
  const props = defineProps({
    noticias: Object,
  });
  
  const emit = defineEmits(['onclose']);
  const id = ref('');
  const noticia = ref('');
  const fecha = ref('');
  const contenido = ref('');
  const currentFile = ref(null);
  const showSuccessModal = ref(false);
  
  // Initialize form data when props.actividades changes
  watch(
    () => props.noticias,
    (newNoticia) => {
      if (newNoticia) {
        id.value = newNoticia._id || '';
        noticia.value = newNoticia.noticia || '';
        fecha.value = newNoticia.fecha || '';
        contenido.value = newNoticia.contenido || '';
      }
    },
    { immediate: true }
  );
  
  const submitForm = async () => {
    try {
      const direc = "/backend/images/";
      let imagenN = props.noticias.noticia_src;
  
      if (currentFile.value) {
        const formDataImage = new FormData();
        formDataImage.append('sampleFile', currentFile.value);
  
        const imageResponse = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formDataImage,
        });
  
        if (!imageResponse.ok) {
          throw new Error('Error al subir la imagen');
        }
  
        imagenN = direc + currentFile.value.name;
      }
  
      const formData = new FormData();
      formData.append('id', id.value);
      formData.append('noticia', noticia.value);
      formData.append('fecha', fecha.value);
      formData.append('contenido', contenido.value);
      formData.append('imagenN', imagenN);
  
      const response = await fetch('http://localhost:3000/api/noticiasUpdate', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Actualizado correctamente');
        showSuccessModal.value = true;
      } else {
        console.error('Error al actualizar:', response.statusText);
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
    emit('onclose');
  };
  
  const closeSuccessModal = () => {
    showSuccessModal.value = false;
    closeForm();
  };
  </script>
  
  <style scoped>
  @import url('/src/assets/formEditar1.css');
  </style>
  