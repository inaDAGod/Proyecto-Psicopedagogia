<template>
  <div id="app">
    <div class="content-wrapper">
      <div class="main-content">
        <h1 style="font-family: 'Koulen';font-size: 400%;color: rgba(255, 112, 1, 1);padding: 2%;">NUESTRA FAMILIA</h1>
        <div class="docentes-container">
          <div
            v-for="docente in docentes"
            :key="docente.id"
            class="docente-item"
            style="margin-left: 3%;margin-right: 2%; border-radius: 20px;"
          >
            <div class="docente-card">
              <img :src="docente.imagen" alt="docente.nombre" class="docente-image" />
              <div class="docente-info">
                <h5 class="docente-titulo">Nombre: {{ docente.nombre }}</h5>
              </div>
              <div class="docente-actions">
                <button
                  class="b-formn"
                  style="background-color: #badf3a; border-color: #badf3a;margin-right: 40%;"
                  @click="openModForm(docente)"
                >
                  <img src="/backend/images/edit.png" width="28vh" height="auto" style="padding: 2%;" />
                </button>
                <button
                  class="b-formn"
                  style="background-color: #ffa198; border-color: #ffa198;"
                  @click="openDelForm(docente)"
                >
                  <img src="/backend/images/trash2.png" width="28vh" height="auto" style="padding: 2%;" />
                </button>
               
              </div>
            </div>
          
        </div>
        </div>
        <FormDocMod
          v-if="showFormDocMod"
          :docente="selectedDocente"
          :showForm="showFormDocMod"
          @closeForm="closeForm('formDocMod')"
        />
        <FormDocElim
          v-if="showFormDocElim"
          :docente="selectedDocente"
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
import FormDocMod from '/src/components/FormDocMod.vue';
import FormDocElim from '/src/components/FormDocElim.vue';

const showFormDocMod = ref(false);
const showFormDocElim = ref(false);
const docentes = ref([]);
const selectedDocente = ref(null);

const obtenerDocentes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/docentes');
    docentes.value = response.data;
  } catch (error) {
    console.error('Error fetching docentes:', error);
  }
};

const openModForm = (docente) => {
  selectedDocente.value = docente;
  showFormDocMod.value = true;
};

const openDelForm = (docente) => {
  selectedDocente.value = docente;
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


.content-wrapper {
  display: flex;
}

.main-content {
  width: 100%;
}
</style>
