<template>
    <div>
        <div class="content">
            <div class="titulo">
                <h1>Bienvenido a </h1>
                <h2>Psicopedagogia</h2>
            </div>
        </div>
        <div class="btnAdmin-Home">
            <button type="button" class="btn btn-primary" id="btnHome-Administrador" @click="toggleForm">Cambiar home</button>
        </div>
        <!-- Aquí se incluirá el formulario formHome -->
        <formHome v-show="showForm" :onclose="toggleForm" />

        <div class="container">
            <div class="sidebar">
                <div class="text-box">
                    <div class="text-content">
                        <p>{{paginaHome.quienes_somos}}</p>
                    </div>
                </div>
            </div>
            <div class="carousel-container">
                <div id="carouselExampleFade" class="carousel slide carousel-fade">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="/src/assets/images/psico2.jpg"  alt="img1" width="500px" height="470px">
                    </div>
                    <div class="carousel-item">
                        <img src="/src/assets/images/psico3.jpg"  alt="img2" width="500px" height="470px">
                    </div>
                    <div class="carousel-item">
                        <img src="/src/assets/images/psico2.jpg"  alt="img3" width="500px" height="470px">
                    </div>
                    <div class="carousel-item">
                        <img src="/src/assets/images/psico1.jpg" alt="img4"width="400px" height="350px">
                    </div>
                    <div class="carousel-item">
                        <img :src="paginaHome.imagen5"  alt="img5" width="500px" height="470px">
                    </div>
                    <div class="carousel-item">
                        <img :src="paginaHome.imagen6" alt="img6"width="400px" height="350px">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
                </div>
            </div>
        </div>
        <div class="animation-container">
            <div class="image-left">
                <img src="/src/assets/images/home-area1.png" alt="Imagen izquierda">
            </div>
            <div class="animation-text">
                <p>Areas de estudio</p>
            </div>
            <div class="image-right">
                <img src="/src/assets/images/home-area2.png" alt="Imagen derecha">
            </div>
        </div>
        <div class="vacio">
            <br>
            <br>
            <br>
        </div>
        <div class="container-misionvision">
            <div class="mision">
                <div class="text-box-mision">
                    <div class="text-content1">
                        <h1>MISIÓN</h1>
                        <img :src="paginaHome.mision_src" width="300px" height="300px" class="d-block w-100" alt="mision_img" >
                        <p>{{paginaHome.mision}}</p>
                    </div>
                </div>
            </div>
            <div class="vision">
                <div class="text-box-vision">
                    <div class="text-content1">
                        <h1>VISIÓN</h1>
                        <img :src="paginaHome.vision_src" width="300px" height="300px" class="d-block w-100" alt="vision_img">
                        <p>{{paginaHome.vision}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-perfilestudiante">
            <div class="text-box-perfilestudiante">
                <div class="text-content1">
                    <h1>PERFIL DE ESTUDIANTE</h1>
                    <img :src="paginaHome.perfil_estudiante_src" width="300px" height="300px" class="d-block w-100" alt="mision_img" >
                    <p>{{paginaHome.perfil_estudiante}}</p>
                </div>
            </div>
        </div>
        <formHome v-show="showForm" :onclose="toggleForm"/>
    </div>
</template>
<script setup>
import formHome from '/src/components/formHome.vue'; 
import { ref, onMounted } from 'vue';
import axios from 'axios';

const showForm = ref(false);
// Función para cambiar el estado de la variable showForm
const toggleForm = () => {
    showForm.value = !showForm.value;
};


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

const obtenerHome = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/home');
    paginaHome.value = response.data;
  } catch (error) {
    console.error('Error fetching home:', error);
  }
};

onMounted(() => {
  obtenerHome();
});


</script>  
<script>
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
</script>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');
    @import url('/src/assets/estilo.css');
    @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
</style>