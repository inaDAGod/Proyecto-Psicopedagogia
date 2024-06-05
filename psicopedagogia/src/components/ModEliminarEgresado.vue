<template>
  <div class="modal" v-if="showForm">
    <div class="modal-content">
      <button style="margin-left: 90%; width: 9%;" class="close" @click="closeForm">&times;</button>
      <h2>Eliminar Egresado</h2>
      <p style="background-color: white; padding: 2%; border-radius: 20px; font-size: 140%;">¿Estás seguro de que deseas eliminar al egresado {{ egresado.nombre }}?</p>
      <div style="text-align: center;">
        <button class="boton-eliminar" style="background-color: #FFA198; border-color: #FFA198; font-size: 150%;" @click="submitForm">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const props = defineProps(['egresado', 'showForm']);
const emit = defineEmits(['closeForm', 'egresadoEliminado']);

const submitForm = async () => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/egresados/${props.egresado._id}`);
    if (response.status === 200) {
      console.log('Egresado eliminado correctamente');
      emit('egresadoEliminado');
      closeForm();
    }
  } catch (error) {
    console.error('Error al eliminar el egresado:', error);
  }
};

const closeForm = () => {
  emit('closeForm');
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.close {
  background: none;
  border: none;
  font-size: 1.5em;
}

.boton-eliminar {
  padding: 10px 20px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
