<template>
  <div class="background-container">
    <div id="app">
      <h1 class="prehead1">PREGRADO</h1>
      <div style="margin:20px;">
        <div style="display: flex; align-items: center;">
          <h3 class="prehead3"></h3>
          <div style="display: flex; align-items: center; justify-content: flex-end; flex-grow: 1;">
            <div style="margin:20px;">
              <div style="margin:20px;">
                <a :href="'https://lpz.ucb.edu.bo/wp-content/uploads/2023/12/PSP-2024.pdf'">
                  <button class="b-preMalla">Descargar malla</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="prevideo-container">
        <iframe class="vidma" :src="getYouTubeEmbedUrl('https://www.youtube.com/watch?v=nPL5hCXxmBw')" frameborder="0" allowfullscreen></iframe>
      </div><br><br>

      <!-- Asignaturas carousel -->
      <h4 class="prehead4">Asignaturas representativas</h4>
      <div class="div-previd">
        <Carousel ref="asignaturasCarousel" :itemsToShow="1" :wrapAround="true" :transition="500">
          <Slide v-for="video in videosAsignaturas" :key="video.id">
            <iframe v-if="video.url" class="video-preb" :src="getYouTubeEmbedUrl(video.url)" frameborder="0" allowfullscreen></iframe>
            <div v-else class="video-preb"></div>
          </Slide>
        </Carousel>
        <!-- Navigation buttons -->
        <div>
          <button @click="prevAsignaturas" class="nav-buttonprep"><img class="flecha" src="/src/assets/images/flechap.png" alt="Imagen del logo"></button>
          <button @click="nextAsignaturas" class="nav-buttonpren"><img class="flecha" src="/src/assets/images/flechan.png" alt="Imagen del logo"></button>
        </div>
      </div>

      <!-- Actividades carousel -->
      <h2 class="prehead2">Actividades curriculares Representativas PSP</h2>
      <div class="div-previd">
        <Carousel ref="actividadesCarousel" :itemsToShow="1" :wrapAround="true" :transition="500">
          <Slide v-for="video in videosActividades" :key="video.id">
            <iframe v-if="video.url" class="video-preb" :src="getYouTubeEmbedUrl(video.url)" frameborder="0" allowfullscreen></iframe>
            <div v-else class="video-preb"></div>
          </Slide>
        </Carousel>
        <!-- Navigation buttons -->
        <div>
          <button @click="prevActividades" class="nav-buttonprep"><img class="flecha" src="/src/assets/images/flechap.png" alt="Imagen del logo"></button>
          <button @click="nextActividades" class="nav-buttonpren"><img class="flecha" src="/src/assets/images/flechan.png" alt="Imagen del logo"></button>
        </div>
      </div>

      <!-- Experiencias carousel -->
      <h2 class="prehead2">Experiencias de trabajo de Campo</h2>
      <div class="div-previd">
        <Carousel ref="experienciasCarousel" :itemsToShow="1" :wrapAround="true" :transition="500">
          <Slide v-for="image in images" :key="image.id">
            <img v-if="image.url" class="img-preb" :src="image.url" alt="carousel image">
            <div v-else class="img-preb"></div>
          </Slide>
        </Carousel>
        <!-- Navigation buttons -->
        <div>
          <button @click="prevExperiencias" class="nav-buttonprep"><img class="flecha" src="/src/assets/images/flechap.png" alt="Imagen del logo"></button>
          <button @click="nextExperiencias" class="nav-buttonpren"><img class="flecha" src="/src/assets/images/flechan.png" alt="Imagen del logo"></button>
        </div>
      </div>

      <!-- Perfiles carousel -->
      <h2 class="prehead2">Perfiles de estudiantes PSP</h2>
      <div class="div-previd">
        <Carousel ref="perfilesCarousel" :itemsToShow="1" :wrapAround="true" :transition="500">
          <Slide v-for="video in videosPerfiles" :key="video.id">
            <iframe v-if="video.url" class="video-preb" :src="getYouTubeEmbedUrl(video.url)" frameborder="0" allowfullscreen></iframe>
            <div v-else class="video-preb"></div>
          </Slide>
        </Carousel>
        <!-- Navigation buttons -->
        <div>
          <button @click="prevPerfiles" class="nav-buttonprep"><img class="flecha" src="/src/assets/images/flechap.png" alt="Imagen del logo"></button>
          <button @click="nextPerfiles" class="nav-buttonpren"><img class="flecha" src="/src/assets/images/flechan.png" alt="Imagen del logo"></button>
        </div>
      </div>

      <!-- Other content -->
      <h2 class="prehead2">Áreas laborales PSP</h2>
      <div style="text-align: center; margin-bottom: 5%;">
        <table class="pre-tab" style="margin: 0 auto;">
          <tr class="pre-tr">
            <td class="pre-td">
              <p class="p-pre">{{ paginaNosotros.educativo }}</p>
            </td>
            <td class="pre-td">
              <img alt="Ped" class="logo-pre" :src="paginaNosotros.imgedu">
            </td>
          </tr>
        </table>
      </div>

      <div class="footer-pre" style="text-align: center; margin-bottom: 0;">
        <a :href="paginaNosotros.intercambio"><button class="b-pre2">Intercambios estudiantiles</button></a><br>
        <a :href="paginaNosotros.alianza"><button class="b-pre2">Alianzas con otras Universidades</button></a><br><br><br>
      </div>
    </div>
  </div>
</template>


<script>
import { defineComponent, ref, onMounted, computed } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
import axios from 'axios';
import 'vue3-carousel/dist/carousel.css';

export default defineComponent({
  name: 'Pregrado',
  components: {
    Carousel,
    Slide,
  },
  setup() {
    const paginaNosotros = ref({
      videos_asignaturas_1: '',
      videos_asignaturas_2: '',
      videos_asignaturas_3: '',
      videos_asignaturas_4: '',
      videos_asignaturas_5: '',
      videos_actividades_1: '',
      videos_actividades_2: '',
      videos_actividades_3: '',
      videos_actividades_4: '',
      videos_actividades_5: '',
      videos_perfiles_1: '',
      videos_perfiles_2: '',
      videos_perfiles_3: '',
      videos_perfiles_4: '',
      videos_perfiles_5: '',
      images_1: '',
      images_2: '',
      images_3: '',
      images_4: '',
      images_5: '',
      educativo: '',
      imgedu: '',
      intercambio: '',
      alianza: ''
    });

    const obtenerInfoPagina = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/pregrado');
        Object.assign(paginaNosotros.value, response.data);
      } catch (error) {
        console.error('Error fetching pregrado data:', error);
      }
    };

    const getYouTubeEmbedUrl = (url) => {
      if (!url) return '';
      try {
        const videoId = new URL(url).searchParams.get('v');
        return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
      } catch (error) {
        console.error('Invalid URL:', url);
        return '';
      }
    };

    onMounted(() => {
      obtenerInfoPagina();
    });

    const videosAsignaturas = computed(() => [
      { id: 1, url: paginaNosotros.value.videos_asignaturas_1 },
      { id: 2, url: paginaNosotros.value.videos_asignaturas_2 },
      { id: 3, url: paginaNosotros.value.videos_asignaturas_3 },
      { id: 4, url: paginaNosotros.value.videos_asignaturas_4 },
      { id: 5, url: paginaNosotros.value.videos_asignaturas_5 }
    ]);

    const videosActividades = computed(() => [
      { id: 1, url: paginaNosotros.value.videos_actividades_1 },
      { id: 2, url: paginaNosotros.value.videos_actividades_2 },
      { id: 3, url: paginaNosotros.value.videos_actividades_3 },
      { id: 4, url: paginaNosotros.value.videos_actividades_4 },
      { id: 5, url: paginaNosotros.value.videos_actividades_5 }
    ]);

    const videosPerfiles = computed(() => [
      { id: 1, url: paginaNosotros.value.videos_perfiles_1 },
      { id: 2, url: paginaNosotros.value.videos_perfiles_2 },
      { id: 3, url: paginaNosotros.value.videos_perfiles_3 },
      { id: 4, url: paginaNosotros.value.videos_perfiles_4 },
      { id: 5, url: paginaNosotros.value.videos_perfiles_5 }
    ]);

    const images = computed(() => [
      { id: 1, url: paginaNosotros.value.images_1 },
      { id: 2, url: paginaNosotros.value.images_2 },
      { id: 3, url: paginaNosotros.value.images_3 },
      { id: 4, url: paginaNosotros.value.images_4 },
      { id: 5, url: paginaNosotros.value.images_5 }
    ]);

    const asignaturasCarousel = ref(null);
    const actividadesCarousel = ref(null);
    const experienciasCarousel = ref(null);
    const perfilesCarousel = ref(null);

    const nextAsignaturas = () => {
      asignaturasCarousel.value.next();
    };

    const prevAsignaturas = () => {
      asignaturasCarousel.value.prev();
    };

    const nextActividades = () => {
      actividadesCarousel.value.next();
    };

    const prevActividades = () => {
      actividadesCarousel.value.prev();
    };

    const nextExperiencias = () => {
      experienciasCarousel.value.next();
    };

    const prevExperiencias = () => {
      experienciasCarousel.value.prev();
    };

    const nextPerfiles = () => {
      perfilesCarousel.value.next();
    };

    const prevPerfiles = () => {
      perfilesCarousel.value.prev();
    };

    return {
      paginaNosotros,
      videosAsignaturas,
      videosActividades,
      videosPerfiles,
      images,
      getYouTubeEmbedUrl,
      nextAsignaturas,
      prevAsignaturas,
      nextActividades,
      prevActividades,
      nextExperiencias,
      prevExperiencias,
      nextPerfiles,
      prevPerfiles,
      asignaturasCarousel,
      actividadesCarousel,
      experienciasCarousel,
      perfilesCarousel
    };
  }
});
</script>



<style scoped>
@import url('/src/assets/pregrado.css');
.background-container {
  background-image: url('/src/assets/images/background.png');
  background-size: cover;
  background-position: center;
  height: 100vh; /* Adjust the height as needed */
}

.nav-buttonprep {
  font-family: 'Oswald';
  font-size: 20px;
  background-color:transparent;
  color: white;
  border-radius: 100%;
  width: 10%;
  padding: 1px 1px;
  margin: 5px;
  border: none;
  cursor: pointer;
  margin-left: 33%;
  margin-top: 2%;
}

.nav-buttonpren {
  font-family: 'Oswald';
  font-size: 20px;
  background-color:transparent;
  color: white;
  border-radius: 100%;
  width: 10%;
  padding: 1px 1px;
  margin: 5px;
  border: none;
  cursor: pointer;
  margin-left: 15%;
}

.flecha {
  border-radius: 100%;
  width: 25%;
}
</style>
