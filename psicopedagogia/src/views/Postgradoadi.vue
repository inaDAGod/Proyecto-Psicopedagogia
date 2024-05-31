<template>
  <div id="app" class="container">
    <div class="container_main">
      <div class="flex-container">
        <div class="flex-item" style="flex: 1;">
          <Curso @closeForm="closeForm('curso')" />
        </div>
        <div class="flex-item" style="flex: 1;">
          <Formpaginanos @closeForm="closeForm('formPaginanos')" />
        </div>
      </div>
      <div class="flex-container">
        <div class="flex-item" style="flex: 7;">
          <Docentes @closeForm="closeForm('docentes')" />
        </div>
        <div class="flex-item" style="flex: 3;">
          <Formpaginanos2 @closeForm="closeForm('formPaginanos2')" />
        </div>
      </div>
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
  } else if (formName === 'formPaginanos2') {
    showFormPaginanos2.value = false;
  } else if (formName === 'curso') {
    showFormCurso.value = false;
  }
};
</script>

<style scoped>
.container_main {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: -10%;
}

.flex-container {
  display: flex;
  width: 100%;
}

.flex-item {
  padding: 10px;
}
</style>
