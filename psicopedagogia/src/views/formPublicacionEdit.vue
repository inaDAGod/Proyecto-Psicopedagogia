<template>
    <div class="modal" v-show="showForm">
      <div class="modal-content">
        <button class="close" @click="closeForm">&times;</button>
        <h2>Editar publicación</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="titulo">Título:</label><br>
            <input type="text" id="titulo" v-model="titulo" required>
          </div>
          <div class="form-group">
            <label for="autor">Autor:</label><br>
            <input type="text" id="autor" v-model="autor" required>
          </div>
          <div class="form-group">
            <label for="descripcion">Descripción:</label><br>
            <textarea id="descripcion" v-model="descripcion"></textarea>
          </div>
          <div class="form-group">
            <label for="anio">Año:</label><br>
            <input type="number" id="anio" v-model="anio" required>
          </div>
          <div class="form-group">
            <label for="ruta">Ruta:</label><br>
            <input type="text" id="ruta" v-model="ruta" required>
          </div>
          <div style="text-align: center;">
            <button class="boton-guardar">Guardar</button>
          </div>
        </form>
      </div>
    </div>
</template>
  
<script setup>
import { ref, defineProps, watch } from 'vue';

const showForm = ref(true);
const props = defineProps({
  titulo: String,
  autor: String,
  descripcion: String,
  anio: Number,
  ruta: String,
  id: String,
  onclose: Function
});

const id = ref(props.id);
const titulo = ref(props.titulo);
const autor = ref(props.autor);
const descripcion = ref(props.descripcion);
const anio = ref(props.anio);
const ruta = ref(props.ruta);

// Watch global para actualizar las variables locales cuando cambian las propiedades
watch(
  () => [props.titulo, props.autor, props.descripcion, props.anio, props.ruta],
  ([newTitulo, newAutor, newDescripcion, newAnio, newRuta]) => {
    titulo.value = newTitulo;
    autor.value = newAutor;
    descripcion.value = newDescripcion;
    anio.value = newAnio;
    ruta.value = newRuta;
  },
  { deep: true }
);

const submitForm = async () => {
  try {
    const formData = new FormData(); 
    formData.append('id', props.id);
    formData.append('titulo', titulo.value);
    formData.append('autor', autor.value);
    formData.append('descripcion', descripcion.value);
    formData.append('anio', anio.value);
    formData.append('ruta', ruta.value);

    const response = await fetch('http://localhost:3000/api/publicacionesUpdate', {
      method: 'POST',
      body: formData 
    });
    
    if (response.ok) {
      console.log('Publicacion actualizada correctamente');
      closeForm(); 
    } else {
      console.error('Error al actualizar publicacion:', response.statusText);
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
};

const closeForm = () => {
  props.onclose();
};
</script>
  
<style scoped>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 500px;
    max-width: 90%;
  }
  
  .close {
    background: none;
    border: none;
    font-size: 30px;
    position: absolute;
    top: 10px;
    right: 10px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group-home {
    margin-bottom: 15px;
    width: 100%;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input, textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  .boton-guardar {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .boton-guardar:hover {
    background-color: #45a049;
  }
</style>
  