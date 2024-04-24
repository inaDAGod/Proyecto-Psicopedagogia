<template>
  <div class="modal" v-show="showForm">
    <div class="modal-content">
      <button style="margin-left: 90%;width: 9%;" class="close" @click="closeForm">&times;</button>
      <h2>Eliminar Docente</h2>
      <form @submit.prevent="submitForm">
        <!-- Dropdown/select input for selecting the docente's name -->
        <div class="form-group">
          <label for="selectNombre">Seleccione el nombre del docente:</label><br>
          <select id="selectNombre" v-model="selectedNombre" required>
            <option v-for="docente in docentes" :key="docente.id_docente" :value="docente.nombre">{{ docente.nombre }}</option>
          </select>
        </div>
        <div style="text-align: center;">
          <!-- Botón para enviar el formulario -->
          <button type="submit" class="boton-guardar">Eliminar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
  // Import necessary functions from Vue
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  // Define reactive variables
  const showForm = ref(true);
  const selectedNombre = ref('');
  const docentes = ref([]);

  // Fetch docentes data on component mount
  onMounted(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/docentes');
      docentes.value = response.data;
    } catch (error) {
      console.error('Error al obtener los docentes:', error);
    }
  });

  // Function to submit the form data to delete the selected docente
  const submitForm = async () => {
  try {
    const selectedDocente = docentes.value.find(docente => docente.nombre === selectedNombre.value);
    if (!selectedDocente) {
      console.error('No se encontró un docente con ese nombre.');
      return;
    }

    // Check if the user wants to delete the docente
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar este docente?');
    if (confirmDelete) {
      const response = await axios.delete(`http://localhost:3000/api/docentes/${selectedDocente.id_docente}`);
      if (response.status === 200) {
        console.log('Docente eliminado correctamente');
        closeForm(); // Close the form after successful deletion
      } else {
        console.error('Error al eliminar el docente:', response.data.error);
      }
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
};



  // Function to close the form
  const closeForm = () => {
    console.log('Closing form...');
    showForm.value = false; // Close the form directly
  };
</script>

<style scoped>
/* Adjust the import path relative to the component file */
@import './assets/formDocentes.css';
</style>
