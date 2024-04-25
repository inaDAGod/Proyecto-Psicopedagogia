<template>
    <div class="modal" v-show="showForm">
      <div class="modal-content">
        <button class="close" @click="closeForm">&times;</button>
        <h2>Editar home</h2>
        <form @submit.prevent="submitForm">
          <label> Carrusel</label><br>
          <div class="form-group">
            <label for="imagen1">Imagen 1</label><br>
            <input type="file" id="imagen1" @change="onFileChange" required>

            <label for="imagen1">Imagen 1</label><br>
            <input type="file" id="imagen1" @change="onFileChange" required>

            <label for="imagen1">Imagen 1</label><br>
            <input type="file" id="imagen1" @change="onFileChange" required>

            <label for="imagen1">Imagen 1</label><br>
            <input type="file" id="imagen1" @change="onFileChange" required>

            <label for="imagen1">Imagen 1</label><br>
            <input type="file" id="imagen1" @change="onFileChange" required>

            <label for="imagen1">Imagen 1</label><br>
            <input type="file" id="imagen1" @change="onFileChange" required>

          </div>
          <div class="form-group">
            <label for="quienes_somos">¿Quiénes somos?:</label><br>
            <input type="text" id="quienes_somos" v-model="quienes_somos" required>
          </div>
          <div class="form-group">
            <label for="mision">Misión:</label><br>
            <textarea id="mision" v-model="mision" required></textarea>
          </div>
          <div class="form-group">
            <label for="mision_src">Imagen mision:</label><br>
            <input type="file" id="mision_src" @change="onFileChange" required>
          </div>
          <div class="form-group">
            <label for="vision">Visión:</label><br>
            <textarea id="vision" v-model="vision" required></textarea>
          </div>
          <div class="form-group">
            <label for="vision_src">Imagen vision:</label><br>
            <input type="file" id="vison_src" @change="onFileChange" required>
          </div>
          <div class="form-group">
            <label for="perfil_estudiante">Perfil de estudiante:</label><br>
            <textarea id="perfil_estudiante" v-model="perfil_estudiante" required></textarea>
          </div>
          <div class="form-group">
            <label for="perfil_estudiante_src">Imagen perfil estudiante:</label><br>
            <input type="file" id="perfil_estudiante_src" @change="onFileChange" required>
          </div>

          <div style="text-align: center;">
            <button class="boton-guardar">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { defineProps } from 'vue';
  // Variables reactivas para los campos del formulario
  const imagen1 = ref('');
  const quienes_somos = ref('');
  const mision = ref('');
  const mision_src = ref('');
  const vision = ref('');
  const vision_src = ref('');
  const perfil_estudiante = ref('');
  const perfil_estudiante_src = ref('');
  const showForm = ref(true);
  const currentFile = ref(null);
  
  const props = defineProps({
    onclose: Function,
  });
  // Función para enviar el formulario al servidor
  const submitForm = async () => {
    // Después de confirmar que la actualización se realizó correctamente en el backend
    // Actualiza los datos del home en el frontend
    paginaHome.value = {
      imagen1: imagen1.value,
      quienes_somos: quienes_somos.value,
      mision: mision.value,
      mision_src: mision_src.value,
      vision: vision.value,
      vision_src: vision_src.value,
      perfil_estudiante: perfil_estudiante.value,
      perfil_estudiante_src: perfil_estudiante_src.value
    };

    try {
      const direc = "/backend/images/";
      imagen1.value = direc + currentFile.value.name;//AÑADIR PARA ALS 6 IMAGENES
      mision_src.value = direc + currentFile.value.name;
      vision_src.value = direc + currentFile.value.name;
      perfil_estudiante_src.value = direc + currentFile.value.name;

      
      const formData = new FormData();
      formData.append('sampleFile', currentFile.value);
      fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      }).then(async (res) => {
        console.log(res);
        const formData = new FormData();
        formData.append('imagen1', imagen1.value);
        formData.append('quienes_somos', quienes_somos.value);
        formData.append('mision', mision.value);
        formData.append('mision_src', mision_src.value);
        formData.append('vision', mision.value);
        formData.append('vision_src', mision_src.value);
        formData.append('perfil_estudiante', perfil_estudiante.value);
        formData.append('perfil_estudiante_src', perfil_estudiante_src.value); 

        const response = await fetch('http://localhost:3000/api/home', {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          console.log('Home actualizado correctamente');
          closeForm(); // Cerrar el formulario después de guardar exitosamente
        } else {
          console.error('Error al actualizar home:', response.statusText);
        }
      })
      
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };
  
  // Función para manejar el cambio de archivo
  const onFileChange = (event) => {
    const file = event.target.files[0];
    currentFile.value = file;
  };
  
  // Función para cerrar el formulario
  const closeForm = () => {
   props.onclose();
  };
  </script>
  
  <style scoped>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  
  
  .modal-content {
    background-color: #FFCEE8;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    position: relative; /* Para que el botón de cierre esté posicionado correctamente */
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
    color: #FF7001; /* Color naranja para el botón de cierre */
  }
  
  .form-group {
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
    border-radius: 40px;
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
  }
  </style>
  