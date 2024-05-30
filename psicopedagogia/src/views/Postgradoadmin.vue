<template>
    <div id="app">
      
      
      <h2 class="titulo-pos2">POSTGRADO</h2>
      <br>
  
      <div class="container-pos">
        <h1 class="titulo-pos" style="text-align: left;">Diplomados,especialidades y Maestría</h1>
      <br>
      <div class=" maestrias-container">
            <div v-for=" maestria in  maestrias" :key=" maestria.id" class=" maestria-item">
              <div v-html="generateMaestriaTable( maestria)"></div>
              <button class="b-formnad" @click="openModForma( maestria)">Modificar</button>
              <button class="b-formnad" @click="openDelForma( maestria)">Eliminar</button>
            </div>
          </div>
          <FormMaestriaMod v-if="showFormMaestriaMod" :maestria="selectedmaestria" :showForm="showFormMaestriaMod" @closeForma="closeForma('FormMaestriaMod')" />
          <FormMaestriaElim v-if="showFormMaestriaElim" :maestria="selectedmaestria" :showForm="showFormMaestriaElim" @closeForma="closeForma('FormMaestriaElim')" />
        

   <br><br><br>
   <h1 class="titulo-pos" style="text-align: left;">Formacion Continua</h1>
      <br>
      <div class=" cursos-container">
            <div v-for=" curso in  cursos" :key=" curso.id" class=" curso-item">
              <div v-html="generateCursoTable( curso)"></div>
              <button class="b-formnad" @click="openModForm( curso)">Modificar</button>
              <button class="b-formnad" @click="openDelForm( curso)">Eliminar</button>
            </div>
          </div>
          <FormcursoMod v-if="showFormcursoMod" :curso="selectedcurso" :showForm="showFormcursoMod" @closeForm="closeForm('FormcursoMod')" />
          <FormcursoElim v-if="showFormcursoElim" :curso="selectedcurso" :showForm="showFormcursoElim" @closeForm="closeForm('FormcursoElim')" />
       
  </div>

  
      
  
      </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import FormMaestriaMod from '/src/components/FormMaestriaMod.vue';
  import FormMaestriaElim from '/src/components/FormMaestriaElim.vue';
  import FormcursoMod from '/src/components/FormCursoMod.vue';
  import FormcursoElim from '/src/components/FormCursoElim.vue';
  
  const showFormcursoMod = ref(false);
  const showFormcursoElim = ref(false);
  const  cursos = ref([]);
  const selectedcurso = ref(null);

/////



const showFormMaestriaMod = ref(false);
  const showFormMaestriaElim = ref(false);
  const  maestrias = ref([]);
  const selectedmaestria = ref(null);
  
 
  
  const openModForma = ( maestria) => {
    selectedmaestria.value =  maestria;
    showFormMaestriaMod.value = true;
  };
  
  const openDelForma = ( maestria) => {
    selectedmaestria.value =  maestria;
    showFormMaestriaElim.value = true;
  };
  
  const closeForma = (formName) => {
    if (formName === 'FormMaestriaMod') {
      showFormMaestriaMod.value = false;
    } else if (formName === 'FormMaestriaElim') {
      showFormMaestriaElim.value = false;
    }
  };
  


///////////

const openModForm = ( curso) => {
    selectedcurso.value =  curso;
    showFormcursoMod.value = true;
  };
  
  const openDelForm = ( curso) => {
    selectedcurso.value =  curso;
    showFormcursoElim.value = true;
  };
  
  const closeForm = (formName) => {
    if (formName === 'FormcursoMod') {
      showFormcursoMod.value = false;
    } else if (formName === 'FormcursoElim') {
      showFormcursoElim.value = false;
    }
  };
/////////////

// Reactive variables to store fetched data

// Function to fetch data for Maestrias
const obtenerMaestrias = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/maestria');
    maestrias.value = response.data;
  } catch (error) {
    console.error('Error fetching maestrias:', error);
  }
};
const obtenerCursos = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/cursosfc'); // Corregido el nombre de la ruta
    cursos.value = response.data;
  } catch (error) {
    console.error('Error fetching cursos:', error);
  }
};




// Call the functions to fetch data when the component is mounted
onMounted(() => {
  obtenerMaestrias();
  obtenerCursos();
});



// Function to generate HTML table for Maestrias
const generateMaestriaTable = (maestria) => {
  const tableHTML = `<center>
    <div class="maestria">
      <div class="maestria-info">
        <h5 class="maestria-head">Título: ${maestria.titulo}</h5><p class="maestria-info p"><b>
        About: ${maestria.about}<br><br>
        Competencia: ${maestria.competencia}<br><br>
        Requisitos: ${maestria.requisitos}<br><br>
        Fecha: ${maestria.fecha}</b></p>
      </div>
      <div class="maestria-img">
        <img src="${maestria.img}" alt="${maestria.titulo}" class="maestria-image">
      </div>
    </div>
  <center>`;

  return tableHTML;
};

// Function to generate HTML table for Cursos Continuos
const generateCursoTable = (curso) => {
  const tableHTML = `<center>
    <div class="curso">
  <div class="curso-img">
    <img src="${curso.img}" alt="${curso.titulo}" class="curso-image">
  </div>
  <div class="curso-info">
    <h4 class="curso-head">${curso.titulo}</h4>
    <p class="curso-info p"><b>
      About: ${curso.about}<br><br>
      Competencia: ${curso.competencia}<br><br>
      Requisitos: ${curso.requisitos}<br><br>
      Fecha: ${curso.fecha}</b>
    </p>
  </div>
</div>

  <center>`;

  return tableHTML;
};




</script>







<style>
 
  
@import url('/src/assets/nostrosadmin.css');
.maestria-infonad {
text-align: left;
margin-left: 7%;
margin-top: 8%;
}

.maestria-infonad p{
font-size: 100%;
font-family: 'Roboto Condensed', sans-serif;
width: 55%;
}

.maestria-containernad {
display: flex;
flex-wrap: wrap;

}

.docente-itemnad {
flex-basis: calc(46% - 10px); 
margin-bottom: 20px; 
}

.maestrianad {
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



.maestria-avatarnad {
display: inline-block;
position: absolute;
right: 3%; 
top: 25%; 
}

.maestria-imagenad { 
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

.curso-infonad {
  text-align: left;
  margin-left: 7%;
  margin-top: 8%;
}

.curso-infonad p{
  font-size: 100%;
  font-family: 'Roboto Condensed', sans-serif;
  width: 55%;
}

.curso-containernad {
  display: flex;
  flex-wrap: wrap;
  
}
  
.docente-itemnad {
  flex-basis: calc(46% - 10px); 
  margin-bottom: 20px; 
}

.cursonad {
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



.curso-avatarnad {
  display: inline-block;
  position: absolute;
  right: 3%; 
  top: 25%; 
}

.curso-imagenad { 
  border-radius: 50%;
  text-align: right;
  position: relative; 
  z-index: 1; 
  margin-top: -50px; 
  width: 100px;
  height: 100px;
}

 
  
  
  
  



</style>
