<template>
  <div class="modal" v-show="showForm">
    <div class="modal-content">
      
      <button style="margin-left: 90%;width: 9%;" class="close" @click="closeForm">&times;</button>
      <h2>Modificar Maestría</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="titulo">Título:</label><br>
          <input type="text" id="titulo" v-model="formData.titulo" required>
        </div>
        <div class="form-group">
          <label for="about">Sobre Curso:</label><br>
          <textarea style="width: 100%;" id="about" v-model="formData.about" rows="2" required></textarea>
        </div>
        <div class="form-group">
          <label for="competencia">Competencia:</label><br>
          <textarea style="width: 100%;" id="competencia" v-model="formData.competencia" rows="2" required></textarea>
        </div>
        <div class="form-group">
          <label for="requisitos">Requisitos:</label><br>
          <textarea style="width: 100%;" id="requisitos" v-model="formData.requisitos" rows="1" required></textarea>
          
        </div>
        <div class="form-group">
          <label for="fecha">Fecha:</label><br>
          <input type="date" id="fecha" v-model="formData.fecha" required>
        </div>
        <div class="form-group">
          <label for="img">Imagen:</label><br>
          <input type="file" id="img" @change="onFileChange">
        </div><br>
        <div style="text-align: center;">
          <button class="boton-guardar">Guardar</button>
        </div>
      </form>
    </div>
    <SuccessEdit v-if="showSuccessModal" @onClose="closeSuccessModal" :message="'El curso ha sido actualizada correctamente'" :titulo="'Actualización exitosa'"></SuccessEdit>
  
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import SuccessEdit from '/src/components/ModalNoti.vue'; 
const showSuccessModal = ref(false); 
const props = defineProps(['maestria', 'showForm']);
const emit = defineEmits(['closeForm']);

const formData = ref({
  titulo: '',
  about: '',
  competencia: '',
  requisitos: '',
  fecha: ''
});

const currentFile = ref(null);

watch(() => props.maestria, (newMaestria) => {
  if (newMaestria) {
    formData.value = { ...newMaestria };
  }
}, { immediate: true });

const submitForm = async () => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('titulo', formData.value.titulo);
    formDataToSend.append('about', formData.value.about);
    formDataToSend.append('competencia', formData.value.competencia);
    formDataToSend.append('requisitos', formData.value.requisitos);
    formDataToSend.append('fecha', formData.value.fecha);
   
    if (currentFile.value) {
      const imagenURL = "/backend/images/" + currentFile.value.name;
      formDataToSend.append('img', imagenURL);
      formDataToSend.append('sampleFile', currentFile.value);
    }

    const response = await axios.put(`http://localhost:3000/api/maestria/${formData.value._id}`, formDataToSend);
    if (response.status === 200) {
      showSuccessModal.value = true;
    } else {
      console.error('Error al actualizar la maestría:', response.statusText);
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  closeForm();
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
  