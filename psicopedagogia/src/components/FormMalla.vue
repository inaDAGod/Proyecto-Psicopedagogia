<template>
    <div>
      <!-- Notification -->
      <div v-show="showNotification" class="notification">
        Semestre creado exitosamente!
      </div>
  
      <!-- Modal form -->
      <div class="modalf" v-show="showForm">
        <div class="modal-contentf">
          <h2 style="margin-left: 23%">Agregar a la Malla</h2>
          <form @submit.prevent="submitForm">
            <!-- Input fields para el formulario -->
            <div class="form-groupf">
              <label for="semestre">Semestre:</label><br>
              <input type="number" id="semestre" v-model="semestre" min="1" max="9" required>
            </div>
            <div class="form-groupf">
              <label for="area">Área:</label><br>
              <select style="border-radius: 20px;" id="area" v-model="area" required>
                <option value="ASIGNATURAS BÁSICAS">ASIGNATURAS BÁSICAS</option>
                <option value="PSICOPEDAGOGÍA DE LA EDUCACIÓN FORMAL Y NO FORMAL">PSICOPEDAGOGÍA DE LA EDUCACIÓN FORMAL Y NO FORMAL</option>
                <option value="PSICOPEDAGOGÍA CLÍNICA">PSICOPEDAGOGÍA CLÍNICA</option>
                <option value="PSICOPEDAGOGÍA LABORAL">PSICOPEDAGOGÍA LABORAL</option>
                <option value="PSICOPEDAGOGÍA SOCIAL">PSICOPEDAGOGÍA SOCIAL</option>
                <option value="FORMACIÓN GENÉRICA">FORMACIÓN GENÉRICA</option>
                <option value="LIBRES">LIBRES</option>
              </select>
            </div>
            <div class="form-groupf">
           <label for="sigla">Sigla:</label><br>
           <input type="text" id="sigla" v-model="sigla" >
         </div>
         <div class="form-groupf">
           <label for="materia">Materia:</label><br>
           <input type="text" id="materia" v-model="materia" >
         </div>
         <div class="form-groupf">
           <label for="requisito">Requisito:</label><br>
           <input type="text" id="requisito" v-model="requisito" >
         </div>
            <div class="form-groupf">
              <label for="descrip">Descripción:</label><br>
              <textarea id="descrip" v-model="descrip"></textarea>
            </div>
            <div style="text-align: center;">
              <!-- Botón para enviar el formulario  -->
              <button class="boton-guardarf">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
   
   <script setup>
     import { ref } from 'vue';
     import { defineProps } from 'vue';
   
     const showForm = ref(true);
     const showNotification = ref(false);
   
     const props = defineProps({
       semestre: Number,
       area: String,
       sigla: String,
       materia: String,
       requisito: String,
       descrip: String,
       index: Number,
       onclose: Function
     });
   
     const semestre = ref(props.semestre);
     const area = ref(props.area);
     const sigla = ref(props.sigla);
     const materia = ref(props.materia);
     const requisito = ref(props.requisito);
     const descrip = ref(props.descrip);
   
     const submitForm = async () => {
       try {
         
   
         const docenteFormData = new FormData();
         docenteFormData.append('semestre', semestre.value);
         docenteFormData.append('area', area.value);
         docenteFormData.append('sigla', sigla.value);
         docenteFormData.append('materia', materia.value);
         docenteFormData.append('requisito', requisito.value);
         docenteFormData.append('descrip', descrip.value);
   
         const response = await fetch('http://localhost:3000/api/semestre', {
           method: 'POST',
           body: docenteFormData
         });
   
   
   
   
   
   
   
   
   
   
         if (response.ok) {
           console.log('semestre guardado correctamente');
           showNotification.value = true; // Show notification
           setTimeout(() => {
             showNotification.value = false; // Hide notification after a delay
           }, 3000);
           // Reset form fields
           semestre.value = '';
           area.value = '';
           sigla.value = '';
           materia.value = '';
           requisito.value = '';
           descrip.value = '';
         } else {
           console.error('Error al guardar el semestre:', response.statusText);
         }
       } catch (error) {
         console.error('Error al enviar el formulario:', error);
       }
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