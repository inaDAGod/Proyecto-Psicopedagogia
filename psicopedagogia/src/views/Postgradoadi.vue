<template>
  <div id="app" class="container">
    <div class="container_main">
      <table>
        <tr>
          <td style="width: 50%;">
            <Curso @closeForm="closeForm('curso')" />
          </td>
          <td style="width: 50%;">
            <Formpaginanos @closeForm="closeForm('formPaginanos')" />
          </td>
        </tr>
        <tr>
          <td style="width: 70%;">
            <Docentes @closeForm="closeForm('docentes')" />
          </td>
          <td style="width: 30%;">
            <Formpaginanos2 @closeForm="closeForm('formPaginanos2')" />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>


<script setup>
  import { ref } from 'vue';
  import Formpaginanos from '@/components/Formcurso.vue'; // Adjusted import path
  import Formpaginanos2 from '@/components/Formmast.vue'; // Adjusted import path
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
