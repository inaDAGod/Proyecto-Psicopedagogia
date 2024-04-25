<template>
    <div class="modal" v-show="showForm">
      <div class="modal-content">
        <button style="margin-left: 90%;width: 9%;" class="close" @click="closeForm">&times;</button>
        <h2>Modificar Docente</h2>
        <form @submit.prevent="submitForm">
          <!-- Dropdown/select input for selecting the docente's name -->
          <div class="form-group">
            <label for="selectNombre">Seleccione el nombre del docente:</label><br>
            <select id="selectNombre" v-model="selectedNombre" required>
              <option v-for="docente in docentes" :key="docente.id_docente" :value="docente.nombre">{{ docente.nombre }}</option>
            </select>
          </div>
          <!-- Input fields for the rest of the form -->
          <div class="form-group">
            <label for="apodo">Apodo:</label><br>
            <input type="text" id="apodo" v-model="apodo" required>
          </div>
          <div class="form-group">
            <label for="cargo">Cargo:</label><br>
            <input type="text" id="cargo" v-model="cargo" required>
          </div>
          <div class="form-group">
            <label for="correo">Correo:</label><br>
            <input type="email" id="correo" v-model="correo" required>
          </div>
          <div class="form-group">
            <label for="datoc">Dato Cualquiera:</label><br>
            <input type="text" id="datoc" v-model="datoc" required>
          </div>
          <div class="form-group">
            <label for="imagen">Imagen:</label><br>
            <input type="file" id="imagen" @change="onFileChange" required>
          </div>
          <div style="text-align: center;">
            <!-- Botón para enviar el formulario -->
            <button class="boton-guardar">Guardar</button>
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
    const currentFile = ref(null);
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
  
    // Initialize other reactive variables
    const apodo = ref('');
    const cargo = ref('');
    const correo = ref('');
    const datoc = ref('');
  
    // Function to submit the form data to the server
    const submitForm = async () => {
      try {
        const selectedDocente = docentes.value.find(docente => docente.nombre === selectedNombre.value);
        if (!selectedDocente) {
          console.error('No se encontró un docente con ese nombre.');
          return;
        }
  
        const direc = "/backend/images/";
        console.log(currentFile.value);
        const imagenURL = direc + currentFile.value.name;
        const formData = new FormData();
        formData.append('sampleFile', currentFile.value);
        fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData
        }).then(async (res) => {
          console.log(res);
          const formData = new FormData();
          formData.append('id_docente', selectedDocente.id_docente);
          formData.append('nombre', selectedNombre.value);
          formData.append('apodo', apodo.value);
          formData.append('cargo', cargo.value);
          formData.append('correo', correo.value);
          formData.append('datoc', datoc.value);
          formData.append('imagen', imagenURL);
          console.log(imagenURL);
          const response = await fetch('http://localhost:3000/api/docentesUpdate', {
            method: 'POST',
            body: formData
          });
          if (response.ok) {
            console.log('Docente actualizado correctamente');
            closeForm(); // Close the form after successful update
          } else {
            console.error('Error al actualizar el docente:', response.statusText);
          }
        });
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      }
    };
  
    // Function to handle file change
    const onFileChange = (event) => {
      const file = event.target.files[0];
      currentFile.value = file;
    };
  
    // Function to close the form
    const closeForm = () => {
      console.log('Closing form...');
      showForm.value = false; // Close the form directly
    };
  </script>
  
  <style scoped>
  @import url('.\assets\formDocentes.css');
  </style>
  