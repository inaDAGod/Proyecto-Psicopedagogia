<template>
     <div class="background-container">
      
    <div id="app">
       
      <h1 class="prehead1">PREGRADO</h1>
      <!--<div class="video-container">
         Paste the iframe code here 
        <iframe :src="getEmbeddedLink(paginaNosotros.link_video)" frameborder="0" allowfullscreen></iframe>
      </div>-->
  
     
      <div style="display: flex; align-items: center;">
        <h3 class="prehead3">Malla</h3>
        <div style="display: flex; align-items: center; justify-content: flex-end; flex-grow: 1;">
          
          <div style="margin:20px;">
            <!-- Button to toggle the FormDocente component 
            <button style="font-size: 36px; width: 100%; padding: 10px;padding-left: 30px;padding-right: 30px; margin-right: 10px;background-color: rgba(255, 42, 157, 1);" @click="toggleFormVisibility('formDocMod')">Modificar</button>
             FormDocente component 
            <FormDocMod v-if="showFormDocMod" @closeForm="closeForm('formDocMod')" />
          </div>-->
          <div style="margin:20px;">
            <!-- Button to toggle the FormDocente component -->
            <a :href="'https://lpz.ucb.edu.bo/wp-content/uploads/2023/12/PSP-2024.pdf'">
    <button class="b-pre">Descargar malla</button>
</a>

            <!-- FormDocente component -->
            
          </div>

        </div>
        
      </div></div><div class="prevideo-container">
        
        <iframe class="vidma" :src="getYouTubeEmbedUrl('https://www.youtube.com/watch?v=nPL5hCXxmBw')" frameborder="0" allowfullscreen></iframe>

     </div>

     <h4 class="prehead4">Asignaturas representativas</h4><br>
     <div class="div-previd">
        <Carousel :itemsToShow="3" :wrapAround="true" :transition="500">
          <Slide v-for="video in videosAsignaturas" :key="video.id">
            <iframe class="video-preb" :src="getYouTubeEmbedUrl(video.url)" frameborder="0" allowfullscreen></iframe>
          </Slide>
        </Carousel>
      </div>

     <h2 class="prehead2">Actividades curriculares Representativas PSP</h2><br>

     
     <div class="div-previd">
        <Carousel :itemsToShow="3" :wrapAround="true" :transition="500">
          <Slide v-for="video in videosActividades" :key="video.id">
            <iframe class="video-preb" :src="getYouTubeEmbedUrl(video.url)" frameborder="0" allowfullscreen></iframe>
          </Slide>
        </Carousel>
      </div>

     <h2 class="prehead2">Experiencias de trabajo de Campo</h2><br>




  



  <div class="div-previd">
      <Carousel :itemsToShow="3" :wrapAround="true" :transition="500">
        <Slide v-for="image in images" :key="image.id">
          <img class="img-preb" :src="image.url" alt="carousel image" >
        </Slide>
        ...
      </Carousel>
    </div>


     <h2 class="prehead2">Perfiles de estudiantes PSP</h2><br>

     <div class="div-previd">
        <Carousel :itemsToShow="3" :wrapAround="true" :transition="500">
          <Slide v-for="video in videosPerfiles" :key="video.id">
            <iframe class="video-preb" :src="getYouTubeEmbedUrl(video.url)" frameborder="0" allowfullscreen></iframe>
          </Slide>
        </Carousel>
      </div>
      <br>
      <div class="docentes-container">
       <!-- <div v-for="docente in docentes" :key="docente.id" class="docente-item">
          <div v-html="generateTable(docente)"></div>
        </div>-->
      </div>
  
      <h2 class="prehead2">Áreas laborales PSP</h2><br>

      <div style="text-align: center;margin-bottom: 10%;">
  <table class="pre-tab" style="margin: 0 auto;">
    <tr class="pre-tr">
      <td class="pre-td" >
        <p class="p-pre" style="text-align: left;color:black;margin-left: 5%;margin-right: 2%;">En sector educativo: educación inicial, primaria, secundaria, universitaria, técnica tecnológica que desarrollan procesos formativos en instituciones públicas, privadas y de convenio.
        En proyectos y programas educativos que mejoran la calidad de vida de diferentes poblaciones desde ministerios, municipios, fundaciones y ONG´s.
        En empresas públicas y privadas que desarrollan gestión del conocimiento desde sus departamentos de Recursos Humanos y sus unidades de capacitación.</p>
      </td>
      <td class="pre-td">
        <img 
        alt="Vue logo" class="logo-pre" src="\backend\images\ped.jpg" />
      </td>
    </tr>
  </table>
</div>





      <div class="footer-pre" >
        <a ><button class="b-pre2">Intercambios estudiantiles</button></a><br>
        <a><button class="b-pre2">Alianzas con otras Universidades</button></a><br><br><br>
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
        {id:3, url:'https://www.youtube.com/watch?v=3fqzUwKD4lM'},
        // Add more video objects as needed
      ],

      images: [
      { id: 1, url: '/src/assets/images/gentep.webp' },
      { id: 2, url: '/src/assets/images/gentep2.webp' },
      { id: 3, url: '/src/assets/images/gentep3.webp' },

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
    height: 100%;
    
  }
  </style>
  