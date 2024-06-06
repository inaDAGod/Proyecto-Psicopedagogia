<template>
  <div class="modal" v-if="showForm">
    <div class="modal-content">
      <button style="margin-left: 90%; width: 9%;" class="close" @click="closeForm">&times;</button>
      <h2>Eliminar Egresado</h2>
      <p>¿Estás seguro de que deseas eliminar al egresado " {{ egresado.nombre }} "?</p>
      <div style="text-align: center;">
        <button class="boton-eliminar"  @click="submitForm">Eliminar</button>
      </div>
    </div>
    <SuccessEdit v-if="showSuccessModal" @onClose="closeSuccessModal" :message="'El egresado se elimino correctamente'" :titulo="'Eliminado con exito'"></SuccessEdit>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import SuccessEdit from '/src/components/ModalNoti.vue'; 

const showSuccessModal = ref(false); 
const props = defineProps(['egresado', 'showForm']);
const emit = defineEmits(['closeForm', 'egresadoEliminado']);

const submitForm = async () => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/egresados/${props.egresado._id}`);
    if (response.status === 200) {
      console.log('Egresado eliminado correctamente');
      showSuccessModal.value = true; 
      
    }
  } catch (error) {
    console.error('Error al eliminar el egresado:', error);
  }
};

const closeForm = () => {
  emit('closeForm');
};
const closeSuccessModal = () => {
  showSuccessModal.value = false;
  emit('egresadoEliminado');
  closeForm();
};
</script>

<style scoped>
@import url('/src/assets/notiMod.css');
</style>