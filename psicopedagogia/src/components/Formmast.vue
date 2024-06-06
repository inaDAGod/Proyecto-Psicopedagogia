<template>
    <div>
      
  
      <!-- Modal form -->
      <div class="modalf" v-show="showForm">
        <div class="modal-contentf">
          <h2>Agregar Nueva Maestria</h2>
          <form @submit.prevent="submitForm">
            <!-- Input fields para el formulario -->
            <div class="form-groupf">
              <label for="titulo">Titulo:</label><br>
              <input type="text" id="titulo" v-model="titulo" required>
            </div>
            <div class="form-groupf">
            <label for="about">Sobre Curso:</label><br>
            <textarea style="width: 100%;" id="about" v-model="about" rows="2" required></textarea>
          </div>
          <div class="form-groupf">
            <label for="competencia">Competencia:</label><br>
            <textarea style="width: 100%;" id="competencia" v-model="competencia" rows="2" required></textarea>
          </div>
          <div class="form-groupf">
            <label for="requisitos">Requisitos:</label><br>
            <textarea style="width: 100%;" id="requisitos" v-model="requisitos" rows="2" required></textarea>
          </div>
            <div class="form-groupf">
              <label for="fecha">Fecha:</label><br>
              <input type="date" id="fecha" v-model="fecha" required>
            </div>
            <div class="form-groupf">
              <label for="img">Imagen:</label><br>
              <input type="file" id="img" @change="onFileChange" required>
            </div>
            <div style="text-align: center;">
              <!-- Botón para enviar el formulario -->
              <button class="boton-guardarf">Guardar</button>
            </div>
          </form>
        </div>
      </div>
      <SuccessEdit
      v-if="showSuccessModal"
      @onClose="closeSuccessModal"
      :message="'El curso ha sido agregada correctamente'"
      :titulo="'Curso agregada'"
    />
    </div>
  </template>
   
   <script setup>
     import { ref } from 'vue';
     import { defineProps } from 'vue';
     import SuccessEdit from '/src/components/ModalNoti.vue'; 

const showSuccessModal = ref(false); 
     const showForm = ref(true);
     const showNotification = ref(false);
     const currentFile = ref(null);
   
     const props = defineProps({
       titulo: String,
       about: String,
       competencia: String,
       requisitos: String,
       fecha: String,
       img: String,
       index: Number,
       onclose: Function
     });
   
     const titulo = ref(props.titulo);
     const about = ref(props.about);
     const competencia = ref(props.competencia);
     const requisitos = ref(props.requisitos);
     const fecha = ref(props.fecha);
     const img = ref(props.img);
   
     const submitForm = async () => {
       try {
         const direc = "/backend/images/";
         console.log(currentFile.value);
         img.value = direc + currentFile.value.name;
         
         const formData = new FormData();
         formData.append('sampleFile', currentFile.value);
         
         const uploadResponse = await fetch('http://localhost:3000/upload', {
           method: 'POST',
           body: formData
         });
   
         console.log(uploadResponse);
   
         const docenteFormData = new FormData();
         docenteFormData.append('titulo', titulo.value);
         docenteFormData.append('about', about.value);
         docenteFormData.append('competencia', competencia.value);
         docenteFormData.append('requisitos', requisitos.value);
         docenteFormData.append('fecha', fecha.value);
         docenteFormData.append('img', img.value);
   
         const response = await fetch('http://localhost:3000/api/maestria', {
           method: 'POST',
           body: docenteFormData
         });
   
         if (response.ok) {
          showSuccessModal.value = true;
           titulo.value = '';
           about.value = '';
           competencia.value = '';
           requisitos.value = '';
           fecha.value = '';
           currentFile.value = null;
         } else {
           console.error('Error al guardar el docente:', response.statusText);
         }
       } catch (error) {
         console.error('Error al enviar el formulario:', error);
       }
     };
     const closeSuccessModal = () => {
  showSuccessModal.value = false;
  closeForm();
};
   
     const onFileChange = (event) => {
       const file = event.target.files[0];
       currentFile.value = file;
     };
   </script>
   <style scoped>
   @import url('/src/assets/formagrnos.css');
   .notification {
     background-color: #4CAF50; /* Green */
     color: white;
     padding: 15px;
     position: fixed;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     z-index: 1000;
     border-radius: 5px;
     text-align: center;
   }
   </style>
   