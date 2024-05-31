<template>
  <div id="app" class="container">
    <!-- Use Docentes component -->
    <div class="container_main">
      <div class="flex-container">
        <div class="flex-item" style="flex: 7;">
          <Docentes @closeForm="closeForm('docentes')" />
        </div>
        <div class="flex-item" style="flex: 2;">
          <Formpaginanos @closeForm="closeForm('formPaginanos')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Formpaginanos from '@/components/FormMalla.vue'; // Adjusted import path
import Docentes from './Mallaadmin.vue'; // Adjusted import path

// Define a ref to track the visibility of each form
const showFormDocentes = ref(false);
const showFormPaginanos = ref(false);

// Method to close a form based on its name
const closeForm = (formName) => {
  if (formName === 'docentes') {
    showFormDocentes.value = false;
  } else if (formName === 'formPaginanos') {
    showFormPaginanos.value = false;
  }
};
</script>

<style scoped>
.container_main {
  width: 100%;
  display: flex;
  justify-content: center;
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
