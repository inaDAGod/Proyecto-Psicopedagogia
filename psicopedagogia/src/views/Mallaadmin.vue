<template>
  <div id="app">
    <div class="content-wrapper">
      <div class="main-content">
        <h1 style="font-family: 'Koulen';font-size: 400%;color: rgba(255, 112, 1, 1);padding: 2%;">Malla</h1>
        
        <div class="semestres-container">
          <div
            v-for="semestre in semestres"
            :key="semestre.id"
            class="semestre-item"
          >
            <div class="semestre-card">
              <div class="semestre-info">
                <h5 class="semestre-titulo">{{ semestre.materia }}</h5>
                <p class="semestre-sigla">{{ semestre.sigla }}</p>
              </div>
              
              <div class="semestre-actions">
                <button
                  class="b-formmalla"
                  style="background-color: #badf3a; border-color: #badf3a;margin-right: 20%;"
                  @click="openModForm(semestre)"
                >
                  <img src="/backend/images/edit.png" width="28vh" height="auto" />
                </button>
                <button
                  class="b-formmalla"
                  style="background-color: #ffa198; border-color: #ffa198;"
                  @click="openDelForm(semestre)"
                >
                  <img src="/backend/images/trash2.png" width="28vh" height="auto" />
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
  gap: 2%;
}

.semestre-item {
  width: 48%;
  display: flex;
}

.semestre-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 4%;
}

.semestre-info {
  text-align: center;
}

.semestre-titulo {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.semestre-sigla {
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
  width: 100%;
  padding: 1%;
  color: white;
  font-size: 100%;
  left: 0;
  margin: 4%;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
}

.content-wrapper {
  display: flex;
}

.main-content {
  width: 100%;
}
</style>
