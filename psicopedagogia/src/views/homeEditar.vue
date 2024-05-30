<template>
    <div class="modal-content-home">
      <h2>Editar Home</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group-home">
          <label for="imagen1">Imagen 1:</label><br>
          <input type="file" id="imagen1" @change="onFileChange('imagen1')" >
        </div>
        <div class="form-group-home">
          <label for="imagen2">Imagen 2:</label><br>
          <input type="file" id="imagen2" @change="onFileChange('imagen2')" >
        </div>
        <div class="form-group-home">
          <label for="imagen3">Imagen 3:</label><br>
          <input type="file" id="imagen3" @change="onFileChange('imagen3')" >
        </div>
        <div class="form-group-home">
          <label for="imagen4">Imagen 4:</label><br>
          <input type="file" id="imagen4" @change="onFileChange('imagen4')" >
        </div>
        <div class="form-group-home">
          <label for="imagen5">Imagen 5:</label><br>
          <input type="file" id="imagen5" @change="onFileChange('imagen5')" >
        </div>
        <div class="form-group-home">
          <label for="imagen6">Imagen 6:</label><br>
          <input type="file" id="imagen6" @change="onFileChange('imagen6')" >
        </div>
        <div class="form-group-home">
          <label for="quienes_somos">Quiénes Somos:</label><br>
          <textarea id="quienes_somos" v-model="quienesSomos" required></textarea>
        </div>
        <div class="form-group-home">
          <label for="mision">Misión:</label><br>
          <textarea id="mision" v-model="mision"></textarea>
        </div>
        <div class="form-group-home">
          <label for="mision_src">Imagen de Misión:</label><br>
          <input type="file" id="mision_src" @change="onFileChange('mision_src')" >
        </div>
        <div class="form-group-home">
          <label for="vision">Visión:</label><br>
          <textarea id="vision" v-model="vision"></textarea>
        </div>
        <div class="form-group-home">
          <label for="vision_src">Imagen de Visión:</label><br>
          <input type="file" id="vision_src" @change="onFileChange('vision_src')" >
        </div>
        <div class="form-group-home">
          <label for="perfil_estudiante">Perfil del Estudiante:</label><br>
          <textarea id="perfil_estudiante" v-model="perfilEstudiante"></textarea>
        </div>
        <div class="form-group-home">
          <label for="perfil_estudiante_src">Imagen de Perfil del Estudiante:</label><br>
          <input type="file" id="perfil_estudiante_src" @change="onFileChange('perfil_estudiante_src')" >
        </div>
        <div style="text-align: center;">
          <button class="boton-guardar">Guardar</button>
        </div>
      </form>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import axios from 'axios';
const props = defineProps({
  home: Object
});

const emit = defineEmits(['onclose']);

const quienesSomos = ref('');
const mision = ref('');
const vision = ref('');
const perfilEstudiante = ref('');
const currentFiles = {
  imagen1: null,
  imagen2: null,
  imagen3: null,
  imagen4: null,
  imagen5: null,
  imagen6: null,
  mision_src: null,
  vision_src: null,
  perfil_estudiante_src: null
};

watch(props, () => {
  if (props.home) {
    quienesSomos.value = props.home.quienes_somos;
    mision.value = props.home.mision;
    vision.value = props.home.vision;
    perfilEstudiante.value = props.home.perfil_estudiante;
  }
});

const submitForm = async () => {
  try {
    const direc = "/backend/images/";
    const formData = new FormData();

    for (const key in currentFiles) {
      if (currentFiles[key]) {
        formData.append(key, currentFiles[key]);
      }
    }

    // Adjunta los otros campos al FormData
    formData.append('quienes_somos', quienesSomos.value);
    formData.append('mision', mision.value);
    formData.append('vision', vision.value);
    formData.append('perfil_estudiante', perfilEstudiante.value);

    const response = await fetch('http://localhost:3000/api/homeUpdate', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      console.log('Datos del Home actualizados correctamente');
      closeForm();
    } else {
      console.error('Error al actualizar los datos del Home:', response.statusText);
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
};

const onFileChange = (field) => (event) => {
  const file = event.target.files[0];
  currentFiles[field] = file;
};

</script>

<style scoped>
.modal-content-home {
  background-color: white;
  padding: 5%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 80%;
} 

.form-group-home {
  margin-bottom: 10px;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="number"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5vh;
  box-sizing: border-box;
}

h2 {
  color: #FF2B9D;
  text-align: center;
}

.boton-guardar {
  background-color: #BADF3A;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.boton-guardar:hover {
  transform: scale(1.05);
}
</style>
