<template>
  <div class="card-container">
    <div class="card" v-for="(egresado, index) in egresados" :key="index">
      <div class="img-container">
        <img :src="egresado.src_foto" class="img-oval" alt="...">
      </div>
      <div class="card-caption">
        <p><b>{{ egresado.nombre }}</b></p>
        <p>{{ egresado.correo }}</p>
        <div class="divBoton">
          <div class="botones">
            <BotonD text="Editar" colorFondo="#BADF3A" colorTexto="black" @click="toggleForm(egresado)" />
            <BotonD text="Borrar" colorFondo="#FFA198" colorTexto="black" @click="borrarEgresado(egresado)" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <EgresadoForm v-show="selectedEgresado" :egresado="selectedEgresado"  @onclose="toggleForm(null)" />
  <div class="espacio"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BotonD from './BotonD.vue';
import EgresadoForm from './FormEditarEgresado.vue';

const egresados = ref([]);
const selectedEgresado = ref(null);

const toggleForm = (egresado) => {
  selectedEgresado.value = egresado;
};

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/egresados');
    egresados.value = response.data;
  } catch (error) {
    console.error('Error al obtener los egresados:', error);
  }
});

const borrarEgresado = async (egresado) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/egresados/${egresado._id}`);
    if (response.status === 200) {
      console.log('Egresado eliminado correctamente');
      // Actualizar la lista de egresados después de eliminar
      const index = egresados.value.findIndex((e) => e.id === egresado.id);
      if (index !== -1) {
        egresados.value.splice(index, 1);
      }
    }
  } catch (error) {
    console.error('Error al eliminar el egresado:', error);
  }
};
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
</style>
