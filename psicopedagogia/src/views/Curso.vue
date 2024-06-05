<template>
  <div id="app">
    <div class="content-wrapper">
      <div class="main-content">
        <h1 style="font-family: 'Koulen';font-size: 400%;color: rgba(255, 112, 1, 1);padding: 2%;">Formación Continua</h1>
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
                <p class="curs-about">Sobre curso: {{ cursosfc.about }}</p>
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

@import url('/src/assets/Postgradoadmi.css');


</style>

  