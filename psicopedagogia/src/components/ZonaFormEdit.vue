<template>
  <div class="mod">
    <div class="mod-content">
      <button class="clo" @click="closeForm">&times;</button>
      <h2>Editar Investigación</h2>
      <form @submit.prevent="submitForm">
        <div class="for-group">
          <label for="titulo">Titulo:</label><br>
          <input type="text" id="titulo" v-model="titulo" required>
        </div>
        <div class="for-group">
          <label for="descripcion">Descripción:</label><br>
          <textarea id="descripcion" v-model="descripcion"></textarea>
        </div>
        <div class="for-group">
          <label for="src_foto">Foto Investigación:</label><br>
          <input type="file" id="src" @change="onFileChange">
        </div>
        <div style="text-align: center;">
          <button class="bot-guardar">Guardar</button>
          <br><br><br><br>
        </div>
      </form>
      <div style="text-align: center;">
        <button class="bot-borrar" @click.prevent="showDeleteModal"><img src="/src/assets/images/trash2.png" width="20vh" height="auto"></button>
      </div>
    </div>
    <delete-confirmation-investigacion-zona
      :investigacion="props.investigacion"
      :showForm="showDeleteForm"
      @closeForm="closeDeleteModal"
      @investigacionEliminado="handleInvestigacionEliminado"
    />
    <SuccessEdit v-if="showSuccessModal" @onClose="closeSuccessModal" :message="'La investigacion ha sido actualizada correctamente'" :titulo="'Actualización exitosa'"></SuccessEdit>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import axios from 'axios';
import DeleteConfirmationInvestigacionZona from './ModEliminarInvZona.vue';
import SuccessEdit from '/src/components/ModalNoti.vue'; 

const showSuccessModal = ref(false); 
const props = defineProps({
  investigacion: Object,
});

const emit = defineEmits(['onclose', 'investigacionEliminado']);

const index = ref('');
const titulo = ref('');
const descripcion = ref('');
const currentFile = ref(null);
const showDeleteForm = ref(false); // Nueva referencia para mostrar el modal de eliminación

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
    formData.append('foto', imageSrc);

    const response = await fetch('http://localhost:3000/api/zona/investigacionUpdate', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      console.log('Actualizado correctamente');
      showSuccessModal.value = true; 
      //closeForm();
    } else {
      console.error('Error al actualizar:', response.statusText);
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

const handleInvestigacionEliminado = () => {
  emit('investigacionEliminado');
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
