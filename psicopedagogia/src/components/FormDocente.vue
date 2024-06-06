<template>
  <div>
     
 
     <!-- Modal form -->
     <div class="modalf" v-show="showForm">
       <div class="modal-contentf">
       <h2>Agregar Nuevo Docente</h2>
       <form @submit.prevent="submitForm">
         <!-- Input fields para el formulario -->
         <div class="form-groupf">
           <label for="nombre">Nombre:</label><br>
           <input type="text" id="nombre" v-model="nombre" required>
         </div>
         <div class="form-groupf">
           <label for="apodo">Apodo:</label><br>
           <input type="text" id="apodo" v-model="apodo" required>
         </div>
         <div class="form-groupf">
           <label for="cargo">Cargo:</label><br>
           <input type="text" id="cargo" v-model="cargo" required>
         </div>
         <div class="form-groupf">
           <label for="correo">Correo:</label><br>
           <input type="email" id="correo" v-model="correo" required>
         </div>
         <div class="form-groupf">
   <label for="datoc">Dato Cualquiera:</label><br>
   <input type="text" id="datoc" v-model="datoc" required>
 </div>
 
         <div class="form-groupf">
           <label for="imagen">Imagen:</label><br>
           <input type="file" id="imagen" @change="onFileChange" required>
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
      :message="'El docente ha sido agregada correctamente'"
      :titulo="'Docente agregada'"
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
     nombre: String,
     apodo: String,
     cargo: String,
     correo: String,
     datoc: String,
     imagen: String,
     index: Number,
     onclose: Function
   });
 
   const nombre = ref(props.nombre);
   const apodo = ref(props.apodo);
   const cargo = ref(props.cargo);
   const correo = ref(props.correo);
   const datoc = ref(props.datoc);
   const imagen = ref(props.imagen);
 
   const submitForm = async () => {
     try {
       const direc = "/backend/images/";
       console.log(currentFile.value);
       imagen.value = direc + currentFile.value.name;
       
       const formData = new FormData();
       formData.append('sampleFile', currentFile.value);
       
       const uploadResponse = await fetch('http://localhost:3000/upload', {
         method: 'POST',
         body: formData
       });
 
       console.log(uploadResponse);
 
       const docenteFormData = new FormData();
       docenteFormData.append('nombre', nombre.value);
       docenteFormData.append('apodo', apodo.value);
       docenteFormData.append('cargo', cargo.value);
       docenteFormData.append('correo', correo.value);
       docenteFormData.append('datoc', datoc.value);
       docenteFormData.append('imagen', imagen.value);
 
       const response = await fetch('http://localhost:3000/api/docentes', {
         method: 'POST',
         body: docenteFormData
       });
 
 
 
 
 
 
 
 
 
 
       if (response.ok) {
        showSuccessModal.value = true;
         nombre.value = '';
         apodo.value = '';
         cargo.value = '';
         correo.value = '';
         datoc.value = '';
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
 @import url('/src/assets/formdoc.css');
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