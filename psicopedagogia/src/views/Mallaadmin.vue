<template>
  <div id="app">
    <div class="content-wrapper">
      <div class="main-content">
        <h1 class="titulo-nos">Malla</h1>
        <div class="semestres-container">
          <div
            v-for="semestre in semestres"
            :key="semestre.id"
            class="semestre-item"
          >
            <div class="semestre-card">
              <div class="semestre-info">
                <h5 class="semestre-materia">{{ semestre.materia }}</h5>
                <p class="semestre-sigla">{{ semestre.sigla }}</p>
                </div>
            
              <div class="semestre-actions">
                <button
                  class="b-formmalla"
                  style="background-color: #ffa198; border-color: #ffa198;"
                  @click="openDelForm(semestre)"
                >
                  <img src="/backend/images/trash2.png" width="28vh" height="auto" style="padding: 2%;" />
                </button>
                <button
                  class="b-formmalla"
                  style="background-color: #badf3a; border-color: #badf3a;"
                  @click="openModForm(semestre)"
                >
                  <img src="/backend/images/edit.png" width="28vh" height="auto" style="padding: 2%;" />
                </button>
              </div>
              
            </div>
          </div>
        </div>
        <FormDocMod
          v-if="showFormDocMod"
          :semestre="selectedDocente"
          :showForm="showFormDocMod"
          @closeForm="closeForm('formDocMod')"
        />
        <FormDocElim
          v-if="showFormDocElim"
          :semestre="selectedDocente"
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
import FormDocMod from '/src/components/FormMallaMod.vue';
import FormDocElim from '/src/components/FormMallaElim.vue';

const showFormDocMod = ref(false);
const showFormDocElim = ref(false);
const semestres = ref([]);
const selectedDocente = ref(null);

const obtenerDocentes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/semestre');
    semestres.value = response.data;
  } catch (error) {
    console.error('Error fetching semestres:', error);
  }
};

const openModForm = (semestre) => {
  selectedDocente.value = semestre;
  showFormDocMod.value = true;
};

const openDelForm = (semestre) => {
  selectedDocente.value = semestre;
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
.semestres-container {
  display: flex;
  flex-wrap: wrap;
}

.semestre-item {
  width: 48%;
  margin: 1%;
}

.semestre-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.semestre-info {
  margin-top: 15px;
  text-align: center;
}

.semestre-titulo {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.semestre-area,
.semestre-sigla,
.semestre-materia,
.semestre-requisito,
.semestre-descrip {
  font-size: 0.9em;
  margin-bottom: 5px;
  text-align: center;
}

.semestre-actions {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.b-formmalla {
  font-size: 36px;
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
}

.content-wrapper {
  display: flex;
}

.main-content {
  width: 100%;
}
</style>
