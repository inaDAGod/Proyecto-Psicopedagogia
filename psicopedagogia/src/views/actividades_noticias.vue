<template>
  <div>
    <div class="content">
      <div class="titulo">
        <h1>NOTICIAS Y ACTIVIDADES</h1>
      </div>
    </div>
    <div class="container-anuncio">
      <div class="anuncio">
        <div class="text-box-act">
          <div class="text-content-act">
            <p>¡NUESTRAS</p>
            <p>PRÓXIMAS</p>
            <p>ACTIVIDADES!</p>
          </div>
        </div>
      </div>
    </div>
    <div class="vacio">
      <br>
    </div>
    <div class="subtitulo-actividad">
      <h1>ACTIVIDADES</h1>
    </div>
    <br>
    <div class="container-actividades row">
      <div v-for="(actividad, index) in actividades" :key="index" class="col-lg-4 col-md-6 col-sm-12 mb-3">
        <Actividad :actividad="actividad" />
      </div>
    </div>
    <div class="subtitulo-actividad">
      <h1>NOTICIAS</h1>
    </div>
    <br>
    <div class="container-noticias row">
      <div v-for="(noticia, index) in noticias" :key="index" class="col-lg-4 col-md-6 col-sm-12 mb-3">
        <Noticia :noticia="noticia" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Actividad from '/src/components/ActividadNormal.vue';
import Noticia from '/src/components/NoticiaNormal.vue';

const actividades = ref([]);
const noticias = ref([]);

const obtenerActividades = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/actividades');
    actividades.value = response.data;
  } catch (error) {
    console.error('Error fetching Actividades:', error);
  }
};

const obtenerNoticias = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/noticias');
    noticias.value = response.data;
  } catch (error) {
    console.error('Error fetching Noticias:', error);
  }
};

onMounted(() => {
  obtenerActividades();
  obtenerNoticias();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');
@import url('/src/assets/estilo.css');
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');

.titulo h1 {
  font-size: 8vh;
  color: #FF7001;
  font-family: 'Koulen', 'sans-serif';
  margin-top: 8vh;
  margin-left: 5%;

}

.subtitulo-actividad h1 {
  font-size: 7vh;
  color: #FF7001;
  font-family: 'Koulen', 'sans-serif';
  margin-top: 4vh;
  margin-left: 5%;
}

.container-anuncio {
  text-align: center;
  align-items: center;
  margin-right: 7%;
  margin-left: 7%;
  width: 86%;
}

.anuncio {
  text-align: center;
}

.text-box-act {
  padding: 3vh;
  border-radius: 5vh;
  text-align: center;
  align-items: center;
  padding-left: 5%;
  padding-right: 5%;
  background-color: #BEAFE5;
}

.text-content-act p {
  font-size: 5vh;
  font-family: 'Oswald', sans-serif;
  color: white;
  text-align: center;
}

.container-actividades,
.container-noticias {
  margin-left: 5%;
  margin-right: 5%;
  width: 100%;
  text-align: center;
}

@media (max-width: 992px) {
  .container-actividades, .container-noticias {
    width: 100%;
  }
  .subtitulo-actividad h1 {
    font-size: 3.7vh;
  }
}

@media (max-width: 768px) {
  .subtitulo-actividad h1 {
    font-size: 2.7vh;
  }
}

@media (max-width: 576px) {
  .subtitulo-actividad h1 {
    font-size: 2.5vh;
  }
}
</style>
