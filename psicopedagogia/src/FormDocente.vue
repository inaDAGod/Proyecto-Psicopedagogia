<template>
  <div class="modal" v-show="showForm">
    <div class="modal-content">
      <button style="margin-left: 90%;width: 9%;" class="close" @click="closeForm">&times;</button>
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
          <input type="text" id="datoc" v-model="datoCualquiera" required>
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

// Variables reactivas para los campos del formulario
const nombre = ref('');
const apodo = ref('');
const cargo = ref('');
const correo = ref('');
const datoCualquiera = ref('');
const showForm = ref(true);
const currentFile = ref(null);

// Función para enviar el formulario al servidor
const submitForm = async () => {
  try {
    const direc = "/backend/images/";
    console.log(currentFile.value);
    const formData = new FormData();
    formData.append('sampleFile', currentFile.value);
    const resUpload = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    });

    if (!resUpload.ok) {
      throw new Error('Failed to upload image');
    }

    console.log(resUpload);
    const formDataDocente = new FormData(); // Crear objeto FormData para enviar archivos
    formDataDocente.append('nombre', nombre.value);
    formDataDocente.append('apodo', apodo.value);
    formDataDocente.append('cargo', cargo.value);
    formDataDocente.append('correo', correo.value);
    formDataDocente.append('datoc', datoCualquiera.value);
    formDataDocente.append('imagen', direc + currentFile.value.name); 
    console.log(direc + currentFile.value.name);
    const response = await fetch('http://localhost:3000/api/docentes', {
      method: 'POST',
      body: formDataDocente // Pasar el formData como cuerpo de la solicitud
    });
    if (response.ok) {
      console.log('Docente guardado correctamente');
      // Aquí puedes agregar lógica adicional después de guardar exitosamente
      closeForm(); // Cerrar el formulario después de guardar exitosamente
    } else {
      console.error('Error al guardar el docente:', response.statusText);
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
  showForm.value = false;
};
</script>

<style scoped>
@import url('.\assets\formDocentes.css');
</style>
