<template>
  <div id="app" class="container">
    <!-- Use Docentes component -->
    <div class="container_main">
      <div class="column" style="width: 80%;">
        <div>
              <Curso @closeForm="closeForm('curso')" />

              <Docentes @closeForm="closeForm('docentes')" />
           </div>
      </div>

      <div class="column" style="width: 35%;">
      <Formpaginanos2 @closeForm="closeForm('formPaginanos2')" />
  
        <Formpaginanos @closeForm="closeForm('formPaginanos')" /></div>
        
      
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import Formpaginanos from '/src/Formcurso.vue'; // Adjusted import path
  import Formpaginanos2 from '/src/Formmast.vue'; // Adjusted import path
  import Docentes from './prueba.vue'; // Adjusted import path
  import Curso from './prueba2.vue'; // Adjusted import path

  // Define a ref to track the visibility of each form
  const showFormDocentes = ref(false);
  const showFormCurso = ref(false);
  const showFormPaginanos = ref(false);
  const showFormPaginanos2 = ref(false);

  // Method to close a form based on its name
  const closeForm = (formName) => {
    if (formName === 'docentes') {
      showFormDocentes.value = false;
    } else if (formName === 'formPaginanos') {
      showFormPaginanos.value = false;
    }
    else if (formName === 'formPaginanos2') {
      showFormPaginanos2.value = false;
    }
    else if(formName === 'curso') {
      showFormCurso.value = false;
    }
  };
</script>

<style scoped>
 
  

  .container_main {
    width: 100%; /* Adjusted width */
    display: flex;
    margin-top: -5%;
  }
</style>
