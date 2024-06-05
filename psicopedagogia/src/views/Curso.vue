<template>
  <div id="app">
    <div class="content-wrapper">
      <div class="main-content">
        <h1 class="titulo-nos">Formación Continua</h1>
        <div class="curss-container">
          <div
            v-for="cursosfc in cursosfcs"
            :key="cursosfc.id"
            class="curs-item"
            style="margin: 2%; border-radius: 20px; background-color: rgba(219, 238, 150, 1);"
          >
            <div class="curs-card">
              <img :src="cursosfc.img" alt="cursosfc.titulo" class="curs-image" />
              <div class="curs-info">
                <h5 class="curs-titulo">Título: {{ cursosfc.titulo }}</h5>
                <p class="curs-about">Curso: {{ cursosfc.about }}</p>
                <p class="curs-competencia">Competencia: {{ cursosfc.competencia }}</p>
                <p class="curs-requisitos">Requisitos: {{ cursosfc.requisitos }}</p>
                <p class="curs-fecha">Fecha: {{ cursosfc.fecha }}</p>
              </div>
            </div>
            <div class="curs-actions">
              <button
                class="b-formca"
                style="background-color: #ffa198; border-color: #ffa198; margin-right: 20%;"
                @click="openDelForm(cursosfc)"
              >
                <img src="/backend/images/trash2.png" width="28vh" height="auto" style="padding: 2%;" />
              </button>
              <button
                class="b-formca"
                style="background-color: #badf3a; border-color: #badf3a;"
                @click="openModForm(cursosfc)"
              >
                <img src="/backend/images/edit.png" width="28vh" height="auto" style="padding: 2%" />
              </button>
            </div>
          </div>
        </div>
        <FormDocMod
          v-if="showFormDocMod"
          :cursosfc="selectedDocente"
          :showForm="showFormDocMod"
          @closeForm="closeForm('formDocMod')"
        />
        <FormDocElim
          v-if="showFormDocElim"
          :cursosfc="selectedDocente"
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
import FormDocMod from '/src/components/FormCursoMod.vue';
import FormDocElim from '/src/components/FormCursoElim.vue';

const showFormDocMod = ref(false);
const showFormDocElim = ref(false);
const cursosfcs = ref([]);
const selectedDocente = ref(null);

const obtenerDocentes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/cursosfc');
    cursosfcs.value = response.data;
  } catch (error) {
    console.error('Error fetching cursosfcs:', error);
  }
};

const openModForm = (cursosfc) => {
  selectedDocente.value = cursosfc;
  showFormDocMod.value = true;
};

const openDelForm = (cursosfc) => {
  selectedDocente.value = cursosfc;
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
.curss-container {
  display: flex;
  flex-wrap: wrap;
}

.curs-item {
  width: 40%;
  margin: 1%;
}

.curs-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3%;
  background-color: white;
  border-radius: 15px;
  margin: 2%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.curs-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.curs-info {
  margin-top: 15px;
  text-align: center;
}

.curs-titulo {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.curs-about,
.curs-competencia,
.curs-requisitos,
.curs-fecha {
  font-size: 0.9em;
  margin-bottom: 5px;
}

.curs-actions {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.b-formca {
  font-size: 36px;
  width: 20%;
  padding: 1%;
  color: white;
  border-radius: 40px;
  font-size: 150%;
  left: 0;
  margin: 2%;
  
  padding-left: 2%;
  padding-right: 2%;
}
</style>

  