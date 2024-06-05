<template>
  <div id="app">
    <div class="content-wrapper">
      <div class="main-content">
        <h1 class="titulo-nos">NUESTRA FAMILIA</h1>
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
              
              <div class="docente-actions">
                <button
                  class="b-formn"
                  style="background-color: #ffa198; border-color: #ffa198;margin-right: 10%;"
                  @click="openDelForm(docente)"
                >
                  <img src="/backend/images/trash2.png" width="28vh" height="auto" style="padding: 2%;" />
                </button>
                <button
                  class="b-formn"
                  style="background-color: #badf3a; border-color: #badf3a;"
                  @click="openModForm(docente)"
                >
                  <img src="/backend/images/edit.png" width="28vh" height="auto" style="padding: 2%;" />
                </button>
              </div>
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
.docentes-container {
  display: flex;
  flex-wrap: wrap;
}

.docente-item {
  width: 40%;
  margin: 1%;
}

.docente-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.docente-image {
  width: 100%;
  height: auto;
  
}

.docente-info {
  margin-top: 15px;
  text-align: center;
  padding: 2%;
}

.docente-titulo {
  font-size: 1.2em;
  margin-bottom: 9px;
}

.docente-apodo,
.docente-cargo,
.docente-correo,
.docente-datoc {
  font-size: 0.9em;
  margin-bottom: 5px;
}

.docente-actions {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.b-formn {
  font-size: 36px;
  width: 120%;
  padding: 1%;
  color: white;
  border-radius: 40px;
  font-size: 100%;
  left: 0;
  margin: 4%;
  padding-left: 2%;
  padding-right: 2%;
  margin-bottom: 10%;
}

.content-wrapper {
  display: flex;
}

.main-content {
  width: 100%;
}
</style>
