<template>
     <div class="background-container">
      
    <div id="app">
       
      <h1>PREGRADO</h1>
      <!--<div class="video-container">
         Paste the iframe code here 
        <iframe :src="getEmbeddedLink(paginaNosotros.link_video)" frameborder="0" allowfullscreen></iframe>
      </div>-->
  
     
      <div style="display: flex; align-items: center;">
        <h2>Malla</h2>
        <div style="display: flex; align-items: center; justify-content: flex-end; flex-grow: 1;">
          
          <div style="margin:20px;">
            <!-- Button to toggle the FormDocente component 
            <button style="font-size: 36px; width: 100%; padding: 10px;padding-left: 30px;padding-right: 30px; margin-right: 10px;background-color: rgba(255, 42, 157, 1);" @click="toggleFormVisibility('formDocMod')">Modificar</button>
             FormDocente component 
            <FormDocMod v-if="showFormDocMod" @closeForm="closeForm('formDocMod')" />
          </div>-->
          <div style="margin:20px;">
            <!-- Button to toggle the FormDocente component -->
            <button style="font-size: 36px; width: 100%; padding: 10px;padding-left: 30px;padding-right: 30px; margin-right: 10px;background-color: rgba(255, 42, 157, 1);">Descargar malla</button>
            <!-- FormDocente component -->
            
          </div>

        </div>
        
      </div></div><div class="video-container">
        
        <iframe :src="'https://youtube.com/embed/tgbNymZ7vqY'" frameborder="0" allowfullscreen></iframe>

     </div><br>

     <h2>Asignaturas representativas</h2><br>
     <div style="width: 70%;margin-left: 15%;">
        <Carousel :itemsToShow="3.95" :wrapAround="true" :transition="500">
          <Slide v-for="video in videosAsignaturas" :key="video.id">
            <iframe :src="getYouTubeEmbedUrl(video.url)" frameborder="0" allowfullscreen></iframe>
          </Slide>
        </Carousel>
      </div>

     <h2>Actividades curriculares Representativas PSP</h2><br>

     
     <div style="width: 70%;margin-left: 15%;">
        <Carousel :itemsToShow="3.95" :wrapAround="true" :transition="500">
          <Slide v-for="video in videosActividades" :key="video.id">
            <iframe :src="getYouTubeEmbedUrl(video.url)" frameborder="0" allowfullscreen></iframe>
          </Slide>
        </Carousel>
      </div>

     <h2>Experiencias de trabajo de Campo</h2><br>




  



  <div style="width: 70%; margin-left: 15%;">
      <Carousel :itemsToShow="3.95" :wrapAround="true" :transition="500">
        <Slide v-for="image in images" :key="image.id">
          <img :src="image.url" alt="carousel image" style="width: 100%; height: auto;">
        </Slide>
        ...
      </Carousel>
    </div>


     <h2>Perfiles de estudiantes PSP</h2><br>

     <div style="width: 70%;margin-left: 15%;">
        <Carousel :itemsToShow="3.95" :wrapAround="true" :transition="500">
          <Slide v-for="video in videosPerfiles" :key="video.id">
            <iframe :src="getYouTubeEmbedUrl(video.url)" frameborder="0" allowfullscreen></iframe>
          </Slide>
        </Carousel>
      </div>






      

      








  
      <div class="docentes-container">
       <!-- <div v-for="docente in docentes" :key="docente.id" class="docente-item">
          <div v-html="generateTable(docente)"></div>
        </div>-->
      </div>
  
      <h2>Áreas laborales PSP</h2><br>

      <div style="text-align: center;margin-bottom: 10%;">
  <table style="margin: 0 auto;">
    <tr>
      <td style="width: 50%;">
        <p style="text-align: left;color:black;margin-left: 5%;margin-right: 2%;">En sector educativo: educación inicial, primaria, secundaria, universitaria, técnica tecnológica que desarrollan procesos formativos en instituciones públicas, privadas y de convenio.
        En proyectos y programas educativos que mejoran la calidad de vida de diferentes poblaciones desde ministerios, municipios, fundaciones y ONG´s.
        En empresas públicas y privadas que desarrollan gestión del conocimiento desde sus departamentos de Recursos Humanos y sus unidades de capacitación.</p>
      </td>
      <td style="width: 50%;">
        <img style="width: 100%;height: 100%;border-radius: 20px;"
        alt="Vue logo" class="logo" src="\backend\images\goodcat.py.jpg" width="125" height="125" />
      </td>
    </tr>
  </table>
</div>





      <div style="text-align: center; margin-bottom: 5%">
        <a ><button>Intercambios estudiantiles</button></a><br>
        <a><button>Alianzas con otras Universidades</button></a><br>
        <!--<a :href="paginaNosotros.link_psico_ucb"><button>Psicopedagogía La Paz</button></a><br>-->
      </div>
      
      
  
      </div></div>
  </template>


<script>



import { defineComponent } from 'vue'
import { Carousel, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'Autoplay',
  components: {
    Carousel,
    Slide,
    Pagination,
  },

  data() {
    return {
      videosAsignaturas: [
        { id: 1, url: 'https://www.youtube.com/watch?v=GGNY04u2FTQ' },
        { id: 2, url: 'https://www.youtube.com/watch?v=FwI0gPz-Tz8' },
        // Add more video objects as needed
      ],
      videosActividades: [
        { id: 1, url: 'https://www.youtube.com/watch?v=mlvIFV_8v7Q' },
        { id: 2, url: 'https://www.youtube.com/watch?v=JkklDXa6r-E' },
        // Add more video objects as needed
      ],
      videosPerfiles: [
        { id: 1, url: 'https://www.youtube.com/watch?v=9XyiBI53LZ0' },
        { id: 2, url: 'https://www.youtube.com/watch?v=vHqhkaN92f0' },
        // Add more video objects as needed
      ],

      images: [
      { id: 1, url: '/src/assets/images/facebook.png' },

        { id: 2, url: '/src/assets/images/insta.png' },
        // Add more image objects as needed
      ],
      // Define videos arrays for other carousels if needed
    };
  },
  methods: {
    // Function to convert YouTube video URL to embed URL
    getYouTubeEmbedUrl(url) {
      const videoId = url.split('v=')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    },
  },





  

})
</script>

<style scoped>
.carousel__slide {
  padding: 5px;
  width: 300px;
  height: 200px;
}

.carousel__viewport {
  width: 100%; /* Ensures the viewport takes the full width */
  max-width: 400px; /* Set a maximum width for the viewport */
  margin: 0 auto; /* Center the viewport horizontally */
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}


.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}



.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}
</style>





 <!-- <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  // Define the reactive variables to store data for docentes and paginaNosotros
  const docentes = ref([]);
  const paginaNosotros = ref({
    link_video: '',
    link_soc_cien: '',
    link_sembrando: '',
    link_psico_ucb: '',
    facebook: '',
    insta: '',
    youtube: '',
    tiktok: '',
    attencion_dire: ''
  });
  
  // Function to fetch docentes data from the database
  const obtenerDocentes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/docentes');
      docentes.value = response.data;
    } catch (error) {
      console.error('Error fetching docentes:', error);
    }
  };
  
  // Function to fetch paginaNosotros data from the database
  const obtenerInfoPagina = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/info-pagina');
      paginaNosotros.value = response.data;
    } catch (error) {
      console.error('Error fetching paginaNosotros data:', error);
    }
  };
  
  
  const getEmbeddedLink = (link) => {
    // Verifica si el enlace es del formato "watch" y lo convierte a "embed"
    if (link.includes('youtube.com/watch')) {
      const videoId = link.split('v=')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // Si el enlace ya está en formato "embed", devuelve el mismo enlace
    return link;
  };
  
  // Call the functions to fetch data when the component is mounted
  onMounted(() => {
    obtenerDocentes();
    obtenerInfoPagina();
  });
  
  // Function to generate HTML table for docentes
  const generateTable = (docente) => {
    const tableHTML = `<center>
      <div class="docentes">
        <div class="docentes-info">
          <p >Nombre: ${docente.nombre}<br><br>
          Cargo: ${docente.cargo}<br><br>
          Correo: ${docente.correo}<br><br>
          Dato: ${docente.datoc}</p>
        </div>
        <div class="docentes-avatar">
          <div class="docentes-nickname">${docente.apodo}</div>
          <img src="${docente.imagen}" alt="${docente.nombre}" class="docentes-image">
        </div>
      </div>
    <center>`;
  
    return tableHTML;
  };
  
  
  
  
  
  
  </script>-->
  <style>
  @import url('/src/assets/pregrado.css');
  
  
  
  
  </style>
  <style>
  .background-container {
    /* Set the background image URL directly */
    background-image: url('@/assets/images/background.png'); /* Use @/ to refer to the src directory */
    background-size: cover; /* Cover the entire container */
    background-position: center; /* Center the background image */
    /* Add other styles as needed */
    
  }
  </style>
  