<template>
    <div class="mod">
      <div class="mod-content">
        <button class="clo" @click="closeForm">&times;</button>
        <h2>Editar Investigacion</h2>
        <form @submit.prevent="submitForm">
          <div class="for-group">
            <label for="titulo">Titulo:</label><br>
            <input type="text" id="titulo" v-model="titulo" required>
          </div>
          <div class="for-group">
            <label for="descripcion">Descripcion:</label><br>
            <textarea id="descripcion" v-model="descripcion"></textarea>
          </div>
          <div class="for-group">
            <label for="src_foto">Foto Investigacion:</label><br>
            <input type="file" id="src" @change="onFileChange">
          </div>
          <div style="text-align: center;">
            <button class="bot-guardar" @click="">Guardar</button>
            <br><br><br><br>
          
          </div>
        </form>
        <div style="text-align: center;">
          <button class="bot-borrar" @click="borrarInvestigacion()"><img src="/src/assets/images/trash2.png" width="20vh" height="auto"></button>
        </div>
        
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue';
  import axios from 'axios';
  
  const props = defineProps({
    investigacion: Object,
  });
  
  const emit = defineEmits(['onclose']);
  const index = ref('');
  const titulo = ref('');
  const descripcion = ref('');
  const currentFile = ref(null);
  
  watch(props, () => {
    if (props.investigacion) {
      titulo.value = props.investigacion.titulo;
      descripcion.value = props.investigacion.descripcion;
      index.value = props.investigacion._id;
    }
  });
  
  const submitForm = async () => {
    try {
      const direc = "/backend/images/";
        let imageSrc = props.investigacion.src_foto; 

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
      formData.append('descripcion', descripcion.value);
      formData.append('foto',  imageSrc); 
      const response = await fetch(`http://localhost:3000/api/zona/investigacionUpdate`, {
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
  
  const borrarInvestigacion = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/zona/inv/${index.value}`);
      if (response.status === 200) {
        console.log('Investigación eliminada correctamente');
        closeForm();
      }
    } catch (error) {
      console.error('Error al eliminar la investigación:', error);
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
  @import url('/src/assets/formEgresados.css');
  </style>
  