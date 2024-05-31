<template>
  <div id="app">
    <div class="content-wrapper">
      <div class="main-content">
        <h1 class="titulo-nos">NUESTRA FAMILIA</h1>
        <div class="docentes-container">
          <div v-for="docente in docentes" :key="docente.id" class="docente-item" style="background-color:  rgba(255, 206, 232, 1); margin: 2%;border-radius: 20px;" >
            <div v-html="generateTable(docente)"></div>
            <button class="b-formnad" style="background-color: #5BA45A;border-color: #5BA45A;" @click="openModForm(docente)">Modificar</button>
            <button class="b-formnad" style="background-color: #DF351B;border-color: #DF351B;" @click="openDelForm(docente)">Eliminar</button>
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
        <img src="${docente.imagen}" alt="${docente.nombre}" class="docentes-imagenad">
        <p><b>Nombre: ${docente.nombre}</b><br>Apodo:${docente.apodo}<br>Cargo: ${docente.cargo}<br> 
        Correo:${docente.correo}<br>Dato curioso:${docente.datoc}</p>
      </div>
      
    </div>
  <center>`;
  return tableHTML;
};
</script>

<style>
.docentes-infonad {
  text-align: left;
    padding: 5%;
    margin-top: 8%;
    background-color: white;
    border-radius: 20px;
}

.docentes-infonad p{
  font-size: 100%;
    font-family: 'Roboto Condensed', sans-serif;
    width: 100%;
    padding: 2%;
    
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
    height: 120%;
}



.docentes-imagenad { 
  border-radius: 20px;
    z-index: 1; 
    width: 100%;
    height: 40%;
    padding: 1%;
    
}


.b-formnad {
  font-size: 36px;
        width: 32%;
        padding: 1%;
        color: white;
        border-radius: 40px;
        font-size: 150%;
        left:0;
        margin:2%;
        margin-top: -7%;
        padding-left:2% ;
        padding-right:2% ;
}
.content-wrapper {
  display: flex
}

.main-content {
  width: 100%; /* Adjust width as needed */
}





</style>
