<template>
  <div class="modal" v-show="showForm">
    <div class="modal-content">
      <button style="margin-left: 90%;width: 9%;" class="close" @click="closeForm">&times;</button>
      <h2>Eliminar Curso</h2>
      <p style="background-color: white;padding: 2%;border-radius: 20px;font-size: 140%;">¿Estás seguro de que deseas eliminar  {{ cursosfc.titulo }}?</p>
      <div style="text-align: center;">
        <button style="background-color: #FFA198;border-color: #FFA198;font-size: 150%;" class="boton-eliminar" @click="submitForm">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const props = defineProps(['cursosfc', 'showForm']);
const emit = defineEmits(['closeForm']);

const submitForm = async () => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/cursosfc/${props.cursosfc._id}`);
    if (response.status === 200) {
      console.log('cursosfc eliminado correctamente');
      closeForm();
    } else {
      console.error('Error al eliminar el cursosfc:', response.statusText);
    }
  } catch (error) {
    console.error('Error al eliminar el cursosfc:', error);
  }
};

const closeForm = () => {
  emit('closeForm');
};
</script>

<style scoped>
@import url('/src/assets/notiMod.css');

.notification {
  background-color: #4CAF50; /* Green */
  color: white;
  padding: 15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  border-radius: 5px;
  text-align: center;
}
</style>
