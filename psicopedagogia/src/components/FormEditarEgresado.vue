<template>
  <div class="mod">
    <div class="mod-content">
      <button class="clo" @click="closeForm">&times;</button>
      <h2>Editar Egresado</h2>
      <form @submit.prevent="submitForm">
        <!-- Formulario de edición -->
        <div class="for-group">
          <label for="nombre">Nombre:</label><br>
          <input type="text" id="nombre" v-model="nombre" required>
        </div>
        <div class="for-group">
          <label for="correo">Correo:</label><br>
          <input type="email" id="correo" v-model="correo" required>
        </div>
        <div class="for-group">
          <label for="anio_graduacion">Año de Graduación:</label><br>
          <input type="number" id="anio_graduacion" v-model="anioGraduacion" required>
        </div>
        <div class="for-group">
          <label for="trabajo">Trabajo Actual:</label><br>
          <input type="text" id="trabajo" v-model="trabajo" required>
        </div>
        <div class="for-group">
          <label for="comentario">Comentario:</label><br>
          <textarea id="comentario" v-model="comentario"></textarea>
        </div>
        <div class="for-group">
          <label for="src_foto">Foto egresado:</label><br>
          <input type="file" id="src_foto" @change="onFileChange">
        </div>
        <div style="text-align: center;">
          <button class="bot-guardar">Guardar</button>
          <br><br><br><br>
          <button class="bot-borrar" @click.prevent="showDeleteModal"><img src="/src/assets/images/trash2.png" width="20vh" height="auto"></button>
        </div>
      </form>
    </div>
    <delete-confirmation :egresado="props.egresado" :showForm="showDeleteForm" @closeForm="closeDeleteModal" @egresadoEliminado="handleEgresadoEliminado" />
    <SuccessEdit v-if="showSuccessModal" @onClose="closeSuccessModal" :message="'El egresado ha sido actualizada correctamente'" :titulo="'Actualización exitosa'"></SuccessEdit>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import axios from 'axios';
import DeleteConfirmation from './ModEliminarEgresado.vue';
import SuccessEdit from '/src/components/ModalNoti.vue'; 

const showSuccessModal = ref(false); 

const props = defineProps({
  egresado: Object,
});

const emit = defineEmits(['onclose', 'egresadoEliminado']);

const nombre = ref('');
const correo = ref('');
const anioGraduacion = ref('');
const trabajo = ref('');
const comentario = ref('');
const index = ref('');
const currentFile = ref(null);
const showDeleteForm = ref(false); // Nueva referencia para mostrar el modal de eliminación

watch(props, () => {
  if (props.egresado) {
    nombre.value = props.egresado.nombre;
    correo.value = props.egresado.correo;
    anioGraduacion.value = props.egresado.anio_graduacion;
    trabajo.value = props.egresado.trabajo;
    comentario.value = props.egresado.comentario;
    index.value = props.egresado._id;
  }
});

const submitForm = async () => {
  try {
    const direc = "/backend/images/";
    let imageSrc = props.egresado.src_foto;

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
    formData.append('nombre', nombre.value);
    formData.append('correo', correo.value);
    formData.append('anio_graduacion', anioGraduacion.value);
    formData.append('trabajo', trabajo.value);
    formData.append('comentario', comentario.value);
    formData.append('foto', imageSrc);

    const response = await fetch('http://localhost:3000/api/egresadosUpdate', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      console.log('Egresado actualizado correctamente');
      showSuccessModal.value = true; 
      //closeForm();
    } else {
      console.error('Error al actualizar el egresado:', response.statusText);
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
};

const showDeleteModal = () => {
  showDeleteForm.value = true;
};

const closeDeleteModal = () => {
  showDeleteForm.value = false;
};
const closeSuccessModal = () => {
  showSuccessModal.value = false;
  closeForm();
};

const handleEgresadoEliminado = () => {
  emit('egresadoEliminado');
  closeForm();
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
