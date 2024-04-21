<template>
    <div>
        <nav class="navbar">
            <!-- Contenido del navbar aquí -->
        </nav>
        <div class="content">
            <div class="titulo">
                <h1>Bienvenido a </h1>
                <h2>Psicopedagogia</h2>
            </div>
        </div>
        <div class="container">
            <div class="sidebar">
                <div class="text-box">
                    <div class="text-content">
                        <p>{{paginaHome.quienes_somos}}</p>
                    </div>
                </div>
            </div>
            <div class="carousel-container">
                <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img :src="paginaHome.imagen1"  alt="img1" width="500px" height="470px">
                    </div>
                    <div class="carousel-item">
                        <img :src="paginaHome.imagen2"  alt="img2" width="500px" height="470px">
                    </div>
                    <div class="carousel-item active">
                        <img :src="paginaHome.imagen3"  alt="img3" width="500px" height="470px">
                    </div>
                    <div class="carousel-item">
                        <img :src="paginaHome.imagen4" alt="img4"width="400px" height="350px">
                    </div>
                    <div class="carousel-item">
                        <img :src="paginaHome.imagen5"  alt="img5" width="500px" height="470px">
                    </div>
                    <div class="carousel-item">
                        <img :src="paginaHome.imagen6" alt="img6"width="400px" height="350px">
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="animation-container">
            <div class="image-left">
                <img src="./assets/images/home-area1.png" alt="Imagen izquierda">
            </div>
            <div class="animation-text">
                <p>Areas de estudio</p>
            </div>
            <div class="image-right">
                <!-- Imagen derecha -->
                <img src="./assets/images/home-area2.png" alt="Imagen derecha">
            </div>
        </div>
        <div class="vacio">
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
        </div>
        <div class="container-misionvision">
            <div class="mision">
                <div class="text-box-mision">
                    <div class="text-content">
                        <h1>MISIÓN</h1>
                        <img :src="paginaHome.mision_src"  class="d-block w-100" alt="mision_img" >
                        <p>{{paginaHome.mision}}</p>
                    </div>
                </div>
            </div>
            <div class="vision">
                <div class="text-box-vision">
                    <div class="text-content">
                        <h1>VISIÓN</h1>
                        <img :src="paginaHome.vision_src" class="d-block w-100" alt="vision_img">
                        <p>{{paginaHome.vision}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Define the reactive variables to home
const paginaHome = ref({
    imagen1: '',
    imagen2: '',
    imagen3: '',
    imagen4: '',
    imagen5: '',
    imagen6: '',
    quienes_somos: '',
    mision: '',
    mision_src: '',
    vision: '',
    vision_src: '',
    perfil_estudiante: '',
    perfil_estudiante_src: ''
});
// Function to fetch home data from the database
const obtenerHome = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/home');
    paginaHome.value = response.data;
  } catch (error) {
    console.error('Error fetching home:', error);
  }
};
// Call the functions to fetch data when the component is mounted
onMounted(() => {
  obtenerHome();
});
</script>
<script>
    export default {
        mounted() {
        // Inicializa el carrusel de Bootstrap
        var myCarousel = document.getElementById('carouselExampleSlidesOnly');
        var carousel = new bootstrap.Carousel(myCarousel, {
            interval: 100 // Cambia este valor según el tiempo deseado en milisegundos
        });
        }
    }
</script>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');
    @import url('/src/assets/estilo.css');
    @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
</style>
  