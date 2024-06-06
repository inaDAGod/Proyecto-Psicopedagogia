<template>
    <div class="modal" v-if="showForm">
      <div class="modal-content">
        <button style="margin-left: 90%; width: 9%;" class="close" @click="closeForm">&times;</button>
        <h2>Eliminar Red</h2>
        <p>¿Estás seguro de que deseas eliminar la red "{{ red.titulo }}"?</p>
        <div style="text-align: center;">
          <button class="boton-eliminar"  @click="submitForm">Eliminar</button>
        </div>
      </div>
      <SuccessEdit v-if="showSuccessModal" @onClose="closeSuccessModal" :message="'La red se elimino correctamente'" :titulo="'Eliminado con exito'"></SuccessEdit>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import SuccessEdit from '/src/components/ModalNoti.vue'; 

  const showSuccessModal = ref(false); 
  const props = defineProps(['red', 'showForm']);
  const emit = defineEmits(['closeForm', 'redEliminado']);
  
  const submitForm = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/red/${props.red._id}`);
      if (response.status === 200) {
        console.log('Red eliminado correctamente');
        showSuccessModal.value = true;
       
      }
    } catch (error) {
      console.error('Error al eliminar la red:', error);
    }
  };
  const closeSuccessModal = () => {
  showSuccessModal.value = false;
  emit('redEliminado');
  closeForm();
};
  const closeForm = () => {
    emit('closeForm');
  };
  </script>
  
  <style scoped>
    @import url('/src/assets/notiMod.css');
  </style>
  