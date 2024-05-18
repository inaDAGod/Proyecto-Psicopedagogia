<template>
  <div class="mod">
    <div class="mod-content">
      <button class="clo" @click="closeForm">&times;</button>
      <h2>Editar Egresado</h2>
      <form @submit.prevent="submitForm">
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
        <div style="text-align: center;">
          <button class="bot-guardar">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  egresado: Object,
});

const emit = defineEmits(['onclose']);

const nombre = ref('');
const correo = ref('');
const anioGraduacion = ref('');
const trabajo = ref('');
const comentario = ref('');
const index =  ref('');

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
    const formData = new FormData();
    formData.append('index', index.value);
    formData.append('nombre', nombre.value);
    formData.append('correo', correo.value);
    formData.append('anio_graduacion', anioGraduacion.value);
    formData.append('trabajo', trabajo.value);
    formData.append('comentario', comentario.value);
    const response = await fetch('http://localhost:3000/api/egresadosUpdate', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      console.log('Egresado actualizado correctamente');
      closeForm();
    } else {
      console.error('Error al actualizar el egresado:', response.statusText);
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
};

const closeForm = () => {
  emit('onclose');
};
</script>

<style scoped>
@import url('/src/assets/formEgresados.css');
</style>
