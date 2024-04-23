<template>
  <div class="modal" v-show="showForm">
    <div class="modal-content">
      <button style="margin-left: 90%;width: 9%;" class="close" @click="closeForm">&times;</button>
      <h2>Agregar Nuevo Docente</h2>
      <form @submit.prevent="submitForm">
        <!-- Input fields para el formulario -->
        <div class="form-group">
          <label for="nombre">Nombre:</label><br>
          <input type="text" id="nombre" v-model="nombre" required>
        </div>
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
          <input type="text" id="datoc" v-model="datoCualquiera" required>
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
  import { ref } from 'vue';
  import { defineProps } from 'vue';

  // Define reactive variables
  const showForm = ref(true);
  const currentFile = ref(null);

  // Define props
  const props = defineProps({
    nombre: String,
    apodo: String,
    cargo: String,
    correo: String,
    datoc: String,
    imagen: String,
    index: Number,
    onclose: Function
  });

  // Initialize refs with props values
  const nombre = ref(props.nombre);
  const apodo = ref(props.apodo);
  const cargo = ref(props.cargo);
  const correo = ref(props.correo);
  const datoc = ref(props.datoc);
  const imagen = ref(props.imagen);

  // Function to submit the form data to the server
  const submitForm = async () => {
    try {
      const direc = "/backend/images/";
      console.log(currentFile.value);
      imagen.value = direc + currentFile.value.name;
      const formData = new FormData();
      formData.append('sampleFile', currentFile.value);
      fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      }).then(async (res) => {
        console.log(res);
        const formData = new FormData();
        formData.append('nombre', nombre.value);
        formData.append('apodo', apodo.value);
        formData.append('cargo', cargo.value);
        formData.append('correo', correo.value);
        formData.append('datoc', datoc.value);
        formData.append('imagen', imagen.value); // Update to 'imagen' attribute
        console.log(imagen.value);
        const response = await fetch('http://localhost:3000/api/docentes', {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          console.log('Docente guardado correctamente');
          closeForm(); // Close the form after successful save
        } else {
          console.error('Error al guardar el docente:', response.statusText);
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
