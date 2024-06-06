<template>
    <div class="modal" v-show="showForm">
      <div class="modal-content">
        <button style="margin-left: 90%;width: 9%;" class="close" @click="closeForm">&times;</button>
        <h2>Modificar Malla</h2>
        <form @submit.prevent="submitForm">
          <div class="form-groupf">
            <label for="semestre">Semestre:</label><br>
            <input type="number" id="semestre" v-model="formData.semestre" min="1" max="9" required>
          </div>
          <div class="form-groupf">
            <label for="area">Área:</label><br>
            <select style="width: 95.4%;border-radius: 20px;height: 40px;" id="area" v-model="formData.area" required>
              <option value="ASIGNATURAS BÁSICAS">ASIGNATURAS BÁSICAS</option>
              <option value="PSICOPEDAGOGÍA DE LA EDUCACIÓN FORMAL Y NO FORMAL">PSICOPEDAGOGÍA DE LA EDUCACIÓN FORMAL Y NO FORMAL</option>
              <option value="PSICOPEDAGOGÍA CLÍNICA">PSICOPEDAGOGÍA CLÍNICA</option>
              <option value="PSICOPEDAGOGÍA LABORAL">PSICOPEDAGOGÍA LABORAL</option>
              <option value="PSICOPEDAGOGÍA SOCIAL">PSICOPEDAGOGÍA SOCIAL</option>
              <option value="FORMACIÓN GENÉRICA">FORMACIÓN GENÉRICA</option>
              <option value="LIBRES">LIBRES</option>
            </select>
          </div>
          <div class="form-groupf">
            <label for="sigla">Sigla:</label><br>
            <input type="text" id="sigla" v-model="formData.sigla">
          </div>
          <div class="form-groupf">
            <label for="materia">Materia:</label><br>
            <input type="text" id="materia" v-model="formData.materia">
          </div>
          <div class="form-groupf">
            <label for="requisito">Requisito:</label><br>
            <input type="text" id="requisito" v-model="formData.requisito">
          </div>
          <div class="form-groupf">
            <label for="descrip">Descripción:</label><br>
            <textarea id="descrip" v-model="formData.descrip"></textarea>
          </div>
          <div style="text-align: center;">
            <button class="boton-guardarf">Guardar</button>
          </div>
        </form>
      </div>
      <SuccessEdit v-if="showSuccessModal" @onClose="closeSuccessModal" :message="'La malla ha sido actualizada correctamente'" :titulo="'Actualización exitosa'"></SuccessEdit>
  
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits, watch } from 'vue';
  import axios from 'axios';
import SuccessEdit from '/src/components/ModalNoti.vue'; 
const showSuccessModal = ref(false); 
  const props = defineProps(['semestre', 'showForm']);
  const emit = defineEmits(['closeForm']);
  
  const formData = ref({
    semestre: '',
    area: '',
    sigla: '',
    materia: '',
    requisito: '',
    descrip: ''
  });
  
  watch(() => props.semestre, (newsemestre) => {
    if (newsemestre) {
      formData.value = { ...newsemestre };
    }
  }, { immediate: true });
  
  const submitForm = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('semestre', formData.value.semestre);
      formDataToSend.append('area', formData.value.area);
      formDataToSend.append('sigla', formData.value.sigla);
      formDataToSend.append('materia', formData.value.materia);
      formDataToSend.append('requisito', formData.value.requisito);
      formDataToSend.append('descrip', formData.value.descrip);
  
      const response = await axios.put(`http://localhost:3000/api/semestre/${formData.value._id}`, formDataToSend);
      if (response.status === 200) {
        showSuccessModal.value = true; 
      } else {
        console.error('Error al actualizar el semestre:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };
  const closeSuccessModal = () => {
  showSuccessModal.value = false;
  closeForm();
};
  
  const closeForm = () => {
    emit('closeForm');
  };
  </script>
  
  <style scoped>
  @import url('/src/assets/formDocentes.css');
  /* Add your styles here */
  </style>
  