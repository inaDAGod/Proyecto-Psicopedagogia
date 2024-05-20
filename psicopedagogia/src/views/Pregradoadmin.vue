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
              <iframe class="video-preb" :src="getYouTubeEmbedUrl(video.url)" frameborder="0" allowfullscreen></iframe>
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
              <iframe class="video-preb" :src="getYouTubeEmbedUrl(video.url)" frameborder="0" allowfullscreen></iframe>
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
              <img class="img-preb" :src="image.url" alt="carousel image">
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
              <iframe class="video-preb" :src="getYouTubeEmbedUrl(video.url)" frameborder="0" allowfullscreen></iframe>
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
  import { defineComponent } from 'vue';
  import { Carousel, Slide } from 'vue3-carousel';
  import 'vue3-carousel/dist/carousel.css';
  
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
      // Methods to handle carousel navigation
      nextAsignaturas() {
        this.$refs.asignaturasCarousel.next();
      },
      prevAsignaturas() {
        this.$refs.asignaturasCarousel.prev();
      },
      nextActividades() {
        this.$refs.actividadesCarousel.next();
      },
      prevActividades() {
        this.$refs.actividadesCarousel.prev();
      },
      nextExperiencias() {
        this.$refs.experienciasCarousel.next();
      },
      prevExperiencias() {
        this.$refs.experienciasCarousel.prev();
      },
      nextPerfiles() {
        this.$refs.perfilesCarousel.next();
      },
      prevPerfiles() {
        this.$refs.perfilesCarousel.prev();
      },
      // Add similar methods for other carousels if needed
    },
  });
  </script>
  
  <style>
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
  
  .flecha{
  
    
  
  border-radius: 100%;
  width: 25%;
  }
  
  
  </style>