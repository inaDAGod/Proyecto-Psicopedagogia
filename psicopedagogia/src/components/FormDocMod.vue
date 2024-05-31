<template>
  <div class="modal" v-show="showForm">
    <div class="modal-content">
      <button style="margin-left: 90%;width: 9%;" class="close" @click="closeForm">&times;</button>
      <h2>Modificar Docente</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="nombre">Nombre:</label><br>
          <input type="text" id="nombre" v-model="formData.nombre" required>
        </div>
        <div class="form-group">
          <label for="apodo">Apodo:</label><br>
          <input type="text" id="apodo" v-model="formData.apodo" required>
        </div>
        <div class="form-group">
          <label for="cargo">Cargo:</label><br>
          <input type="text" id="cargo" v-model="formData.cargo" required>
        </div>
        <div class="form-group">
          <label for="correo">Correo:</label><br>
          <input type="email" id="correo" v-model="formData.correo" required>
        </div>
        <div class="form-group">
          <label for="datoc">Dato Cualquiera:</label><br>
          <input type="text" id="datoc" v-model="formData.datoc" required>
        </div>
        <div class="form-group">
          <label for="imagen">Imagen:</label><br>
          <input type="file" id="imagen" @change="onFileChange">
        </div><br>
        <div style="text-align: center;">
          <button class="boton-guardar">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';

const props = defineProps(['docente', 'showForm']);
const emit = defineEmits(['closeForm']);

const formData = ref({
  nombre: '',
  apodo: '',
  cargo: '',
  correo: '',
  datoc: ''
});

const currentFile = ref(null);

watch(() => props.docente, (newDocente) => {
  if (newDocente) {
    formData.value = { ...newDocente };
  }
}, { immediate: true });

const submitForm = async () => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('nombre', formData.value.nombre);
    formDataToSend.append('apodo', formData.value.apodo);
    formDataToSend.append('cargo', formData.value.cargo);
    formDataToSend.append('correo', formData.value.correo);
    formDataToSend.append('datoc', formData.value.datoc);
    if (currentFile.value) {
      const imagenURL = "/backend/images/" + currentFile.value.name;
      formDataToSend.append('imagen', imagenURL);
      formDataToSend.append('sampleFile', currentFile.value);
    }

    const response = await axios.put(`http://localhost:3000/api/docentes/${formData.value._id}`, formDataToSend);
    if (response.status === 200) {
      console.log('Docente actualizado correctamente');
      closeForm();
    } else {
      console.error('Error al actualizar el docente:', response.statusText);
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
  emit('closeForm');
};
</script>

<style scoped>
@import url('/src/assets/formDocentes.css');
/* Add your styles here */
</style>
