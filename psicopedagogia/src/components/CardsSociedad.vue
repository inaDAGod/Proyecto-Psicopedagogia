<template>
    <div class="card-container">
      <div class="card" v-for="(investigacion, index) in investigaciones" :key="index">
        <div class="img-container">
          <img :src="investigacion.src_foto" class="img-oval" alt="...">
        </div>
        <div class="card-caption">
          <p><b>{{ investigacion.titulo }}</b></p>
          <div class="divBoton">
            <div class="botones">
              <button class="bot-editar" @click="toggleForm(investigacion)">Editar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
     <!--<RedForm v-show="selectedRed" :red="selectedRed"  @onclose="toggleForm(null)" /> -->
    <div class="espacio"></div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import BotonD from './BotonD.vue';
  //import RedForm from './RedFormEdit.vue';
  
  const investigaciones = ref([]);
  const selectedInvestigacion = ref(null);
  
  const toggleForm = (investigacion) => {
    selectedInvestigacion.value = investigacion;
  };
  
  onMounted(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/sociedad/investigaciones');
      investigaciones.value = response.data;
    } catch (error) {
      console.error('Error al obtener las investigaciones:', error);
    }
  });
  
  </script>
  
  <style scoped>
  .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin: 20px;
  }
  
  .card {
    width: 40%;
    height: 300px;
    background-color: #f8f8f8;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s;
  }
  
  .card:hover {
    transform: scale(1.05);
  }
  
  .img-container {
    width: 100%;
    height: 200px;
    overflow: hidden;
  }
  
  .img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .card-caption {
    padding: 15px;
    text-align: center;
  }
  
  .card-caption p {
    font-size: 100%;
  }
  
  .espacio {
    margin-top: 20px;
  }
  
  .botones {
    display: flex;
    justify-content: center;
  }
  .botones > * {
    margin: 0 10px; /* Ajusta el espacio entre los botones */
  }
  .bot-editar {
      background-color: #BADF3A;
      color: black;
      padding: 10px 20px;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      height: 20%;
      width: 50%;
      font-size: 100%;
    }
  </style>
  