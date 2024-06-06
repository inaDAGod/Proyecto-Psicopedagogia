<template>
  <div id="app">
    <div class="content-wrapper">
      <div class="main-content">
        <h1 style="font-family: 'Koulen';font-size: 400%; color: rgba(255, 112, 1, 1);padding: 2%;">Diplomados, Especialidades y Maestría</h1>
        



            <div class="maest-container">
          <div
            v-for="maestria in maestrias"
            :key="maestria.id"
            class="maest-item"
            style="margin-left: 3%;margin-right: 2%; border-radius: 20px;"
          >
            <div class="maest-card">
              <img :src="maestria.img" alt="maestria.titulo" class="maest-image" />
              <div class="maest-info">
                <h5 class="maest-titulo"> {{ maestria.titulo }}</h5>


                <div class="maest-actions">
              <button
                class="b-formma"
                style="background-color: #ffa198; border-color: #ffa198; margin-right: 10%;"
                @click="openDelForm(maestria)"
              >
                <img src="/backend/images/trash2.png" width="28vh" height="auto" style="padding: 2%;" />
              </button>
              <button
                class="b-formma"
                style="background-color: #badf3a; border-color: #badf3a;"
                @click="openModForm(maestria)"
              >
                <img src="/backend/images/edit.png" width="28vh" height="auto" style="padding: 2%" />
              </button>
            </div>
              </div></div>


            
          </div>
        </div>
        <FormDocMod
          v-if="showFormDocMod"
          :maestria="selectedDocente"
          :showForm="showFormDocMod"
          @closeForm="closeForm('formDocMod')"
        />
        <FormDocElim
          v-if="showFormDocElim"
          :maestria="selectedDocente"
          :showForm="showFormDocElim"
          @closeForm="closeForm('formDocElim')"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import FormDocMod from '/src/components/FormMaestriaMod.vue';
import FormDocElim from '/src/components/FormMaestriaElim.vue';

const showFormDocMod = ref(false);
const showFormDocElim = ref(false);
const maestrias = ref([]);
const selectedDocente = ref(null);

const obtenerDocentes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/maestria');
    maestrias.value = response.data;
  } catch (error) {
    console.error('Error fetching maestrias:', error);
  }
};

const openModForm = (maestria) => {
  selectedDocente.value = maestria;
  showFormDocMod.value = true;
};

const openDelForm = (maestria) => {
  selectedDocente.value = maestria;
  showFormDocElim.value = true;
};

const closeForm = (formName) => {
  if (formName === 'formDocMod') {
    showFormDocMod.value = false;
  } else if (formName === 'formDocElim') {
    showFormDocElim.value = false;
  }
};

onMounted(() => {
  obtenerDocentes();
});
</script>

  
  <style scoped>
 
 @import url('/src/assets/Postgradoadmi.css');
 
   
  </style>
  

