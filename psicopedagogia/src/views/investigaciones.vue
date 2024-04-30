<template>
    <div>
        <br>
        <div class="content">
            <div class="titulo" style="text-align: left;">
                <h2 style="text-align: left;">INVESTIGACIÓN </h2>
                <h2 style="text-align: left;">GRUPO DE INVESTIGACIÓN "ZONA DE APRENDIZAJE"</h2>
            </div>
        </div>
        <br>
        <div class="container-primero">
            <div class="mision">
                <div class="text-box-quienes_somos">
                    <div class="text-content1">
                        <h1>¿Quienes somos?</h1>
                        <p>{{paginaInvestigaciones.quienes_somos}}</p>
                    </div>
                </div>
            </div>
            <div class="vision">
                <div class="text-box-desde_cuando">
                    <div class="text-content1">
                        <h1>¿Desde cuando existe?</h1>
                        <p>{{paginaInvestigaciones.desdecuando}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-segundo">
            <div class="mision">
                <div class="text-box-quienes_conforman">
                    <div class="text-content1">
                        <h1>¿Quienes lo conforman?</h1>
                        <p>{{paginaInvestigaciones.quienes_conforman}}</p>
                    </div>
                </div>
            </div>
            <div class="vision">
                <div class="text-box-como_unirse">
                    <div class="text-content1">
                        <h1>¿Cómo unirse??</h1>
                        <p>{{paginaInvestigaciones.como_unirse}}</p>
                    </div>
                </div>
            </div>
        </div>
        <h1>ACCIONES INVESTIGATIVAS</h1>
        <div class="carousel-container">
                
                <div id="carouselExampleFade" class="carousel slide carousel-fade">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="./assets/images/psico2.jpg"  alt="img1" width="500px" height="470px">
                    </div>
                    <div class="carousel-item">
                        <img src="./assets/images/psico3.jpg"  alt="img2" width="500px" height="470px">
                    </div>
                    <div class="carousel-item">
                        <img src="./assets/images/psico2.jpg"  alt="img3" width="500px" height="470px">
                    </div>
                    <div class="carousel-item">
                        <img src="./assets/images/psico4.jpg" alt="img4"width="400px" height="350px">
                    </div>
                    <div class="carousel-item">
                        <img :src="paginaInvestigaciones.imagen5"  alt="img5" width="500px" height="470px">
                    </div>
                    <div class="carousel-item">
                        <img :src="paginaInvestigaciones.imagen6" alt="img6"width="400px" height="350px">
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
        <br>
        <h1>LA PRESENTE INVESTIGACIÓN</h1>
        <div class="container-investigacion">
            <div class="text-box-investigacion">
                <div class="text-content1">
                    <img :src="paginaInvestigaciones.presente_investigacion_src" width="300px" height="300px" class="d-block w-100" alt="investigacion_img" >
                    <p>{{paginaInvestigaciones.presente_investigacion}}</p>
                </div>
            </div>
        </div>
        <div class='roca'><img src="/src/assets/images/rocas.png" alt="Image Description" class="footer-img"></div>
        <footer>
            <br><br><br><br>
            <div class="footer-container">
                <table class="footer-table">
                    <tr>
                        <td>
                        <a href="."><img style="width: 100px;" src="/src/assets/images/facebook.png" alt="Imagen del logo"></a>
                        </td>
                        <td>
                        <p>Psicopedagogía UCB La Paz</p>
                        </td>
                    </tr>
                </table>
                
                <div class="footer-info">
                <h2>Contacto</h2> <p>2782222 Int. 2872</p> 
                <h2>Whatsapp</h2> <p>73231313 – 77294940 </p> 
                </div>
            </div>
            <br><br>
        </footer>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const paginaInvestigaciones = ref({
    imagen1: '',
    imagen2: '',
    imagen3: '',
    imagen4: '',
    imagen5: '',
    imagen6: '',
    quienes_somos: '',
    desdecuando: '',
    quienes_conforman: '',
    como_unirse: '',
    presente_investigacion: '',
    presente_investigacion_src: ''
});

const obtenerInvestigaciones = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/investigaciones');
    paginaInvestigaciones.value = response.data;
  } catch (error) {
    console.error('Error fetching investigaciones:', error);
  }
};

onMounted(() => {
  obtenerInvestigaciones();
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

    .navbar {
        background-color: #FEEE16;
        color: white;
        width: 100%;
        height: 15vh;
    }
    .container-primero {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .container-segundo {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .text-box-quienes_somos {
        background-color: #AAD6FB;
        border-radius: 5vh;
        padding: 5vh;
        margin-bottom: 5vh;
    }

    .text-box-desde_cuando {
        background-color: #FEF684;
        border-radius: 5vh;
        padding: 5vh;
        margin-bottom: 5vh;
    }

    .text-box-quienes_conforman {
        background-color: #DBEE96;
        border-radius: 5vh;
        padding: 5vh;
        margin-bottom: 5vh;
    }

    .text-box-como_unirse{
        background-color: #FFCEE8;
        border-radius: 5vh;
        padding: 5vh;
        margin-bottom: 5vh;
    }

    .text-box-quienes_somos h1,
    .text-box-desde_cuando h1,
    .text-box-quienes_conforman h1,
    .text-box-como_unirse h1{
        padding-top: 5px;;
        color: black;
        font-family: 'Koulen', sans-serif;
        font-size: 40px;
        text-align: center;
    }
    .text-content1 p {
        padding-top: 20px;
        font-family: 'Roboto Condensed', sans-serif;
        text-align: center;
        font-size: 1.5vmax;
    }
    .carousel-container{
        text-align: center;
    }
    .carousel-container img{
        width: 180vh;
        height: auto;
        max-height: 120vh;
    }
    

    .carousel-control-prev-icon,
    .carousel-control-next-icon {
        width: 50vh; 
        height: 50vh; 
        background-size: 20vh 20vh; /* Ajusta el tamaño del icono */
    }

    h1{
        margin-left: 7vh;
        font-family: 'Oswald', 'sans-serif';
        font-size: 5vh;
        color: #FF7001;
    }
    .container-investigacion{
        text-align: center;
    }
    .text-box-investigacion {
        background-color: #FFCEE8;
        border-radius: 5vh;
        padding: 5vh;
        margin-bottom: 5vh;
        margin-left: 7vh;
        margin-right:7vh;
    }

    footer {
        width: 100%;
        height: 50%;
        font-family: 'Oswald';
        background-color: rgba(170, 214, 251, 1);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .footer-container {
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        margin-left: 7vh;
        margin-right: 7vh;
        flex-wrap: wrap;
    }

    .footer-table {
        background-color: rgba(170, 214, 251, 1);
        padding: 20px;
        width: 50%; /* Ancho de la tabla */
    }

    .footer-info {
        margin-left: auto;
        margin-right: 7vh;
        display: flex;
        flex-direction: column;
    }

    /* Media query para hacer el footer responsive */
    @media screen and (max-width: 768px) {
        .footer-table {
            width: 100%; /* Cambia el ancho de la tabla para dispositivos pequeños */
            margin-bottom: 20px; /* Añade un margen inferior en dispositivos pequeños */
        }
        .footer-info {
            margin: 0 auto; /* Centra el footer-info en dispositivos pequeños */
        }
    }
    .roca img {
        position: relative;
        animation: slideFromLeft 1s ease forwards;
        opacity: 0;
    }

    @keyframes slideFromLeft {
        0% {
            transform: translateX(-100%);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
</style>