<template>
    <div class="modal">
      <div class="modal-content">
        <button class="close" @click="closeForm">&times;</button>
        <h2>Editar actividad</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="actividad">Actividad:</label><br>
            <input type="text" id="actividad" v-model="actividad" required>
          </div>
          <div class="form-group">
            <label for="fecha">Fecha:</label><br>
            <input type="date" id="fecha" v-model="fecha" required>
          </div>
          <div class="form-group">
            <label for="hora">Hora:</label><br>
            <input type="time" id="hora" v-model="hora" required>
          </div>
          <div class="form-group">
            <label for="ubicacion">Ubicación:</label><br>
            <input type="text" id="ubicacion" v-model="ubicacion" required>
          </div>
          <div class="form-group">
            <label for="descripcion">Descripción:</label><br>
            <textarea id="descripcion" v-model="descripcion"></textarea>
          </div>
          <div class="form-group">
            <label for="actividad_src">Imagen:</label><br>
            <input type="file" id="src" @change="onFileChange">
          </div>
          <div style="text-align: center;">
            <button class="boton-guardar" type="submit">Guardar</button>
            <br><br><br><br>
          </div>
        </form>
        <SuccessEdit v-if="showSuccessModal" @onClose="closeSuccessModal" :message="'La actividad ha sido actualizada correctamente'"></SuccessEdit>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue';
  import axios from 'axios';
  import SuccessEdit from '/src/components/SuccessEditModal.vue';
  
  const props = defineProps({
    actividades: Object,
  });
  
  const emit = defineEmits(['onclose']);
  const id = ref('');
  const actividad = ref('');
  const fecha = ref('');
  const hora = ref('');
  const ubicacion = ref('');
  const descripcion = ref('');
  const currentFile = ref(null);
  const showSuccessModal = ref(false);
  
  // Initialize form data when props.actividades changes
  watch(
    () => props.actividades,
    (newActividad) => {
      if (newActividad) {
        id.value = newActividad._id || '';
        actividad.value = newActividad.actividad || '';
        fecha.value = newActividad.fecha || '';
        hora.value = newActividad.hora || '';
        ubicacion.value = newActividad.ubicacion || '';
        descripcion.value = newActividad.descripcion || '';
      }
    },
    { immediate: true }
  );
  
  const submitForm = async () => {
    try {
      const direc = "/backend/images/";
      let imagenA = props.actividades.actividad_src;
  
      if (currentFile.value) {
        const formDataImage = new FormData();
        formDataImage.append('sampleFile', currentFile.value);
  
        const imageResponse = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formDataImage,
        });
  
        if (!imageResponse.ok) {
          throw new Error('Error al subir la imagen');
        }
  
        imagenA = direc + currentFile.value.name;
      }
  
      const formData = new FormData();
      formData.append('id', id.value);
      formData.append('actividad', actividad.value);
      formData.append('fecha', fecha.value);
      formData.append('hora', hora.value);
      formData.append('ubicacion', ubicacion.value);
      formData.append('descripcion', descripcion.value);
      formData.append('imagenA', imagenA);
  
      const response = await fetch('http://localhost:3000/api/actividadesUpdate', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Actualizado correctamente');
        showSuccessModal.value = true;
      } else {
        console.error('Error al actualizar:', response.statusText);
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
    emit('onclose');
  };
  
  const closeSuccessModal = () => {
    showSuccessModal.value = false;
    closeForm();
  };
  </script>
  
  <style scoped>
  @import url('/src/assets/formEditar1.css');
  </style>
  