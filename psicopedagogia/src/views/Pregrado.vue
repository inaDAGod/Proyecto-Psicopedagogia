<template>
  <div class="background-container">
    <div id="app">
      <h1 class="prehead1">PREGRADO</h1>
      <div style="margin:20px;">
        <div style="display: flex; align-items: center;">

        <h3 class="prehead3">Malla</h3>
        <div style="display: flex; align-items: center; justify-content: flex-end; flex-grow: 1;">
          
          <div style="margin:20px;">
            <div style="margin:20px;">
      <a :href="'https://lpz.ucb.edu.bo/wp-content/uploads/2023/12/PSP-2024.pdf'">
    <button class="b-pre">Descargar malla</button>
</a>

</div>

</div></div></div>
</div>
      <div class="prevideo-container">
        <iframe class="vidma" :src="getYouTubeEmbedUrl('https://www.youtube.com/watch?v=nPL5hCXxmBw')" frameborder="0" allowfullscreen></iframe>
      </div><br><br>

      <h4 class="prehead4">Asignaturas representativas</h4>
      <div class="div-previd">
        <Carousel :itemsToShow="1" :wrapAround="true" :transition="500">
          <Slide v-for="video in videosAsignaturas" :key="video.id">
            <iframe class="video-preb" :src="getYouTubeEmbedUrl(video.url)" frameborder="0" allowfullscreen></iframe>
          </Slide>
        </Carousel>
      </div>

      <h2 class="prehead2">Actividades curriculares Representativas PSP</h2>
      <div class="div-previd">
        <Carousel :itemsToShow="1" :wrapAround="true" :transition="500">
          <Slide v-for="video in videosActividades" :key="video.id">
            <iframe class="video-preb" :src="getYouTubeEmbedUrl(video.url)" frameborder="0" allowfullscreen></iframe>
          </Slide>
        </Carousel>
      </div>

      <h2 class="prehead2">Experiencias de trabajo de Campo</h2>
      <div class="div-previd">
        <Carousel :itemsToShow="1" :wrapAround="true" :transition="500">
          <Slide v-for="image in images" :key="image.id">
            <img class="img-preb" :src="image.url" alt="carousel image">
          </Slide>
        </Carousel>
      </div>

      <h2 class="prehead2">Perfiles de estudiantes PSP</h2>
      <div class="div-previd">
        <Carousel :itemsToShow="1" :wrapAround="true" :transition="5">
          <Slide v-for="video in videosPerfiles" :key="video.id">
            <iframe class="video-preb" :src="getYouTubeEmbedUrl(video.url)" frameborder="0" allowfullscreen></iframe>
          </Slide>
        </Carousel>
      </div>

      <h2 class="prehead2">Áreas laborales PSP</h2>
      <div style="text-align: center; margin-bottom: 5%;">
        <table class="pre-tab" style="margin: 0 auto;">
          <tr class="pre-tr">
            <td class="pre-td">
              <p class="p-pre">En sector educativo:<br> educación inicial, primaria, secundaria, universitaria, técnica tecnológica que desarrollan procesos formativos en instituciones públicas, privadas y de convenio. En proyectos y programas educativos que mejoran la calidad de vida de diferentes poblaciones desde ministerios, municipios, fundaciones y ONG´s. En empresas públicas y privadas que desarrollan gestión del conocimiento desde sus departamentos de Recursos Humanos y sus unidades de capacitación.</p>
            </td>
            <td class="pre-td">
              <img alt="Ped" class="logo-pre" src="\backend\images\ped.jpg">
            </td>
          </tr>
        </table>
      </div>

      <div class="footer-pre" style="text-align: center; margin-bottom: 0;">
        <a href="#"><button class="b-pre2">Intercambios estudiantiles</button></a><br>
        <a href="#"><button class="b-pre2">Alianzas con otras Universidades</button></a><br><br><br>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'Pregrado',
  components: {
    Carousel,
    Slide,
  },

  data() {
    return {
      videosAsignaturas: [
        { id: 1, url: 'https://www.youtube.com/watch?v=OUd-tTZWBNw' },
        { id: 2, url: 'https://www.youtube.com/watch?v=w0dY_n_YOdc' },
        // Add more video objects as needed
      ],
      videosActividades: [
        { id: 1, url: 'https://www.youtube.com/watch?v=MxhPka31ots' },
        { id: 2, url: 'https://www.youtube.com/watch?v=J3PkExmyCDc' },
        { id: 3, url: 'https://www.youtube.com/watch?v=Rq_qALguVio' },
        // Add more video objects as needed
      ],
      videosPerfiles: [
        { id: 1, url: 'https://www.youtube.com/watch?v=msyuIdfVInY' },
        { id: 2, url: 'https://www.youtube.com/watch?v=O-GNjPSWBsU' },
        { id: 3, url: 'https://www.youtube.com/watch?v=3fqzUwKD4lM' },
        // Add more video objects as needed
      ],
      images: [
        { id: 1, url: '/src/assets/images/gentep.webp' },
        { id: 2, url: '/src/assets/images/gentep2.webp' },
        { id: 3, url: '/src/assets/images/gentep3.webp' },
        // Add more image objects as needed
      ],
    };
  },
  methods: {
    getYouTubeEmbedUrl(url) {
      const videoId = url.split('v=')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    },
  },
})
</script>

<style>
@import url('/src/assets/pregrado.css');
.background-container {
  background-image: url('/src/assets/images/background.png');
  background-size: cover;
  background-position: center;
  height: 100vh; /* Adjust the height as needed */
}
</style>
