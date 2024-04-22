<template>
    <div class="modal" v-show="showForm">
      <div class="modal-content">
        <button class="close" @click="closeForm">&times;</button>
        <h2>Agregar Nuevo Docente</h2>
        <form @submit.prevent="submitForm">
          <!-- Input fields para el formulario -->
          <div class="form-group">
            <label for="nombre">Nombre:</label><br>
            <input type="text" id="nombre" v-model="nombre" required>
          </div>
          <div class="form-group">
            <label for="apodo">Apodo:</label><br>
            <input type="text" id="apodo" v-model="apodo" required>
          </div>
          <div class="form-group">
            <label for="cargo">Cargo:</label><br>
            <input type="text" id="cargo" v-model="cargo" required>
          </div>
          <div class="form-group">
            <label for="correo">Correo:</label><br>
            <input type="email" id="correo" v-model="correo" required>
          </div>
          <div class="form-group">
            <label for="datoc">Dato Cualquiera:</label><br>
            <input type="text" id="datoc" v-model="datoc" required>
          </div>
          <div class="form-group">
            <label for="imagen">Imagen:</label><br>
            <input type="file" id="imagen" @change="onFileChange" required>
          </div>
          <div style="text-align: center;">
            <!-- Botón para enviar el formulario -->
            <button class="boton-guardar">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { defineProps } from 'vue';
  
  // Variables reactivas para los campos del formulario
  const nombre = ref('');
  const apodo = ref('');
  const cargo = ref('');
  const correo = ref('');
  const datoc = ref('');
  const imagen = ref('');
  const showForm = ref(true);
  const currentFile = ref(null);
  
  const props = defineProps({
    onclose: Function,
  });
  
  // Función para enviar el formulario al servidor
  const submitForm = async () => {
    try {
      const direc = "/backend/images/";
      console.log(currentFile.value);
      imagen.value = direc + currentFile.value.name;
      const formData = new FormData();
      formData.append('sampleFile', currentFile.value);
      fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      }).then(async (res) => {
        console.log(res);
        const formData = new FormData(); // Crear objeto FormData para enviar archivos
        formData.append('nombre', nombre.value);
        formData.append('apodo', apodo.value);
        formData.append('cargo', cargo.value);
        formData.append('correo', correo.value);
        formData.append('datoc', datoc.value);
        formData.append('imagen', imagen.value); 
        console.log(imagen.value);
        const response = await fetch('http://localhost:3000/api/docentes', {
          method: 'POST',
          body: formData // Pasar el formData como cuerpo de la solicitud
        });
        if (response.ok) {
          console.log('Docente guardado correctamente');
          // Aquí puedes agregar lógica adicional después de guardar exitosamente
          closeForm(); // Cerrar el formulario después de guardar exitosamente
        } else {
          console.error('Error al guardar el docente:', response.statusText);
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
  </script>
  
  <style scoped>
  @import url('/./src/assets/formDocentes.css');
  </style>
  