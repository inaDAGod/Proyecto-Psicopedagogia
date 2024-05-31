<template>
    <div class="mod">
      <div class="mod-content">
        <h2>Agregar Investigacion</h2>
        <form @submit.prevent="submitForm">
          <div class="for-group">
            <label for="titulo">Titulo:</label><br>
            <input type="text" id="titulo" v-model="titulo" required>
          </div>
          <div class="for-group">
            <label for="comentario">Descripcion:</label><br>
            <textarea id="descripcion" v-model="descripcion"></textarea>
          </div>
          <div class="for-group">
            <label for="src_foto">Foto Investigacion:</label><br>
            <input type="file" id="src" @change="onFileChange" required>
          </div>
          <div style="text-align: center;">
            <button class="bot-guardar">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { defineProps } from 'vue';
  // Variables reactivas para los campos del formulario
  const titulo = ref('');
  const descripcion = ref('');
  const src = ref('');
  const showForm = ref(true);
  const currentFile = ref(null);
  
  const props = defineProps({
    onclose: Function,
  });
  // Función para enviar el formulario al servidor
  const submitForm = async () => {
    try {
      const direc = "/backend/images/";
      //console.log(currentFile.value);
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
        formData.append('descripcion', descripcion.value);
        formData.append('foto', src.value); 
        //console.log(src_foto.value);
        const response = await fetch('http://localhost:3000/api/investigacionSociedad', {
          method: 'POST',
          body: formData // Pasar el formData como cuerpo de la solicitud
        });
        if (response.ok) {
          console.log('Red guardada correctamente');
          
          clearFields();
        } else {
          console.error('Error al guardar la red:', response.statusText);
        }
      })

      
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

  const clearFields = () => {
  titulo.value = '';
  descripcion.value = '';
  src.value = '';

};

  </script>
  
  <style scoped>
  @import url('/src/assets/formEgresados2.css');
  </style>
  