<template>
  <div id="app">
    <div class="content-wrapper">
      <div class="main-content">
        <h1 class="titulo-nos">NUESTRA FAMILIA</h1>
        <div class="docentes-container">
          <div v-for="docente in docentes" :key="docente.id" class="docente-item">
            <div v-html="generateTable(docente)"></div>
            <button class="b-formnad" @click="openModForm(docente)">Modificar</button>
            <button class="b-formnad" @click="openDelForm(docente)">Eliminar</button>
          </div>
        </div>
        <FormDocMod v-if="showFormDocMod" :docente="selectedDocente" :showForm="showFormDocMod" @closeForm="closeForm('formDocMod')" />
        <FormDocElim v-if="showFormDocElim" :docente="selectedDocente" :showForm="showFormDocElim" @closeForm="closeForm('formDocElim')" />
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

const generateTable = (docente) => {
  const tableHTML = `<center>
    <div class="docentesnad">
      <div class="docentes-infonad">
        <p><b>Nombre: ${docente.nombre}</b><br>Apodo:${docente.apodo}<br>Cargo: ${docente.cargo}<br> 
        Correo:${docente.correo}<br>Dato curioso:${docente.datoc}</p>
      </div>
      <div class="docentes-avatarnad">
        <img src="${docente.imagen}" alt="${docente.nombre}" class="docentes-imagenad">
      </div>
    </div>
  <center>`;
  return tableHTML;
};
</script>

<style>
@import url('/src/assets/nostrosadmin.css');
.docentes-infonad {
  text-align: left;
  margin-left: 7%;
  margin-top: 8%;
}

.docentes-infonad p{
  font-size: 100%;
  font-family: 'Roboto Condensed', sans-serif;
  width: 55%;
}

.docentes-containernad {
  display: flex;
  flex-wrap: wrap;
  
}
  
.docente-itemnad {
  flex-basis: calc(46% - 10px); 
  margin-bottom: 20px; 
}

.docentesnad {
  position: relative;
  background-color: rgba(255, 206, 232, 1);
  border-radius: 40px;
  text-align: center;
  width: 320px;
  display: flex;
  margin-top: 8%;
  margin-bottom: 20px;
  height: 400px;
}



.docentes-avatarnad {
  display: inline-block;
  position: absolute;
  right: 3%; 
  top: 25%; 
}

.docentes-imagenad { 
  border-radius: 50%;
  text-align: right;
  position: relative; 
  z-index: 1; 
  margin-top: -50px; 
  width: 100px;
  height: 100px;
}


.b-formnad {
    font-size: 36px;
    width: 100%;
    padding: 1px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: rgba(255, 42, 157, 1);
    color: white;
    border-radius: 40px;
    border-color: rgb(98, 39, 71);
    left:0;
}
.content-wrapper {
  display: flex
}

.main-content {
  width: 100%; /* Adjust width as needed */
}





</style>
