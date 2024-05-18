<template>
    <div class="mod">
      <div class="mod-content">
        <button class="clo" @click="closeForm">&times;</button>
        <h2>Editar Egresado</h2>
        <form @submit.prevent="submitForm">
          <div class="for-group">
            <label for="titulo">Titulo:</label><br>
            <input type="text" id="titulo" v-model="titulo" required>
          </div>
          <div class="for-group">
            <label for="link">Link externo:</label><br>
            <input type="text" id="link" v-model="link" required>
          </div>
          <div style="text-align: center;">
            <button class="bot-guardar">Guardar</button>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <button class="bot-borrar" @click="borrarRed()" >Borrar Red</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue';
  import axios from 'axios';
  const props = defineProps({
    red: Object
  });
  
  const emit = defineEmits(['onclose']);
  
  const titulo = ref('');
  const link = ref('');
  const index =  ref('');
  
  watch(props, () => {
    if (props.red) {
      titulo.value = props.red.titulo;
      link.value = props.red.link;
      index.value = props.red._id;
    }
  });
  
  const submitForm = async () => {
    try {
      const formData = new FormData();
      formData.append('index', index.value);
      formData.append('titulo', titulo.value);
      formData.append('link', link.value);
      const response = await fetch('http://localhost:3000/api/redUpdate', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        console.log('Red actualizado correctamente');
        closeForm();
      } else {
        console.error('Error al actualizar la red:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };
  
  const borrarRed = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/red/${index.value}`);
      if (response.status === 200) {
        console.log('Red eliminado correctamente');
        closeForm();
      
      }
    } catch (error) {
      console.error('Error al eliminar el egresado:', error);
    }
  };
  const closeForm = () => {
    emit('onclose');
  };
  </script>
  
  <style scoped>
  @import url('/src/assets/formEgresados.css');
  </style>
  