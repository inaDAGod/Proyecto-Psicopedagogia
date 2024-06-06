<template>
    <div class="cuerpo">
      <div class="formDatos">
        <h2 class="tituloE">Sociedad Científica Estudiantil INPSICOPEDIA</h2>
        <div class="modal">
          <div class="mod-content">
            <h2>Informacion general</h2>
            <form @submit.prevent="submitForm">
              <div class="for-group">
                <label for="quienes_somos">¿Quienes somos?</label><br>
                <textarea id="quienes_somos" :disabled="!editar" v-model="quienes_somos"></textarea>
              </div>
              <div class="for-group">
                <label for="desdecuando">¿Desde cuando existimos?</label><br>
                <textarea id="desdecuando" :disabled="!editar" v-model="desdecuando"></textarea>
              </div>
              <div class="for-group">
                <label for="quienes_conforman">¿Quienes forman parte?</label><br>
                <textarea id="quienes_conforman" :disabled="!editar" v-model="quienes_conforman"></textarea>
              </div>
              <div class="for-group">
                <label for="como_unirse">¿Como unirse?</label><br>
                <textarea id="como_unirse" :disabled="!editar" v-model="como_unirse"></textarea>
              </div>
              <div class="for-group">
                <label for="link_face">Link a Facebook:</label><br>
                <input type="text" id="link_face" :disabled="!editar" v-model="link_face">
            </div>
            <div class="for-group">
                <label for="contactos">Contactos:</label><br>
                <input type="text" id="contactos" :disabled="!editar" v-model="contactos" required>
            </div>
              <div style="text-align: center;">
                <button v-if="!mostrarBotonGuardar && !editar" class="bot-guardar" @click="editar = true"><img src="/src/assets/images/edit.png" width="20vh" height="auto"></button>
                <button v-if="editar" class="bot-guardar" @click="guardarCambios">Guardar</button>
              </div>
            </form>
          </div>
        </div>
        <SuccessEdit
      v-if="showSuccessModal"
      @onClose="closeSuccessModal"
      :message="'Los datos de la Sociedad se actualizaron correctamente'"
      :titulo="'Actualización exitosa'"
    />
      </div>
      <h2 class="tituloE">Investigaciones</h2>
      <div class="container">
        <div class="cardsInfo">
          <CardsInvestigaciones />
        </div>
        <div class="formAdd">
          <div class="formAdd">
            <InvestigacionForm />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import CardsInvestigaciones from '/src/components/CardsSociedad.vue';
  import InvestigacionForm from '/src/components/SociedadForm.vue';
  import SuccessEdit from '/src/components/ModalNoti.vue'; 

  const showSuccessModal = ref(false); 
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  let sociedad = ref([]);
  let quienes_somos = ref('');
  let desdecuando = ref('');
  let quienes_conforman = ref('');
  let como_unirse = ref('');
  let link_face = ref('');
  let contactos = ref('');
  let editar = ref(false);
  let mostrarBotonGuardar = ref(false);
  
  const obtenerSoci = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/sociedad');
      sociedad.value = response.data;
      quienes_somos.value = response.data.quienes_somos;
      desdecuando.value = response.data.desdecuando;
      quienes_conforman.value = response.data.quienes_conforman;
      como_unirse.value = response.data.como_unirse;
      link_face.value = response.data.link_face;
      contactos.value = response.data.contactos;
    } catch (error) {
      console.error('Error fetching investigaciones:', error);
    }
  };
  
  const guardarCambios = async () => {
    try {
    const formData = new FormData();
    formData.append('quienes_somos', quienes_somos.value);
    formData.append('desdecuando', desdecuando.value);
    formData.append('quienes_conforman', quienes_conforman.value);
    formData.append('como_unirse',  como_unirse.value);
    formData.append('link_face',  link_face.value);
    formData.append('contactos',  contactos.value);
    const response = await fetch('http://localhost:3000/api/sociedadUpdate', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      console.log('Informacion actualizado correctamente');
      showSuccessModal.value = true;
      editar.value = false; 
    } else {
      console.error('Error al actualizar :', response.statusText);
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
    
  };
  const closeSuccessModal = () => {
  showSuccessModal.value = false;
};

  onMounted(() => {
    obtenerSoci();
  });
  </script>
  
  <style scoped>
  @import url('/src/assets/admins.css');
  @import url('/src/assets/formEgresados3.css');
  </style>
  