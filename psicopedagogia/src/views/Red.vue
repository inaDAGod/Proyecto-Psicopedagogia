<template>
  <div id="app">
    <div class="tituloRed">
    <h1>Red Psicopedagogia</h1>
    <h2>Obras Sociales de la Iglesia</h2>
  </div>
  <div class="cards-redes">
    <div
      class="card"
      style="width: 18rem;"
      v-for="(card, index) in cards"
      :key="index"
    >
      <img :src="card.src" class="card-img-top" alt="...">
      <div class="info">
        <h5 class="card-title">{{ card.titulo }}</h5>
        <div class="botonConteiner">
          <a :href="card.enlace" class="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-right-circle-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const cards = ref([]);

    const obtenerRed = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/red');
        cards.value = response.data;
      } catch (error) {
        console.error('Error fetching red:', error);
      }
    };

    onMounted(() => {
      obtenerRed();
    });

    return {
      cards
    };
  }
};
</script>
  
  <style scoped>
    @import url('/src/assets/red.css');

  </style>
  