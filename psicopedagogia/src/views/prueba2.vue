<template>
    <div id="app">
      <div class="content-wrapper">
        <div class="main-content">
          <h1 class="titulo-nos">NUESTRA FAMILIA</h1>
          <div class=" cursos-container">
            <div v-for=" curso in  cursos" :key=" curso.id" class=" curso-item">
              <div v-html="generateTable( curso)"></div>
              <button class="b-formnad" @click="openModForm( curso)">Modificar</button>
              <button class="b-formnad" @click="openDelForm( curso)">Eliminar</button>
            </div>
          </div>
          <FormcursoMod v-if="showFormcursoMod" :curso="selectedcurso" :showForm="showFormcursoMod" @closeForm="closeForm('FormcursoMod')" />
          <FormcursoElim v-if="showFormcursoElim" :curso="selectedcurso" :showForm="showFormcursoElim" @closeForm="closeForm('FormcursoElim')" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import FormcursoMod from '/src/components/FormCursoMod.vue';
  import FormcursoElim from '/src/components/FormCursoElim.vue';
  
  const showFormcursoMod = ref(false);
  const showFormcursoElim = ref(false);
  const  cursos = ref([]);
  const selectedcurso = ref(null);
  
  const obtenercursos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/cursosfc');
       cursos.value = response.data;
    } catch (error) {
      console.error('Error fetching  cursos:', error);
    }
  };
  
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
  
  onMounted(() => {
    obtenercursos();
  });
  
  const generateTable = ( curso) => {
    const tableHTML = `<center>
      <div class=" cursosnad">
        <div class=" cursos-infonad">
          <p><b>Nombre: ${ curso.nombre}</b><br>Apodo:${ curso.apodo}<br>Cargo: ${ curso.cargo}<br> 
          Correo:${ curso.correo}<br>Dato curioso:${ curso.datoc}</p>
        </div>
        <div class=" cursos-avatarnad">
          <img src="${ curso.imagen}" alt="${ curso.nombre}" class=" cursos-imagenad">
        </div>
      </div>
    <center>`;
    return tableHTML;
  };
  </script>
  
  <style>
  @import url('/src/assets/nostrosadmin.css');
  
  
  @import url('/src/assets/nostrosadmin.css');
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
  