<template>
    <div class="cuerpo">
      <div class="formDatos">
        <h2 class="tituloE">Sociedad Científica Estudiantil INPSICOPEDIA</h2>
        <div class="mod">
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
              <div style="text-align: center;">
                <button v-if="!mostrarBotonGuardar && !editar" class="bot-guardar" @click="editar = true">Editar</button>
                <button v-if="editar" class="bot-guardar" @click="guardarCambios">Guardar</button>
              </div>
            </form>
          </div>
        </div>
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
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  let sociedad = ref([]);
  let quienes_somos = ref('');
  let desdecuando = ref('');
  let quienes_conforman = ref('');
  let como_unirse = ref('');
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
    } catch (error) {
      console.error('Error fetching investigaciones:', error);
    }
  };
  
  const guardarCambios = () => {
    // Lógica para guardar los cambios
    editar.value = false; // Desactivar el modo de edición
  };
  
  onMounted(() => {
    obtenerSoci();
  });
  </script>
  
  <style scoped>
  @import url('/src/assets/admins.css');
  @import url('/src/assets/formEgresados2.css');
  </style>
  