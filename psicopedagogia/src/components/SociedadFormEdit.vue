<template>
  <div class="mod">
    <div class="mod-content">
      <button class="clo" @click="closeForm">&times;</button>
      <h2>Editar Egresado</h2>
      <form @submit.prevent="submitForm">
        <div class="for-group">
          <label for="titulo">Titulo:</label><br>
          <input type="text" id="titulo" v-model="titulo" required>
        </div>
        <div class="for-group">
          <label for="descripcion">Descripcion:</label><br>
          <textarea id="descripcion" v-model="descripcion"></textarea>
        </div>
        <div style="text-align: center;">
          <button class="bot-guardar" @click="">Guardar</button>
          <br><br><br><br>
        
        </div>
      </form>
      <div style="text-align: center;">
        <button class="bot-borrar" @click="borrarInvestigacion()">Borrar Investigacion</button>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import axios from 'axios';

const props = defineProps({
  investigacion: Object,
});

const emit = defineEmits(['onclose']);
const index = ref('');
const titulo = ref('');
const descripcion = ref('');


watch(props, () => {
  if (props.investigacion) {
    titulo.value = props.investigacion.titulo;
    descripcion.value = props.investigacion.descripcion;
    index.value = props.investigacion._id;
  }
});

const submitForm = async () => {
  try {
    const formData = new FormData();
    formData.append('index', index.value);
    formData.append('titulo', titulo.value);
    formData.append('descripcion', descripcion.value);
    const response = await fetch(`http://localhost:3000/api/sociedad/investigacionUpdate`, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      console.log('Actualizado correctamente');
      closeForm();
    } else {
      console.error('Error al actualizar:', response.statusText);
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
};

const borrarInvestigacion = async () => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/sociedad/inv/${index.value}`);
    if (response.status === 200) {
      console.log('Investigación eliminada correctamente');
      closeForm();
    }
  } catch (error) {
    console.error('Error al eliminar la investigación:', error);
  }
};



const closeForm = () => {
  emit('onclose');
};
</script>

<style scoped>
@import url('/src/assets/formEgresados.css');
</style>
