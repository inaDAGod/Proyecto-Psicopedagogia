<template>
  <div class="modal">
    <div class="modal-content">
      <button class="close" @click="closeForm">&times;</button>
      <h2>Editar publicación</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="titulo">Titulo:</label><br>
          <input type="text" id="titulo" v-model="titulo" required>
        </div>
        <div class="form-group">
          <label for="autor">Autor:</label><br>
          <input type="text" id="autor" v-model="autor" required>
        </div>
        <div class="form-group">
          <label for="descripcion">Descripcion:</label><br>
          <textarea id="descripcion" v-model="descripcion"></textarea>
        </div>
        <div class="form-group">
          <label for="anio">Año:</label><br>
          <input type="number" id="anio" v-model="anio" required>
        </div>
        <div class="form-group">
            <label for="publicacion_src">Portada:</label><br>
            <input type="file" id="src" @change="onFileChange">
        </div>
        <div class="form-group">
          <label for="ruta">Ruta:</label><br>
          <input type="text" id="ruta" v-model="ruta" required>
        </div>
        <div style="text-align: center;">
          <button class="boton-guardar" type="submit">Guardar</button>
          <br><br><br><br>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, onMounted, computed } from 'vue';
import axios from 'axios';

const props = defineProps({
  publicacion: Object,
});

const emit = defineEmits(['onclose']);
const id = ref('');
const titulo = ref('');
const autor = ref('');
const descripcion = ref('');
const anio = ref('');
const ruta = ref('');
const currentFile = ref(null);

watch(props, () => {
  if (props.publicacion) {
    titulo.value = props.publicacion.titulo;
    autor.value = props.publicacion.autor;
    descripcion.value = props.publicacion.descripcion;
    anio.value = props.publicacion.anio;
    ruta.value = props.publicacion.ruta;
    id.value = props.publicacion._id;
  }
});

const submitForm = async () => {
  try {
    const direc = "/backend/images/";
    let portadaN = props.publicacion.publicacion_src; 

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

      portadaN = direc + currentFile.value.name; 
    }

    const formData = new FormData();
    formData.append('id', id.value);
    formData.append('titulo', titulo.value);
    formData.append('autor', autor.value);
    formData.append('descripcion', descripcion.value);
    formData.append('anio', anio.value);
    formData.append('ruta', ruta.value);
    formData.append('portada', portadaN);

    const response = await fetch('http://localhost:3000/api/publicacionesUpdate', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      console.log('Actualizado correctamente');
      closeForm();
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
</script>

<style scoped>
@import url('/src/assets/formEditar1.css');
</style>
