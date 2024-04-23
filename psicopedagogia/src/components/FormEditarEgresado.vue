<template>
  <div class="modal" v-show="showForm">
    <div class="modal-content">
      <button class="close" @click="closeForm">&times;</button>
      <h2>Editar Egresado</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="nombre">Nombre:</label><br>
          <input type="text" id="nombre" v-model="nombre" required>
        </div>
        <div class="form-group">
          <label for="correo">Correo:</label><br>
          <input type="email" id="correo" v-model="correo" required>
        </div>
        <div class="form-group">
          <label for="anio_graduacion">Año de Graduación:</label><br>
          <input type="number" id="anio_graduacion" v-model="anioGraduacion" required>
        </div>
        <div class="form-group">
          <label for="trabajo">Trabajo Actual:</label><br>
          <input type="text" id="trabajo" v-model="trabajo" required>
        </div>
        <div class="form-group">
          <label for="comentario">Comentario:</label><br>
          <textarea id="comentario" v-model="comentario"></textarea>
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
import { ref, defineProps, watch } from 'vue';

const showForm = ref(true);
const props = defineProps({
  nombre: String,
  correo: String,
  anioGraduacion: Number,
  trabajo: String,
  comentario: String,
  index: Number,
  onclose: Function
});

const nombre = ref(props.nombre);
const correo = ref(props.correo);
const anioGraduacion = ref(props.anioGraduacion);
const trabajo = ref(props.trabajo);
const comentario = ref(props.comentario);

// Watch global para actualizar las variables locales cuando cambian las propiedades
watch(
  () => [props.nombre, props.correo, props.anioGraduacion, props.trabajo, props.comentario],
  ([newNombre, newCorreo, newAnioGraduacion, newTrabajo, newComentario]) => {
    nombre.value = newNombre;
    correo.value = newCorreo;
    anioGraduacion.value = newAnioGraduacion;
    trabajo.value = newTrabajo;
    comentario.value = newComentario;
  },
  { deep: true }
);

// Función para enviar el formulario al servidor
const submitForm = async () => {
  try {
    const formData = new FormData(); // Crear objeto FormData para enviar datos al servidor
    formData.append('index', props.index);
    formData.append('nombre', nombre.value);
    formData.append('correo', correo.value);
    formData.append('anio_graduacion', anioGraduacion.value);
    formData.append('trabajo', trabajo.value);
    formData.append('comentario', comentario.value);

    // Enviar el formulario al servidor
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

// Función para cerrar el formulario
const closeForm = () => {
  props.onclose();
};
</script>

<style scoped>
@import url('/./src/assets/formEgresados.css');
</style>
