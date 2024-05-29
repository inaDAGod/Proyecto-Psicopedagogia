<template>
    <div class="mod">
      <div class="mod-content">
        <button class="clo" @click="closeForm">&times;</button>
        <h2>Editar Docente</h2>
        <form @submit.prevent="submitForm">
          <div class="for-group">
            <label for="nombre">Nombre:</label><br>
            <input type="text" id="nombre" v-model="nombre" required>
          </div>
          <div class="for-group">
            <label for="apodo">Apodo:</label><br>
            <input type="text" id="apodo" v-model="apodo" required>
          </div>
          <div class="for-group">
            <label for="cargo">Cargo:</label><br>
            <input type="text" id="cargo" v-model="cargo" required>
          </div>
          <div class="for-group">
            <label for="correo">Correo:</label><br>
            <input type="email" id="correo" v-model="correo" required>
          </div>
          <div class="for-group">
            <label for="datoc">Dato C:</label><br>
            <textarea id="datoc" v-model="datoc"></textarea>
          </div>
          <div class="for-group">
            <label for="imagen">Imagen:</label><br>
            <input type="file" id="imagen" @change="onFileChange">
          </div>
          <div style="text-align: center;">
            <button class="bot-guardar">Guardar</button>
            <br><br><br><br>
            <button class="bot-borrar" @click="borrarDocente">Borrar Docente</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue';
  import axios from 'axios';
  const props = defineProps({
    docente: Object,
  });
  
  const emit = defineEmits(['onclose']);
  
  const nombre = ref('');
  const apodo = ref('');
  const cargo = ref('');
  const correo = ref('');
  const datoc = ref('');
  const index = ref('');
  const currentFile = ref(null); // Agregamos la referencia para el archivo actual
  
  watch(props, () => {
    if (props.docente) {
      nombre.value = props.docente.nombre;
      apodo.value = props.docente.apodo;
      cargo.value = props.docente.cargo;
      correo.value = props.docente.correo;
      datoc.value = props.docente.datoc;
      index.value = props.docente.id_docente;
    }
  });
  
  const submitForm = async () => {
    try {
      const formData = new FormData();
      formData.append('id_docente', index.value);
      formData.append('nombre', nombre.value);
      formData.append('apodo', apodo.value);
      formData.append('cargo', cargo.value);
      formData.append('correo', correo.value);
      formData.append('datoc', datoc.value);
  
      if (currentFile.value) {
        formData.append('imagen', currentFile.value);
      }
  
      const response = await axios.post('http://localhost:3000/api/docentesUpdate', formData);
      if (response.status === 200) {
        console.log('Docente actualizado correctamente');
        closeForm();
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };
  
  const borrarDocente = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/docentes/${index.value}`);
      if (response.status === 200) {
        console.log('Docente eliminado correctamente');
        closeForm();
      }
    } catch (error) {
      console.error('Error al eliminar el docente:', error);
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
  @import url('/src/assets/formDocentes.css');
  </style>
  